import { createSelector, createFeatureSelector } from "@ngrx/store";

import { initialState, TodoState, todoAdapter } from "./todo.state";
import { types, Actions } from "./todo.actions";

import * as todoState from "./todo.state";

export function reducer(state: TodoState = initialState, action: Actions): TodoState {
    switch (action.type) {
        case types.ADD_TODO:
            return todoAdapter.addOne(action.payload, state);

        case types.EDIT_TODO:
            return todoAdapter.updateOne({
                id: action.id,
                changes: action.changes
            }, state);

        case types.REMOVE_TODO:
            return todoAdapter.removeOne(action.payload, {
                ...state, isLoading: false
            });

        case types.DELETE_TODOS:
            return { ...state, isLoading: true };

        case types.DELETE_TODOS_SUCCESS:
            return todoAdapter.removeAll({
                ...state,
                isLoading: false
            });

        case types.LOAD_TODOS:
            return { ...state, isLoading: true };

        case types.LOAD_TODOS_SUCCESS:
            return todoAdapter.addAll(action.payload, {
                ...state,
                isLoading: false
            });

        case types.SAVE_TODOS:
            return { ...state, isLoading: true };

        case types.SAVE_TODOS_SUCCESS:
            return { ...state, isLoading: false };

        default:
            return state;
    }
}

export const getState = state => state.reducer;
export const getTodoState = createSelector(getState, state => state);

export const {
    selectIds,
    selectEntities,
    selectAll: selectAllTodos,
    selectTotal
} = todoAdapter.getSelectors(getTodoState);

export const selectCompleteTodos = createSelector(
    selectAllTodos,
    (todos) => todos.filter(todo => todo.isComplete)
);

export const selectIncompleteTodos = createSelector(
    selectAllTodos,
    (todos) => todos.filter(todo => !todo.isComplete)
);
