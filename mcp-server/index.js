import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from "node-fetch";


// log("Starting MCP server...");

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

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
