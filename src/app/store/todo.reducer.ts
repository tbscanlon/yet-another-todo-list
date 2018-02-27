import { createSelector, createFeatureSelector } from "@ngrx/store";
import { initialState, TodoState, todoAdapter } from "./todo.state";

import * as todoActions from "./todo.actions";
import * as todoState from "./todo.state";

export function reducer(state: TodoState = initialState, action: todoActions.Actions): TodoState {
    switch (action.type) {
        case todoActions.ADD_TODO:
            return todoAdapter.addOne(action.payload, state);

        case todoActions.COMPLETE_TODO:
            return todoAdapter.updateOne({
                id: action.id,
                changes: action.changes
            }, state);

        case todoActions.REMOVE_TODO:
            return todoAdapter.removeOne(action.payload, state);

        case todoActions.RESET_TODOS:
            return initialState;

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
