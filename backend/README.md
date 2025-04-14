# SEO Spark Automator Backend

This is the backend implementation for the SEO Spark Automator project, providing AI-powered SEO optimization and content generation capabilities.

## Project Structure

```
backend/
├── agents/              # Agent implementations
├── ai/                  # AI service integrations
├── mcp_server/         # Main Control Program server
├── venv/               # Python virtual environment
├── requirements.txt    # Python dependencies
├── start.py           # Server startup script
└── run_agents.py      # Agent execution script
```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

5. Start the server:
```bash
python start.py
```

## Components

### MCP Server
The Main Control Program (MCP) server orchestrates the communication between different agents and manages workflows.

### Agents
- **Content Agent**: Generates and optimizes content using AI
- **Keyword Agent**: Analyzes and suggests keywords
- **Analytics Agent**: Tracks and analyzes performance metrics
- **Schema Agent**: Generates and validates schema markup
- **UX Agent**: Analyzes and optimizes user experience

### AI Integration
The system integrates with various AI services for:
- Content generation
- Keyword analysis
- Performance optimization
- Schema generation
- User experience analysis

## Development

To add a new agent:
1. Create a new agent class in the `agents/` directory
2. Implement the required agent interface
3. Register the agent with the MCP server
4. Add any necessary tests

## Testing

Run tests using:
```bash
python -m pytest
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 