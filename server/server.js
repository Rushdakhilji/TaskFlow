
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = 5000;

const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());

// Read tasks from JSON file
async function readTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]');
      return [];
    }
    throw error;
  }
}

// Save tasks to JSON file
async function saveTasks(tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Test route
app.get('/', (req, res) => {
  res.send('TaskFlow API is running!');
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Could not load tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description = '', priority = 'Medium' } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    if (!['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const tasks = await readTasks();

    const newTask = {
      id: randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'To Do',
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await saveTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Could not create task' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(
      (task) => task.id === req.params.id
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, priority, status } = req.body;

    if (priority !== undefined &&
        !['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    if (status !== undefined &&
        !['To Do', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(status !== undefined && { status }),
    };

    await saveTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Could not update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const updatedTasks = tasks.filter(
      (task) => task.id !== req.params.id
    );

    if (updatedTasks.length === tasks.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await saveTasks(updatedTasks);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete task' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`TaskFlow API running at http://localhost:${PORT}`);
});
