import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Todo } from "../models/todo";
import { TodoListComponent } from "./todo-list.component";

import * as todoState from "../store/todo.state";
import * as fromTodo from "../store/todo.reducer";
import * as todoActions from "../store/todo.actions";

describe("TodoListComponent", () => {
  const TODO: Todo = { id: 1, content: "Write Unit Tests", isComplete: false };
  const TODO_2: Todo = { id: 2, content: "Buy Milk", isComplete: false };
  const TODO_3: Todo = { id: 3, content: "Hide the bodies", isComplete: false };
  const TODO_LIST: Todo[] = [TODO, TODO_2, TODO_3];

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockStore: jasmine.SpyObj<any>;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj("store", ["select", "dispatch"]);

    mockStore.select.and.returnValue(
      Observable.of(TODO_LIST)
    );

    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  describe("On Initialisation", () => {
    it("Initialises successfully", () => {
      expect(component).toBeTruthy();
    });

    it("Fetchs the todo list from the store", async(() => {
      expect(mockStore.select).toHaveBeenCalledWith(fromTodo.getTodos);
    }));

    it("Streams the todos from the store to todos$", async(() => {
      component.todos$.subscribe(result => {
        expect(result).toEqual(TODO_LIST);
      });
    }));
  });
});
