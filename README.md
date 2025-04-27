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

```bash
cd mcp-server
npm install
```

### Step 3: Configure and Start the MCP Server in Cursor

1. The `.cursor/mcp.json` file already contains the necessary configuration
2. Restart Cursor to load the MCP configuration
3. Open Cursor chat settings
4. Navigate to the MCP section of settings
5. Find "TaskManager" in the server list
6. Enable the toggle switch next to "TaskManager" (should be green when on)
7. You should see the available tools (createTask, updateTask, deleteTask, greet) listed

## Available MCP Capabilities

### Tools

- `createTask`: Add a new task to the system
  - Parameters:
    - `title`: Task title (string)
    - `description`: Task description (string)
    - `status`: Task status (string, defaults to "pending")

- `updateTask`: Update an existing task
  - Parameters:
    - `id`: Task ID (string)
    - `title`: New task title (optional string)
    - `description`: New task description (optional string)
    - `status`: New task status (optional string)

- `deleteTask`: Delete a task
  - Parameters:
    - `id`: Task ID (string)

- `greet`: Get a greeting message
  - Parameters:
    - `name`: Person to greet (string)

## Using Task Management in Cursor

Once set up, you can use natural language to manage tasks in Cursor:

- **List tasks**: "Show me all my tasks"
- **Create a task**: "Create a new task titled 'Implement MCP' with description 'Set up MCP server for task management'"
- **Update a task**: "Mark task [task-id] as completed" or "Update the title of task [task-id] to 'New Title'"
- **Delete a task**: "Delete task [task-id]"

## Troubleshooting

If you encounter issues:

1. **MCP server not connecting**:
   - Check the `.cursor/mcp.json` file to ensure paths are correctly specified
   - Always use relative paths in the `args` field when possible
   - Verify that you've installed dependencies with `cd mcp-server && npm install`
   - Make sure the MCP server is enabled in Cursor settings (toggle is green)

2. **"Client closed" errors in Cursor logs**:
   - Try the simplified test server: `"args": ["mcp-server/simple-test.js"]`
   - This server provides basic task functionality without requiring the backend

3. **Backend connectivity issues**:
   - Make sure the backend server is running on port 5000
   - Check that the API_URL environment variable is correct

## How It Works

This project uses the Model Context Protocol (MCP) to connect Cursor to the task management API. The MCP server acts as a bridge, translating natural language requests in Cursor into API calls to the backend server.

### Tools

The MCP server provides tools, which are function-like interfaces that can be called with parameters:
- Example: `createTask` tool for creating tasks

## Resources

- [Cursor MCP Documentation](https://docs.cursor.com/context/model-context-protocol)
- [Anthropic MCP Documentation](https://docs.anthropic.com/en/docs/agents-and-tools/mcp) 
