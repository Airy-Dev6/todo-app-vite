import { Todo } from "../models/todo-model";

export const createTodoHtml = (todo) => {
  if (!todo) throw Error("A TODO object es required");

  const { done, description, id } = todo;

  const html = `
    
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;
  const liElement = document.createElement("li");
  liElement.innerHTML = html;
  liElement.setAttribute("data-id", id);

  if (todo.done) liElement.classList.add("completed");

  return liElement;
};
