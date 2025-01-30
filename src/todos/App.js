import todoStore from "../store/todo-store";
import html from "./app.html?raw";
import { renderTodos } from "./useCases";

const ElementsIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  BtnDelet: ".destroy",
};

export const App = (elementID) => {
  const dRenderTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementsIds.TodoList, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector("#app").append(app);
    dRenderTodos();
  })();

  // Referencias HTML

  const newDescriptionInput = document.querySelector(ElementsIds.NewTodoInput);

  const todoListUl = document.querySelector(ElementsIds.TodoList);
  const deleteById = document.querySelector(ElementsIds.BtnDelet);

  //  Listeners

  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    dRenderTodos();
    event.target.value = "";
  });

  todoListUl.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    //console.log(element.getAttribute("data-id"));
    todoStore.toggleTodo(element.getAttribute("data-id"));
    dRenderTodos();
  });

  // deleteById.addEventListener("click", (event) => {
  //   let eDelete = event.target.closest("[data-id]");
  //   console.log(eDelete);
  //   console.log(event.target);
  //   console.log(eDelete.getAttribute("data-id"));

  //   todoStore.deleteTodo(eDelete.getAttribute("data-id"));
  //   dRenderTodos();
  // });

  todoListUl.addEventListener("click", (event) => {
    let isDestroy = event.target.className === "destroy";
    if (!isDestroy) return;

    let idTodoDelete = event.target.closest("[data-id]");
    idTodoDelete = idTodoDelete.getAttribute("data-id");

    todoStore.deleteTodo(idTodoDelete);
    dRenderTodos();
  });
};
