import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { Todo } from "../models/todo";

import * as todoState from "../store/todo.state";
import * as fromTodo from "../store/todo.reducer";
import * as todoActions from "../store/todo.actions";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent {
  public todos$: Observable<Todo[]>;

  constructor(private store: Store<todoState.State>) {
    this.todos$ = this.store.select(fromTodo.getTodos);
    // TODO (hehe): ngFor todos in store, create add todo component and wire that up
  }

}
