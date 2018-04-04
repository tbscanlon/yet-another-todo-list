import { reducer } from "./todo.reducer";
import { Todo } from "../models/todo";

import * as todoActions from "./todo.actions";
import * as todoState from "./todo.state";

describe("Reducer: Todo", () => {
    const TODO: Todo = { id: "1", content: "Write Unit Tests", isComplete: false };
    const TODO_2: Todo = { id: "2", content: "Buy Milk", isComplete: false };
    const TODO_3: Todo = { id: "3", content: "Hide the bodies", isComplete: false };

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

    describe("COMPLETE_TODO", () => {
        beforeEach(() => {
            testState = reducer(initialState, new todoActions.Add(TODO));
        });

        it("Marks the selected todo as complete", () => {
            result = reducer(testState, new todoActions.Complete(
                TODO.id, { isComplete: true }
            ));
            console.log(result.entities[1]);
            expect(result.entities[1]["isComplete"]).toBeTruthy();
        });

        it("Does not modify existing state if no todo matches dispatched ID", () => {
            reducer(testState, new todoActions.Complete(TODO_2.id, { isComplete: true }));
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

    describe("RESET_TODOS_SUCCESS", () => {
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
});
