import { Todo } from "../models/todo";

export interface State {
    todoList: Todo[];
}

export const initialState: State = {
    todoList: []
};
