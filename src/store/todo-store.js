import { Todo } from "../todos/models/todo-model";

const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del infinito"),
    new Todo("Piedra del Alma"),
    new Todo("Piedra del tiempo"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
};

const loadStore = () => {
  console.log(localStorage.getItem("state"));
  if (!localStorage.getItem("state")) return;

  const { todos, filter } = JSON.parse(localStorage.getItem("state"));
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  console.log(JSON.stringify(state));

  localStorage.setItem("state", JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);

    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

const toggleTodo = (todoID) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoID) {
      todo.done = !todo.done;
    }

    return todo;
  });
  saveStateToLocalStorage();
};

// const deleteTodo = (todoID) => {
//   state.todos.filter((todo) => todo.id !== todoID);
// };

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

const deleteComplete = () => {
  state.todos = state.todo.filter((todos) => todos.done);
  saveStateToLocalStorage();
};

const setSelecterFilter = (newFilter = Filters.All) => {
  state.Filters = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteComplete,
  setSelecterFilter,
  getCurrentFilter,
  getTodos,
};
