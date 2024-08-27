todos = ["task 1", "task 2"]

todosDiv = document.getElementById("todos")
submitBtn = document.getElementById("submitBtn")
inputTodo = document.getElementById("newTodo")

todos.forEach(todo => {
    newTodoDiv = document.createElement("div")
    newTodoDiv.innerHTML = todo + `<button onclick="deleteTodo(this.parentElement)">Delete</button>`
    todosDiv.appendChild(newTodoDiv)    
})

submitBtn.addEventListener("click", createTodo)

//add a new task
function createTodo() {
    const newTodo = inputTodo.value
    todos.push(newTodo)
    newTodoDiv = document.createElement("div")
    newTodoDiv.innerHTML = newTodo 
    newTodoDiv += `<button onclick="deleteTodo(this.parentElement)">Delete</button>`
    newTodoDiv += `<button onclick="editTodo()">Edit</button>`
    todosDiv.appendChild(newTodoDiv)
    inputTodo.value = ""
}


function deleteTodo(todo) {
    todos = todos.filter(t => t !== todo)
    todo.remove()
}


function editTodo(){

}