import { Todo } from "../app/models/todo";
import { List } from "../app/models/list";

export const TODO: Todo = { id: "1", content: "Write Unit Tests", isComplete: false };
export const TODO_2: Todo = { id: "2", content: "Buy Milk", isComplete: false };
export const TODO_3: Todo = { id: "3", content: "Hide the bodies", isComplete: false };

export const COMPLETED_TODO: Todo = { id: "1", content: "Write Unit Tests", isComplete: true };

export const TODO_LIST: Todo[] = [TODO, TODO_2, TODO_3];

export const LIST_OBJECT: List = { todos: TODO_LIST };
