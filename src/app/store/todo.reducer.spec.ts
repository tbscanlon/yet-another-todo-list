import { reducer } from "./todo.reducer";
import { Todo } from "../models/todo";
import { TODO, TODO_2, TODO_3 } from "../../spec/mocks";

import * as todoActions from "./todo.actions";
import * as todoState from "./todo.state";

describe("Reducer: Todo", () => {
    let initialState: todoState.TodoState;
    let testState: todoState.TodoState;
    let result: todoState.TodoState;

    beforeEach(() => {
        initialState = todoState.initialState;
    });

    describe("By default", () => {
        it("Returns the current state", () => {
            result = reducer(initialState, {} as any);
            expect(result).toEqual(initialState);
        });
    });

    describe("ADD_TODO", () => {
        it("Adds the new todo to the store", () => {
            result = reducer(initialState, new todoActions.Add(TODO));
            expect(result.entities[1]).toEqual(TODO);
        });
    });

    describe("EDIT_TODO", () => {
        beforeEach(() => {
            testState = reducer(initialState, new todoActions.Add(TODO));
            result = reducer(testState, new todoActions.Edit(
                TODO.id,
                { isComplete: true }
            ));
        });

        it("Marks the selected todo as complete", () => {
            expect(result.entities[1].isComplete).toBeTruthy();
        });

        it("Marks a previously complete todo as incomplete", () => {
            result = reducer(testState, new todoActions.Edit(
                TODO.id,
                { isComplete: false }
            ));
            expect(result.entities[1].isComplete).toBeFalsy();
        });

        it("Does not modify existing state if no todo matches dispatched ID", () => {
            reducer(testState, new todoActions.Edit(TODO_2.id, { isComplete: true }));
            expect(testState).not.toContain(TODO_2);
        });
    });

    describe("REMOVE_TODO", () => {
        beforeEach(() => {
            testState = reducer(initialState, new todoActions.Add(TODO));
        });

        it("Deletes the specified todo", () => {
            result = reducer(testState, new todoActions.Remove(TODO.id));
            expect(result.entities[1]).not.toContain(TODO);
        });

        it("Does not delete any todos if the ID is invalid", () => {
            result = reducer(testState, new todoActions.Remove(TODO_2.id));
            expect(result.entities[1]).toEqual(TODO);
        });
    });

    describe("DELETE_TODOS", () => {
        beforeEach(() => {
            result = reducer(initialState, new todoActions.Reset());
        });

        it("Sets the loading flag", () => {
            expect(result.isLoading).toBeTruthy();
        });
    });

    describe("DELETE_TODOS_SUCCESS", () => {
        beforeEach(() => {
            testState = reducer(initialState, new todoActions.Add(TODO));
            testState = reducer(testState, new todoActions.Add(TODO_2));
            testState = reducer(testState, new todoActions.Add(TODO_3));
        });

        it("Resets the state", () => {
            result = reducer(testState, new todoActions.ResetSuccess());
            expect(result).toEqual(initialState);
        });
    });

    describe("LOAD_TODOS", () => {
        beforeEach(() => {
            result = reducer(initialState, new todoActions.Load());
        });

        it("Sets the loading flag", () => {
            expect(result.isLoading).toBeTruthy();
        });
    });

    describe("LOAD_TODOS_SUCCESS", () => {
        beforeEach(() => {
            result = reducer(initialState, new todoActions.LoadSuccess([
                TODO, TODO_2, TODO_3
            ]));
        });

        it("Adds all found todos to the store", () => {
            expect(result.entities[1]).toEqual(TODO);
            expect(result.entities[2]).toEqual(TODO_2);
            expect(result.entities[3]).toEqual(TODO_3);
        });
    });

    describe("SAVE_TODOS", () => {
        beforeEach(() => {
            result = reducer(initialState, new todoActions.Save());
        });

        it("Sets the loading flag", () => {
            expect(result.isLoading).toBeTruthy();
        });
    });

    describe("SAVE_TODOS_SUCCESS", () => {
        beforeEach(() => {
            result = reducer(initialState, new todoActions.SaveSuccess());
        });

        it("Sets the loading flag", () => {
            expect(result.isLoading).toBeFalsy();
        });
    });
});
