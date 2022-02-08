$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
           postTodo()
        }
    })

    $('.list').on('click', 'span', function(event) {
        event.stopPropagation()
        const todoId = $(this).parent().data('id')
        $.ajax({
            method: 'DELETE',
            url: `/api/todos/${todoId}`
        })
        .then(()=>{
            $(this).parent().remove()
        })
    })

    $('.list').on('click', 'li', function(){
        updateTodo($(this))
    })
})

function addTodos(todos) {
    todos.forEach((todo) =>{
        addTodo(todo)
    })
}

function addTodo(todo) {
    let newTodo = $('<li class="task">'+todo.name+' <span>X<span> </li>')
    newTodo.data('id', todo._id)
    newTodo.data('bool', todo.completed)
        if(todo.completed){
            newTodo.addClass('done')
        }
        $('.list').append(newTodo)
}

function postTodo() {
    const data = $('#todoInput').val()
    $.post('/api/todos', {name: data})
    .then((newTodo) =>{
        $('#todoInput').val('')
        addTodo(newTodo)
    })
    .catch((err) =>{
        console.log(err)
    })
}

function updateTodo(todo) {
    const isDone = !todo.data('bool')
    const updateData = {completed: isDone}
    $.ajax({
        method: 'put',
        url: `/api/todos/${todo.data('id')}`,
        data: updateData
    })
    .then((updatedTodo) =>{
        todo.toggleClass('done')
        todo.data('completed', isDone)
    })
}