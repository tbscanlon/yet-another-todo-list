import { createSelector } from "@ngrx/store";
import { State, initialState, TodoState, todoAdapter } from "./todo.state";

import * as todoActions from "./todo.actions";

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

// Not needed anymore?
// export const getState = state => state.reducer;
// export const getTodos = createSelector(getState, state => state.todoList);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = todoAdapter.getSelectors();
