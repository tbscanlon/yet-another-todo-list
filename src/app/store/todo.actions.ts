import { Action } from "@ngrx/store";

import { Todo } from "../models/todo";

export enum types {
    ADD_TODO             = "[Todo] Add",
    EDIT_TODO            = "[Todo] Edit",
    REMOVE_TODO          = "[Todo] Remove",
    DELETE_TODOS         = "[Todo] Reset",
    DELETE_TODOS_SUCCESS = "[Todo] Reset Success",
    LOAD_TODOS           = "[Todo] Load",
    LOAD_TODOS_SUCCESS   = "[Todo] Load Success",
    SAVE_TODOS           = "[Todo] Save",
    SAVE_TODOS_SUCCESS   = "[Todo] Save Success"
}

export class Add implements Action {
    readonly type = types.ADD_TODO;

    constructor(public payload: Todo) { }
}

export class Edit implements Action {
    readonly type = types.EDIT_TODO;

    constructor(public id: string, public changes: Partial<Todo>) { }
}

export class Remove implements Action {
    readonly type = types.REMOVE_TODO;

    constructor(public payload: string) { }
}

export class Reset implements Action {
    readonly type = types.DELETE_TODOS;
}

export class ResetSuccess implements Action {
    readonly type = types.DELETE_TODOS_SUCCESS;
}

export class Load implements Action {
    readonly type = types.LOAD_TODOS;
}

export class LoadSuccess implements Action {
    readonly type = types.LOAD_TODOS_SUCCESS;

    constructor(public payload: Todo[]) { }
}

export class Save implements Action {
    readonly type = types.SAVE_TODOS;
}

export class SaveSuccess implements Action {
    readonly type = types.SAVE_TODOS_SUCCESS;
}

export type Actions =
Add |
Edit |
Remove |
Reset |
ResetSuccess |
Load |
LoadSuccess |
Save |
SaveSuccess;
