# Cursor MCP Task Manager

This project demonstrates how to integrate a task management API with Cursor using the Model Context Protocol (MCP). It enables you to manage tasks using natural language within the Cursor editor.

## Project Structure

- `/backend` - A simple Express.js API for task management with CRUD operations
- `/mcp-server` - MCP server that connects the task API to Cursor
- `/.cursor` - Configuration for Cursor's MCP integration

## Setup Instructions

### Step 1: Start the Backend Server

First, start the task API backend:

```bash
cd backend
npm install
npm start
```

This will start a server on port 5000 that provides API endpoints for task management.

### Step 2: Set up the MCP Server

For Windows users:
- Double-click the `install.bat` file in the `mcp-server` directory

For manual setup:
- Follow the instructions in the [MCP Server README](mcp-server/README.md)

### Step 3: Restart Cursor

Restart Cursor to load the MCP configuration.

## Using Task Management in Cursor

Once set up, you can use natural language to manage tasks in Cursor:

- **List tasks**: "Show me all my tasks"
- **Create a task**: "Create a new task titled 'Implement MCP' with description 'Set up MCP server for task management'"
- **Update a task**: "Mark task [task-id] as completed"
- **Delete a task**: "Delete task [task-id]"

## Troubleshooting

If you encounter issues:

1. **MCP server not connecting**:
   - Check the `.cursor/mcp.json` file to ensure paths are correctly specified
   - Always use relative paths in the `args` field (e.g., `"args": ["mcp-server/index.js"]`)
   - Install dependencies with `cd mcp-server && npm install`

2. **"Client closed" errors in Cursor logs**:
   - Try the simplified test server: `"args": ["mcp-server/simple-test.js"]`
   - This server provides basic task functionality without requiring the backend

3. **Backend connectivity issues**:
   - Make sure the backend server is running on port 5000
   - Check that the API_URL environment variable is correct

For more detailed troubleshooting steps, see the [MCP Server README](mcp-server/README.md).

## How It Works

This project uses the Model Context Protocol (MCP) to connect Cursor to the task management API. The MCP server acts as a bridge, translating natural language requests in Cursor into API calls to the backend server.

## Resources

- [Cursor MCP Documentation](https://docs.cursor.com/context/model-context-protocol)
- [Anthropic MCP Documentation](https://docs.anthropic.com/en/docs/agents-and-tools/mcp) 
