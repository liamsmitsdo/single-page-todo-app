const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/todo-api')

mongoose.Promise = Promise

module.exports.Todo = require('./todo')