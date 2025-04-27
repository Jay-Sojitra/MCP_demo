import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from "node-fetch";

// Initialize the MCP server
const server = new McpServer({
  name: "task-manager",
  version: "1.0.0",
  description: "A task management server"
});


server.tool("createTask",
  {
    title: z.string(),
    description: z.string(),
    status: z.string().default("pending")
  },
  async ({ title, description, status }) => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        status
      })
    });

    const result = await response.json();
    return {
      content: [{ type: "text", text: `Task created: ${JSON.stringify(result)}` }]
    };
  }
);

// Update task tool
server.tool("updateTask",
  {
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional()
  },
  async ({ id, title, description, status }) => {
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });

    const result = await response.json();
    return {
      content: [{ type: "text", text: `Task updated: ${JSON.stringify(result)}` }]
    };
  }
);

// Delete task tool
server.tool("deleteTask",
  {
    id: z.string()
  },
  async ({ id }) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    return {
      content: [{ type: "text", text: `Task deleted: ${JSON.stringify(result)}` }]
    };
  }
);

// greeting tool
server.tool("greet",
  { name: z.string() },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello ${name}, how are you?` }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
