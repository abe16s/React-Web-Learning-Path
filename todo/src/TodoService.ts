import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService  = {
  
  getTodos: (): TodoTypes[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  },

  addTodo: (text: string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = {
      id: todos.length + 1,
      text,
      completed: false
    };
    todos.push(newTodo);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
  },

  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return todo;
  },

  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
  }
} 

export default TodoService;