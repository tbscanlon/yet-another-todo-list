import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";
import { Todo } from "../../models/todo";

@Component({
  selector: "app-new-todo",
  templateUrl: "./new-todo.component.html",
  styleUrls: ["./new-todo.component.css"]
})
export class NewTodoComponent implements OnInit {

  @ViewChild("f") newTodo: NgForm;
  private newTodoId = 0;

  constructor(private store: Store<todoState.TodoState>) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm): void {
    this.incrementId();

    this.store.dispatch(
      new todoActions.Add(
        this.createTodo(form.value.content)
      )
    );
  }

  private createTodo(content: string): Todo {
    return {
      id: this.newTodoId,
      content: content,
      isComplete: false
    };
  }

  private incrementId(): void {
    this.newTodoId += 1;
  }

}
