import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { map, catchError, switchMap, take } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { LocalstorageService } from "../services/localstorage.service";
import { Todo } from "../models/todo";

import * as todoActions from "./todo.actions";
import * as todoState from "./todo.state";
import * as fromTodo from "../store/todo.reducer";

@Injectable()
export class TodoEffects {

    constructor(
        private action$: Actions,
        private storage: LocalstorageService,
        private store: Store<todoState.TodoState>
    ) { }

    @Effect()
    load$: Observable<Action> = this.action$
    .pipe(
        ofType(todoActions.types.LOAD_TODOS),
        map((action: todoActions.Load) => {
            return new todoActions.LoadSuccess(
                this.storage.getAllTodos()
            );
        }),
    );

    @Effect()
    edit$: Observable<Action> = this.action$
    .ofType(
        todoActions.types.ADD_TODO,
        todoActions.types.EDIT_TODO,
        todoActions.types.REMOVE_TODO
    )
    .pipe(
        switchMap((action: todoActions.Add |
            todoActions.Edit |
            todoActions.Remove
        ) => {
            return of(new todoActions.Save());
        }),
    );

    @Effect()
    save$: Observable<Action> = this.action$
    .pipe(
        ofType(todoActions.types.SAVE_TODOS),
        map((action: todoActions.Save) => {
            this.store.pipe(
                select(fromTodo.selectAllTodos),
                take(1)
            )
            .subscribe(todos => this.storage.saveAllTodos(todos));

            return (new todoActions.SaveSuccess);
        }),
    );

    @Effect()
    reset$: Observable<Action> = this.action$
    .pipe(
        ofType(todoActions.types.DELETE_TODOS),
        map(action => {
            this.storage.clear();
            return (new todoActions.ResetSuccess);
        }),
    );

}
