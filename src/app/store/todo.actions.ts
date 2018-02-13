import { Action } from "@ngrx/store";

import { Todo } from "../models/todo";

export const ADD_TODO      = "[Todo] Add";
export const COMPLETE_TODO = "[Todo] Complete";
export const REMOVE_TODO   = "[Todo] Remove";
export const RESET_TODOS   = "[Todo] Reset";

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(public payload: Todo) { }
}

export class Complete implements Action {
    readonly type = COMPLETE_TODO;

    constructor(public payload: number) { }
}

export class Remove implements Action {
    readonly type = REMOVE_TODO;

    constructor(public payload: number) { }
}

export class Reset implements Action {
    readonly type = RESET_TODOS;
}

export type Actions = Add | Complete | Remove | Reset;