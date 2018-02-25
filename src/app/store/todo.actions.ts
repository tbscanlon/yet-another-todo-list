import { Action } from "@ngrx/store";

import { Todo } from "../models/todo";

export const ADD_TODO      = "[Todo] Add";
export const COMPLETE_TODO = "[Todo] Complete";
export const REMOVE_TODO   = "[Todo] Remove";
export const RESET_TODOS   = "[Todo] Reset";
export const GET_TODOS     = "[Todo] Get All";

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(public payload: Todo) { }
}

export class Complete implements Action {
    readonly type = COMPLETE_TODO;

    constructor(public id: number, public changes: Partial<Todo>) { }
}

export class Remove implements Action {
    readonly type = REMOVE_TODO;

    constructor(public payload: number) { }
}

export class Reset implements Action {
    readonly type = RESET_TODOS;
}

export class GetAll implements Action {
    readonly type = GET_TODOS;

    constructor(public todos: Todo[]) { }
}

export type Actions = Add | Complete | Remove | Reset | GetAll;
