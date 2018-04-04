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
    load$: Observable<Action> = this.action$.pipe(
        ofType(todoActions.todoActions.LOAD_TODOS),
        map((action: todoActions.Load) => {
            return new todoActions.LoadSuccess(
                this.storage.getAllTodos()
            );
        }),
        catchError(err => of(err))
    );

    @Effect()
    edit$: Observable<Action> = this.action$
    .ofType(
        todoActions.todoActions.ADD_TODO,
        todoActions.todoActions.COMPLETE_TODO,
        todoActions.todoActions.REMOVE_TODO
    )
    .pipe(
        switchMap((action: todoActions.Add |
            todoActions.Complete |
            todoActions.Remove
        ) => {
            return of(new todoActions.Save());
        }),
        catchError(err => of(err))
    );

    @Effect()
    save$: Observable<Action> = this.action$.pipe(
        ofType(todoActions.todoActions.SAVE_TODOS),
        map((action: todoActions.Save) => {
            this.store.pipe(
                select(fromTodo.selectAllTodos),
                take(1)
            )
            .subscribe(todos => this.storage.saveAllTodos(todos));

            return (new todoActions.SaveSuccess);
        }),
        catchError(err => of(err))
    );

    @Effect()
    reset$: Observable<Action> = this.action$.pipe(
        ofType(todoActions.todoActions.DELETE_TODOS),
        map(action => {
            this.storage.clear();
            return (new todoActions.ResetSuccess);
        }),
        catchError(err => of(err))
    );

}
