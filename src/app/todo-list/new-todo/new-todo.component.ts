import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";
import { Todo } from "../../models/todo";

/**
 * Represents the form which allows a user to create
 * a new todo.
 * @class NewTodoComponent
 */
@Component({
  selector: "app-new-todo",
  templateUrl: "./new-todo.component.html",
  styleUrls: ["./new-todo.component.css"]
})
export class NewTodoComponent {

  @ViewChild("f") newTodo: NgForm;

  constructor(private store: Store<todoState.TodoState>) { }

  /**
   * Handles the creation of a new todo. Called when the form
   * is submitted.
   * @param {NgForm} form The completed form.
   * @param {string} [id] The id of the new todo to be created.
   */
  public onSubmit(form: NgForm, id?: string): void {
    this.store.dispatch(
      new todoActions.Add(
        this.createTodo(form.value.content, id)
      )
    );
  }

  /**
   * Creates a new todo object.
   * @param {string} content The text content of the todo.
   * @param {string} id An ID for the todo to be created.
   * @returns {Todo} a new Todo object.
   */
  private createTodo(content: string, id: string): Todo {
    return {
      id: (id || this.generateId()),
      content: content,
      isComplete: false
    };
  }

  /**
   * Creates a unique ID for a new todo using the system's
   * current time.
   * @returns {string} An ID string.
   */
  private generateId(): string {
    return new Date()
      .valueOf()
      .toString();
  }

}
