import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Todo } from "../../models/todo";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent {
  @Input() todo: Todo;

  constructor(private store: Store<todoState.TodoState>) { }

  public completeTodo(id: string): void {
    this.store.dispatch(
      new todoActions.Complete(id, { isComplete: true })
    );
  }

  public deleteTodo(id: string): void {
    this.store.dispatch(
      new todoActions.Remove(id)
    );
  }
}
