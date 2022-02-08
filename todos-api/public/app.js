$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
           postTodo()
        }
    })

    $('.list').on('click', 'span', function() {
        const todoId = $(this).parent().data('id')
        $.ajax({
            method: 'DELETE',
            url: `/api/todos/${todoId}`
        })
        .then(()=>{
            $(this).parent().remove()
        })
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

function deleteTodo() {

}