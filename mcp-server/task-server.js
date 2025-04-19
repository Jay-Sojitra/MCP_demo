import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from 'node-fetch';

// Initialize the MCP server
const server = new McpServer({
  name: "task-manager",
  version: "1.0.0",
  description: "A task management server"
});

// Register the addTask tool
// server.tool("addTask",
//   {
//   description: "Add a new task",
//     examples: ["Add a task"],
//       // Either make the schema empty or match what you're actually using
//       inputSchema: z.object({}),  // No required parameters
//         handler: async () => {  // Remove the params if not using them
//           try {
//             const response = await fetch('http://localhost:5000/api/tasks', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 title: "myname",
//                 description: "This is a dummy description for testing",
//                 status: "pending"
//               })
//             });

//             const data = await response.json();

//             // Return a simple string instead of complex object
//             return `Task "${data.task.title}" has been added successfully.`;
//           } catch (error) {
//             console.error("Error adding task:", error);
//             return "Error adding task. Please try again.";
//           }
//         }
// });

// Register a simplified addTask tool
server.tool("addTask", {
  description: "Add a new task",
  examples: ["Add a task"],
  inputSchema: z.object({}),
  handler: function(_, cb) {  // Use the callback pattern
    console.log("Handler function called!");
    
    // Use the callback to return the result
    cb(null, "Task has been added successfully.");
  }
});


// Connect to the transport
const transport = new StdioServerTransport();
await server.connect(transport);
