import { TestBed, inject } from "@angular/core/testing";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Observable } from "rxjs/Observable";
import { Actions, Effect } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, Store } from "@ngrx/store";

import { TodoEffects } from "./todo.effects";
import { LocalstorageService } from "../services/localstorage.service";
import { Todo } from "../models/todo";
import { TODO, TODO_2, TODO_3, TODO_LIST } from "../../spec/mocks";

import * as todoActions from "./todo.actions";
import * as todoState from "./todo.state";

describe("Effects: Todo", () => {
    let effects: TodoEffects;
    let action$: ReplaySubject<Action>;
    let service: jasmine.SpyObj<LocalstorageService>;
    let store: jasmine.SpyObj<Store<todoState.TodoState>>;
    let result: Action;

    beforeEach(() => {
        service = jasmine.createSpyObj("storage", ["getAllTodos", "saveAllTodos", "clear"]);
        store   = jasmine.createSpyObj("store", ["pipe"]);

        TestBed.configureTestingModule({
            providers: [
                TodoEffects,
                provideMockActions(() => action$),
                { provide: LocalstorageService, useValue: service },
                { provide: Store, useValue: store }
            ]
        });

        effects = TestBed.get(TodoEffects);
        action$ = new ReplaySubject();
    });

    describe("#load$", () => {
        beforeEach((done: DoneFn) => {
            service.getAllTodos.and.returnValue(TODO_LIST);

            action$.next(new todoActions.Load());

            effects.load$.subscribe(res => {
                result = res;
                done();
            });
        });

        it("Fetches saved todos from local storage", () => {
            expect(service.getAllTodos).toHaveBeenCalledTimes(1);
        });

        it("Dispatches a LoadSuccess action", () => {
            expect(result.type).toEqual(todoActions.todoActions.LOAD_TODOS_SUCCESS);
        });
    });

    describe("$edit", () => {
        describe("Upon adding a new todo", () => {
            beforeEach((done: DoneFn) => {
                action$.next(new todoActions.Add(TODO));

                effects.edit$.subscribe(res => {
                    result = res;
                    done();
                });
            });

            it("Dispatches a Save action", () => {
                expect(result.type).toEqual(todoActions.todoActions.SAVE_TODOS);
            });
        });

        describe("Upon completing a todo", () => {
            beforeEach((done: DoneFn) => {
                action$.next(new todoActions.Complete(TODO.id, TODO));

                effects.edit$.subscribe(res => {
                    result = res;
                    done();
                });
            });

            it("Dispatches a Save action", () => {
                expect(result.type).toEqual(todoActions.todoActions.SAVE_TODOS);
            });
        });

        describe("Upon removing a todo", () => {
            beforeEach((done: DoneFn) => {
                action$.next(new todoActions.Remove(TODO.id));

                effects.edit$.subscribe(res => {
                    result = res;
                    done();
                });
            });

            it("Dispatches a Save action", () => {
                expect(result.type).toEqual(todoActions.todoActions.SAVE_TODOS);
            });
        });
    });

    describe("save$", () => {
        beforeEach((done: DoneFn) => {
            store.pipe.and.returnValue(
                Observable.of(TODO_LIST)
            );

            service.saveAllTodos.and.returnValue(undefined);

            action$.next(new todoActions.Save());

            effects.save$.subscribe(res => {
                result = res;
                done();
            });
        });

        it("Dispatches a SaveSuccess action", () => {
            expect(result.type).toEqual(todoActions.todoActions.SAVE_TODOS_SUCCESS);
        });

        it("Gets current todos from the store", () => {
            expect(store.pipe).toHaveBeenCalledTimes(1);
        });

        it("Saves current todos to local storage", () => {
            expect(service.saveAllTodos).toHaveBeenCalledWith(TODO_LIST);
        });
    });

    describe("#reset", () => {
        beforeEach((done: DoneFn) => {
            service.clear.and.returnValue(undefined);

            action$.next(new todoActions.Reset());

            effects.reset$.subscribe(res => {
                result = res;
                done();
            });
        });

        it("Clears local storage", () => {
            expect(service.clear).toHaveBeenCalledTimes(1);
        });

        it("Dispatches a ResetSuccess action", () => {
            expect(result.type).toEqual(todoActions.todoActions.DELETE_TODOS_SUCCESS);
        });
    });
});
