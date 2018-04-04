import { createSelector, createFeatureSelector } from "@ngrx/store";

import { initialState, TodoState, todoAdapter } from "./todo.state";
import { todoActions, Actions } from "./todo.actions";

import * as todoState from "./todo.state";

export function reducer(state: TodoState = initialState, action: Actions): TodoState {
    switch (action.type) {
        case todoActions.ADD_TODO:
            return todoAdapter.addOne(action.payload, state);

        case todoActions.COMPLETE_TODO:
            return todoAdapter.updateOne({
                id: action.id,
                changes: action.changes
            }, state);

        case todoActions.REMOVE_TODO:
            return todoAdapter.removeOne(action.payload, {
                ...state, isLoading: false
            });

        case todoActions.DELETE_TODOS:
            return { ...state, isLoading: true };

        case todoActions.DELETE_TODOS_SUCCESS:
            return todoAdapter.removeAll({
                ...state,
                isLoading: false
            });

        case todoActions.LOAD_TODOS:
            return { ...state, isLoading: true };

        case todoActions.LOAD_TODOS_SUCCESS:
            return todoAdapter.addAll(action.payload, {
                ...state,
                isLoading: false
            });

        case todoActions.SAVE_TODOS:
            return { ...state, isLoading: true };

        case todoActions.SAVE_TODOS_SUCCESS:
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
