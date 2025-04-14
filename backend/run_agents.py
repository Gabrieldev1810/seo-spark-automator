import asyncio
import os
from dotenv import load_dotenv
from agents.content_agent import ContentAgent
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def main():
    # Get configuration from environment variables
    mcp_server_url = os.getenv("MCP_SERVER_URL", "ws://localhost:8000")
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai_api_key:
        raise ValueError("OPENAI_API_KEY environment variable is required")
    
    # Initialize agents
    content_agent = ContentAgent(
        agent_id="content_agent_1",
        mcp_server_url=mcp_server_url,
        openai_api_key=openai_api_key
    )
    
    # Connect agents to MCP Server
    try:
        await content_agent.connect()
        
        # Keep the script running
        while True:
            await asyncio.sleep(1)
            
    except KeyboardInterrupt:
        logger.info("Shutting down agents...")
    except Exception as e:
        logger.error(f"Error running agents: {e}")
    finally:
        # Disconnect agents
        await content_agent.disconnect()

if __name__ == "__main__":
    asyncio.run(main()) 