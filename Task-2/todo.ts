type Todo = {
    id: number,
    title: string,
    dueDate: Date,
}

let todos: Todo[] = []
let ids = 1

function addTodo(title: string, dueDate: Date): Todo {
    let newTodo: Todo = {
        id: ids++,
        title: title,
        dueDate: dueDate
    }
    todos.push(newTodo)
    return newTodo
}

function editTodo(updateTodo: Todo): Todo | null {
    let index = todos.findIndex(todo => todo.id === updateTodo.id)
    if (index !== -1) {
        todos[index].title = updateTodo.title
        todos[index].dueDate = updateTodo.dueDate
        return todos[index]
    }
    return null
}

function removeTodo(id: number): Todo | null {
    let index = todos.findIndex(todo => todo.id === id)
    if (index !== -1) {
        let removedTodo = todos.splice(index, 1)
        return removedTodo[0]
    }
    return null
}

function displayTodos(): Todo[] {
    return todos
}


//test
console.log(addTodo('task1', new Date('2021-12-01')))
console.log(addTodo('task2', new Date('2021-12-02')))
console.log(addTodo('task3', new Date('2021-12-03')))
console.log(displayTodos())
console.log(editTodo({
    id: 2,
    title: 'task2 updated',
    dueDate: new Date('2021-12-04')
}))
console.log(displayTodos())
console.log(removeTodo(1))
console.log(displayTodos())
console.log(removeTodo(1));
console.log(displayTodos());
console.log(removeTodo(2));
console.log(displayTodos());
console.log(removeTodo(3));
console.log(displayTodos());
console.log(removeTodo(3));
console.log(displayTodos());