import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";

import { TodoComponent } from "./todo.component";
import { Todo } from "../../models/todo";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, TodoComponent ]
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
});
