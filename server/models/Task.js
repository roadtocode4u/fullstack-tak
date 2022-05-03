const mongoose = require('mongoose');

const Task = mongoose.Schema({
   id: Number,
    title: String,
    description: String,
});

const model = mongoose.model('Task', Task);

module.exports = model;