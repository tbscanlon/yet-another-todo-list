import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { TodoComponent } from "./todo.component";
import { Todo } from "../../models/todo";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";

@Component({
  selector: "app-test-host",
  template: `<app-todo></app-todo>`
})
class TestHostComponent {
  @ViewChild(TodoComponent) public todoComponent: TodoComponent;
}

describe("TodoComponent", () => {
  const TODO: Todo = { id: 1, content: "Write Unit Tests", isComplete: false };

  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TodoComponent;
  let el: any; // DebugElement.nativeElement is typed as any within angular/core
  let mockStore: jasmine.SpyObj<Store<todoState.TodoState>>;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj("store", ["select", "dispatch"]);

    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, TodoComponent ],
      providers: [ { provide: Store, useValue: mockStore } ]
    })
    .compileComponents();

    fixture   = TestBed.createComponent(TestHostComponent);
    host      = fixture.componentInstance;
    component = host.todoComponent;
    el        = fixture.debugElement.nativeElement;

    component.todo = TODO;

    fixture.detectChanges();
  }));

  describe("On Initialisation", () => {
    it("Initialises successfully", () => {
      expect(host).toBeTruthy();
    });

    it("Displays the todo's content", () => {
    expect(el.querySelector("h2").textContent).toContain(TODO.content);
    });

    it("Has a 'Complete Todo' button", () => {
      expect(el.querySelector("button.complete-todo").textContent).toContain("Complete");
    });
  });

  describe("#completeTodo", () => {
    it("Dispatches a COMPLETE_TODO action when called", () => {
      component.completeTodo(TODO.id, { isComplete: true });
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new todoActions.Complete(TODO.id, { isComplete: true })
      );
    });
  });
});
