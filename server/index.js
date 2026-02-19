const express = require("express");
const mongoose = require("mongoose");
const app = express();

// 1. Middleware to parse JSON (Required to read req.body)
app.use(express.json());
const cors=require('cors')
app.use(cors());

// 2. Replace <db_password> with your actual password
mongoose.connect("mongodb+srv://vishnu_priya_475:vishnu475540@cluster0.nzdaaxb.mongodb.net/smart")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB", err));

const Task = mongoose.model('Task', {
  text: String,
  completed: Boolean
});

// POST Route with error handling
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ message: "Error saving task", error });
  }
});

// GET Route with error handling
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tasks" });
  }
});

// Paste this above app.listen
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting task", error });
    }
});


// Route to update a task's completion status
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { completed: req.body.completed }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});




app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
