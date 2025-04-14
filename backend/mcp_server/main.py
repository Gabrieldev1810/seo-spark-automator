from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import asyncio
import json
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="SEO Spark MCP Server")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store active agent connections
active_agents: Dict[str, WebSocket] = {}
agent_tasks: Dict[str, List[str]] = {}

class AgentManager:
    def __init__(self):
        self.agents = {}
        self.tasks = {}
        self.context = {}

    async def register_agent(self, agent_id: str, websocket: WebSocket):
        self.agents[agent_id] = websocket
        self.tasks[agent_id] = []
        logger.info(f"Agent {agent_id} registered")

    async def unregister_agent(self, agent_id: str):
        if agent_id in self.agents:
            del self.agents[agent_id]
            del self.tasks[agent_id]
            logger.info(f"Agent {agent_id} unregistered")

    async def broadcast_message(self, message: dict):
        for agent_id, websocket in self.agents.items():
            try:
                await websocket.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to agent {agent_id}: {e}")

    async def route_task(self, task: dict):
        target_agent = task.get("target_agent")
        if target_agent in self.agents:
            try:
                await self.agents[target_agent].send_json(task)
                self.tasks[target_agent].append(task["task_id"])
            except Exception as e:
                logger.error(f"Error routing task to agent {target_agent}: {e}")

agent_manager = AgentManager()

@app.websocket("/ws/agent/{agent_id}")
async def websocket_endpoint(websocket: WebSocket, agent_id: str):
    await websocket.accept()
    await agent_manager.register_agent(agent_id, websocket)
    
    try:
        while True:
            data = await websocket.receive_json()
            
            # Handle different message types
            if data["type"] == "task_complete":
                # Handle task completion
                task_id = data["task_id"]
                if agent_id in agent_tasks and task_id in agent_tasks[agent_id]:
                    agent_tasks[agent_id].remove(task_id)
                
                # Broadcast task completion to relevant agents
                await agent_manager.broadcast_message({
                    "type": "task_update",
                    "task_id": task_id,
                    "status": "completed",
                    "agent_id": agent_id,
                    "timestamp": datetime.utcnow().isoformat()
                })
            
            elif data["type"] == "context_update":
                # Handle context sharing between agents
                await agent_manager.broadcast_message({
                    "type": "context_update",
                    "context": data["context"],
                    "source_agent": agent_id,
                    "timestamp": datetime.utcnow().isoformat()
                })
            
            elif data["type"] == "agent_status":
                # Handle agent status updates
                await agent_manager.broadcast_message({
                    "type": "agent_status",
                    "agent_id": agent_id,
                    "status": data["status"],
                    "timestamp": datetime.utcnow().isoformat()
                })
    
    except WebSocketDisconnect:
        await agent_manager.unregister_agent(agent_id)
        logger.info(f"Agent {agent_id} disconnected")

@app.post("/api/tasks")
async def create_task(task: dict):
    """
    Create and route a new task to the appropriate agent
    """
    task_id = f"task_{datetime.utcnow().timestamp()}"
    task["task_id"] = task_id
    
    await agent_manager.route_task(task)
    
    return {
        "status": "success",
        "task_id": task_id,
        "message": f"Task routed to agent {task['target_agent']}"
    }

@app.get("/api/agents")
async def get_agents():
    """
    Get list of active agents and their current tasks
    """
    return {
        "agents": list(agent_manager.agents.keys()),
        "tasks": agent_manager.tasks
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 