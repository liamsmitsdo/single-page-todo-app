const db = require('../models')

exports.getTodos = (req,res) =>{
    db.Todo.find()
        .then((todos)=>{
            res.json(todos)
        })
        .catch((e)=>{
            res.send(e)
        })
}

exports.createTodo = (req,res) =>{
    db.Todo.create(req.body)
    .then((newTodo) =>{
        res.json(newTodo)
    })
    .catch((e) =>{
        res.send(e)
    })
}

exports.getTodo = (req,res) =>{
    let {todoId} = req.params;
    db.Todo.findById(todoId)
    .then((todo) =>{
        res.json(todo)
    })
    .catch((e) =>{
        res.send(e)
    })
}

exports.updateTodo = (req,res)=>{
    let {todoId} = req.params;
    db.Todo.findOneAndUpdate({_id: todoId},req.body, {new: true})
    .then((todo)=>{
        res.json(todo)
    })
    .catch((e) =>{
        res.send(e)
    })
}

exports.deleteTodo = (req,res) =>{
    let {todoId} = req.params;
    db.Todo.remove({_id: todoId})
    .then(() => {
        res.json({message: 'List item has been deleted'})
    })
    .catch((e) =>{
        res.send(e)
    })
}

module.exports = exports