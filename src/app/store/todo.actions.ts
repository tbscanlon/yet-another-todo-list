import { Action } from "@ngrx/store";

import { Todo } from "../models/todo";

export enum todoActions {
    ADD_TODO      = "[Todo] Add",
    COMPLETE_TODO = "[Todo] Complete",
    EDIT_TODO     = "[Todo] Edit",
    REMOVE_TODO   = "[Todo] Remove",
    RESET_TODOS   = "[Todo] Reset"
}

export class Add implements Action {
    readonly type = todoActions.ADD_TODO;

    constructor(public payload: Todo) { }
}

export class Complete implements Action {
    readonly type = todoActions.COMPLETE_TODO;

    constructor(public id: string, public changes: Partial<Todo>) { }
}

export class Remove implements Action {
    readonly type = todoActions.REMOVE_TODO;

    constructor(public payload: string) { }
}

export class Reset implements Action {
    readonly type = todoActions.RESET_TODOS;
}

export type Actions = Add | Complete | Remove | Reset;
