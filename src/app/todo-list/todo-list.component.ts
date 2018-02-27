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

  constructor(private store: Store<todoState.TodoState>) {
    // this.todos$ = this.store.select(fromTodo.getTodos);
    // TODO (hehe): ngFor todos in store, create add todo component and wire that up
    this.store.dispatch(new todoActions.Add({
      id: 100,
      content: "hello",
      isComplete: false
    }));
    this.store.dispatch(new todoActions.Add({
      id: 200,
      content: "hello",
      isComplete: false
    }));
    this.store.dispatch(new todoActions.Add({
      id: 300,
      content: "hello",
      isComplete: false
    }));
    this.todos$ = this.store.select(fromTodo.selectAllTodos);
    this.todos$.subscribe(res => console.log(res));
  }

}
