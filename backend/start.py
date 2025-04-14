import subprocess
import sys
import os
from dotenv import load_dotenv

def start_mcp_server():
    """Start the MCP Server"""
    print("Starting MCP Server...")
    subprocess.Popen([sys.executable, "-m", "uvicorn", "mcp_server.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])

def start_agents():
    """Start the SEO agents"""
    print("Starting SEO agents...")
    subprocess.Popen([sys.executable, "run_agents.py"])

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Check for OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Warning: OPENAI_API_KEY not set in .env file")
        print("Please set your OpenAI API key in the .env file")
        sys.exit(1)
    
    # Start MCP Server
    start_mcp_server()
    
    # Start agents
    start_agents()
    
    print("\nSEO Spark Automator is running!")
    print("MCP Server: http://localhost:8000")
    print("Press Ctrl+C to stop all services")
    
    try:
        # Keep the script running
        while True:
            input()
    except KeyboardInterrupt:
        print("\nShutting down services...")
        sys.exit(0) 