import { createSelector } from "@ngrx/store";
import { State, initialState } from "./todo.state";

import * as todoActions from "./todo.actions";

export function reducer(state: State = initialState, action: todoActions.Actions): State {

    switch (action.type) {
        case todoActions.ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            };

        case todoActions.COMPLETE_TODO:
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    if (todo.id === action.payload) {
                        return { ...todo, isComplete: true };
                    }
                    return todo;
                })
            };

        case todoActions.REMOVE_TODO:
        return {
            ...state,
            todoList: state.todoList.filter(todo => todo.id !== action.payload)
        };

        case todoActions.RESET_TODOS:
            return initialState;

        default:
            console.log(state, action);
            return state;
    }
}

export const getState = state => state.reducer;
export const getTodos = createSelector(getState, state => state.todoList);
