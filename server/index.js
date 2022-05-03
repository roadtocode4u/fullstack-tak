const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Task = require('./models/Task')

const app = express();
app.use(cors());
app.use(express.json());

// mongodb connection
mongoose.connect('mongodb+srv://suraj:suraj@cluster0.gfb4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log('connected to mongodb');
});

// Add Task
app.post('/add/task', async(req, res)=>{
  const task = new Task({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });

  await task.save();

  res.send({
    message: 'Task added successfully'
  })
})

// Update Task
app.post("/update/task", async(req, res)=>{
  const task = await Task.updateOne(
    {id: req.body.id},
    {$set: {title: req.body.title, description: req.body.description}}
  )

  res.send({
    message: 'Task updated successfully'
  })
})


// Delete Task
app.post('/delete/task', async(req, res)=>{
  await Task.deleteOne({id: req.body.id});

  res.send({
    message: 'Task deleted successfully'
  })
})

// Get All Task
app.get('/get/all/task', async(req, res)=>{
  const tasks = await Task.find();
  res.send(tasks);
})

// Get Specific Task
app.post('/get/task', async(req, res)=>{
  const task = await Task.find({id: req.body.id});
  res.send(task);
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})