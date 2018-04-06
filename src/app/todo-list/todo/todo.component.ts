import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Todo } from "../../models/todo";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";

/**
 * Represents an induvidual todo.
 * @class TodoComponent
 */
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent {
  @Input() todo: Todo;

  constructor(private store: Store<todoState.TodoState>) { }

  /**
   * Marks the todo as complete.
   * @param {string} id The id of the completed todo.
   */
  public toggleTodoCompletion(id: string): void {
    this.store.dispatch(
      new todoActions.Edit(id, { isComplete: !this.todo.isComplete })
    );
  }

  /**
   * Removes the todo from the list.
   * @param {string} id the id of the todo to be removed.
   */
  public deleteTodo(id: string): void {
    this.store.dispatch(
      new todoActions.Remove(id)
    );
  }
}
