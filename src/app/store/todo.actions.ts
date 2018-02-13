import { Action } from "@ngrx/store";

export const ADD_TODO      = "[Todo] Add";
export const COMPLETE_TODO = "[Todo] Complete";
export const REMOVE_TODO   = "[Todo] Remove";

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(payload: string) { }
}

export class Complete implements Action {
    readonly type = COMPLETE_TODO;

    constructor(payload: number) { }
}

export class Remove implements Action {
    readonly type = REMOVE_TODO;

    constructor(payload: number) { }
}
