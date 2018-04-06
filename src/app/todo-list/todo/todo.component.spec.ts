import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { TodoComponent } from "./todo.component";
import { Todo } from "../../models/todo";
import { TODO, COMPLETED_TODO } from "../../../spec/mocks";

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
  });

  describe("#toggleTodoCompletion", () => {
    describe("Completing a todo", () => {
      beforeEach(() => {
        component.toggleTodoCompletion(TODO.id);
        component.todo = COMPLETED_TODO;
        fixture.detectChanges();
      });

      it("Dispatches en EDIT_TODO action to mark the todo as completed", () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          new todoActions.Edit(TODO.id, { isComplete: true })
        );
      });
    });

    describe("Un-completing a todo", () => {
      beforeEach(() => {
        component.todo = COMPLETED_TODO;
        component.toggleTodoCompletion(COMPLETED_TODO.id);
        fixture.detectChanges();
      });

      it("Dispatches an EDIT_TODO action to mark the todo as not completed", () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          new todoActions.Edit(COMPLETED_TODO.id, { isComplete: false })
        );
      });
    });
  });

  describe("#deleteTodo", () => {
    it("Dispatches a REMOVE_TODO action when called", () => {
      component.deleteTodo(TODO.id);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new todoActions.Remove(TODO.id)
      );
    });
  });
});
