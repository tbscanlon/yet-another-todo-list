import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { LocalstorageService } from "../services/localstorage.service";
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

  constructor(
    private store: Store<todoState.TodoState>,
    private storage: LocalstorageService
  ) {
    store.dispatch(new todoActions.Load());
    this.todos$ = store.select(fromTodo.selectAllTodos);
  }

  // // TODO: Move into effect
  // public saveTodos(): void {
  //   this.todos$.forEach((todos: Todo[]) => {
  //     todos.forEach(todo => this.storage.save(todo));
  //   });
  // }

}
