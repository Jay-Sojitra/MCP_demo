// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Tasks routes
app.use('/api', require('./routes/tasks'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(cors({
  origin: ['http://localhost', 'http://127.0.0.1', undefined], // Allow various origins
  methods: ['GET']
}));
// Dummy /mcp endpoint to satisfy Cursor IDE
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const serverInfo = {
    tools: [
      {
        name: "task_manager",
        description: "Manage tasks in the database",
        commands: [
          {
            pattern: "add task {title} with description {description} and due date {dueDate}",
            method: "POST",
            endpoint: "/api/tasks"
          },
          {
            pattern: "show all tasks",
            method: "GET",
            endpoint: "/api/tasks"
          }
        ]
      }
    ]
  };
  res.write(`event: server-info\ndata: ${JSON.stringify(serverInfo)}\nretry: 10000\n\n`);

  const interval = setInterval(() => {
    res.write('event: heartbeat\ndata: {}\nretry: 10000\n\n');
  }, 30000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
