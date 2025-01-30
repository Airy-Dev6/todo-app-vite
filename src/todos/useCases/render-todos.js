import { Todo } from "../models/todo-model";
import { createTodoHtml } from "./create-todo-html";

export const renderTodos = (elementId, todos = []) => {
  let element;
  element ||= document.querySelector(elementId);

  //   if (!elemento) element = document.querySelector(elementId);

  if (!element) throw Error(`Element ${elementId} not found `);

  element.innerHTML = "";

  todos.forEach((todo) => {
    element.append(createTodoHtml(todo));
  });
};
