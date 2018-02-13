import { Component } from "@angular/core";
// import { Store } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";

// import { Todo } from "./models/todo";

// import * as todoState from "./store/todo.state";
// import * as fromTodo from "./store/todo.reducer";
// import * as todoActions from "./store/todo.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // public todos$: Observable<Todo[]>;

  // constructor(private store: Store<todoState.State>) {
  //   this.todos$ = this.store.select(fromTodo.getTodos);
  //   this.store.dispatch(new todoActions.Add({ id: 1, content: "hello", isComplete: false}));
  // }
}
