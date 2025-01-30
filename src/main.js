import "./style.css";
import { App } from "./todos/App";
import todoStore from "./store/todo-store";

todoStore.initStore();

App("#app");
