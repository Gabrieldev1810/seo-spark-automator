from abc import ABC, abstractmethod
import asyncio
import json
import logging
import websockets
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class BaseAgent(ABC):
    def __init__(self, agent_id: str, mcp_server_url: str):
        self.agent_id = agent_id
        self.mcp_server_url = mcp_server_url
        self.websocket = None
        self.context = {}
        self.is_connected = False
        self.current_tasks = []

    async def connect(self):
        """Establish WebSocket connection with MCP Server"""
        try:
            self.websocket = await websockets.connect(f"{self.mcp_server_url}/ws/agent/{self.agent_id}")
            self.is_connected = True
            logger.info(f"Agent {self.agent_id} connected to MCP Server")
            
            # Start listening for messages
            asyncio.create_task(self._listen_for_messages())
            
            # Send initial status
            await self.send_status("ready")
            
        except Exception as e:
            logger.error(f"Failed to connect to MCP Server: {e}")
            self.is_connected = False

    async def disconnect(self):
        """Close WebSocket connection"""
        if self.websocket:
            await self.websocket.close()
            self.is_connected = False
            logger.info(f"Agent {self.agent_id} disconnected from MCP Server")

    async def _listen_for_messages(self):
        """Listen for incoming messages from MCP Server"""
        while self.is_connected:
            try:
                message = await self.websocket.recv()
                data = json.loads(message)
                await self._handle_message(data)
            except websockets.exceptions.ConnectionClosed:
                logger.error("Connection to MCP Server closed")
                self.is_connected = False
                break
            except Exception as e:
                logger.error(f"Error handling message: {e}")

    async def _handle_message(self, message: Dict[str, Any]):
        """Handle incoming messages based on type"""
        message_type = message.get("type")
        
        if message_type == "task":
            await self._handle_task(message)
        elif message_type == "context_update":
            await self._handle_context_update(message)
        elif message_type == "agent_status":
            await self._handle_agent_status(message)

    async def _handle_task(self, task: Dict[str, Any]):
        """Handle incoming task"""
        task_id = task.get("task_id")
        if task_id:
            self.current_tasks.append(task_id)
            try:
                result = await self.process_task(task)
                await self.send_task_completion(task_id, result)
            except Exception as e:
                logger.error(f"Error processing task {task_id}: {e}")
                await self.send_task_error(task_id, str(e))

    async def _handle_context_update(self, message: Dict[str, Any]):
        """Handle context updates from other agents"""
        self.context.update(message.get("context", {}))
        logger.info(f"Agent {self.agent_id} received context update")

    async def _handle_agent_status(self, message: Dict[str, Any]):
        """Handle status updates from other agents"""
        # Implement specific status handling logic
        pass

    async def send_status(self, status: str):
        """Send status update to MCP Server"""
        if self.is_connected:
            await self.websocket.send(json.dumps({
                "type": "agent_status",
                "agent_id": self.agent_id,
                "status": status,
                "timestamp": datetime.utcnow().isoformat()
            }))

    async def send_task_completion(self, task_id: str, result: Any):
        """Send task completion notification"""
        if self.is_connected:
            await self.websocket.send(json.dumps({
                "type": "task_complete",
                "task_id": task_id,
                "agent_id": self.agent_id,
                "result": result,
                "timestamp": datetime.utcnow().isoformat()
            }))
            if task_id in self.current_tasks:
                self.current_tasks.remove(task_id)

    async def send_task_error(self, task_id: str, error: str):
        """Send task error notification"""
        if self.is_connected:
            await self.websocket.send(json.dumps({
                "type": "task_error",
                "task_id": task_id,
                "agent_id": self.agent_id,
                "error": error,
                "timestamp": datetime.utcnow().isoformat()
            }))
            if task_id in self.current_tasks:
                self.current_tasks.remove(task_id)

    async def send_context_update(self, context: Dict[str, Any]):
        """Send context update to other agents"""
        if self.is_connected:
            await self.websocket.send(json.dumps({
                "type": "context_update",
                "agent_id": self.agent_id,
                "context": context,
                "timestamp": datetime.utcnow().isoformat()
            }))

    @abstractmethod
    async def process_task(self, task: Dict[str, Any]) -> Any:
        """Process a task - to be implemented by specific agents"""
        pass 