# MCP Task Server

A simple Model Context Protocol (MCP) server for task management, built using the TypeScript SDK.

## Features

- Add tasks with title, description, and priority
- Natural language task creation through MCP
- Simple and clean implementation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
node task-server.js
```

## Usage

The server provides a single capability:

- `addTask`: Add a new task to the system
  - Parameters:
    - `title`: Task title (string)
    - `description`: Task description (string)
    - `priority`: Task priority (number, 1-5)

Example usage in Cursor:
```
Add a high priority task to fix the login bug
```

The server will process the natural language command and create a task with the appropriate attributes.
