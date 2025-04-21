// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// In-memory storage for tasks (replace with database in production)
let tasks = [];

// Get all tasks
router.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// Get a single task
router.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ task });
});

// Create a new task
router.post('/tasks', (req, res) => {
    console.log("calleddddddddddddddddddd");
    console.log("req.body", req.body);
    const task = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
    res.status(201).json({ task });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks[index] = {
        ...tasks[index],
        ...req.body,
        updatedAt: new Date().toISOString()
    };

    res.json({ task: tasks[index] });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    const deletedTask = tasks.splice(index, 1)[0];
    res.json({ task: deletedTask });
});

module.exports = router;
