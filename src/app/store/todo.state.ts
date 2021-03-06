import { Todo } from "../models/todo";
import { createEntityAdapter } from "@ngrx/entity";
import { EntityState } from "@ngrx/entity";

// Create entity adapter
export const todoAdapter = createEntityAdapter<Todo>();

// create an interface that works with entity
export interface TodoState extends EntityState<Todo> {
    isLoading: boolean;
}

// Set up initialstate to be used with ngrx/entity
export const initialState = todoAdapter.getInitialState({
    isLoading: false
});
