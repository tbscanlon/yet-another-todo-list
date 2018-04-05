import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { LocalstorageService } from "../services/localstorage.service";
import { Todo } from "../models/todo";

import * as todoState from "../store/todo.state";
import * as fromTodo from "../store/todo.reducer";
import * as todoActions from "../store/todo.actions";

/**
 * Represents a list which contains todo items
 * @class TodoListComponent
 */
@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent {
  public incompleteTodos$: Observable<Todo[]>;
  public completeTodos$: Observable<Todo[]>;

  constructor(
    private store: Store<todoState.TodoState>,
    private storage: LocalstorageService
  ) {
    store.dispatch(new todoActions.Load());
    this.incompleteTodos$ = store.select(fromTodo.selectIncompleteTodos);
    this.completeTodos$ = store.select(fromTodo.selectCompleteTodos);
  }

  /**
   * Tells the store to delete all todos. Called when the
   * reset button in the template is clicked.
   */
  public handleResetTodos(): void {
    this.store.dispatch(new todoActions.Reset());
  }

}
