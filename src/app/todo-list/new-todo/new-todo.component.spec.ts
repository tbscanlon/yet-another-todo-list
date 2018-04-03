import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewTodoComponent } from "./new-todo.component";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as todoState from "../../store/todo.state";
import * as todoActions from "../../store/todo.actions";
import { Todo } from "../../models/todo";

describe("NewTodoComponent", () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;
  let mockStore: jasmine.SpyObj<Store<todoState.TodoState>>;
  let el: any;

  const FORM_SUBMISSION = <NgForm> {
    value: {
      content: "Write unit tests"
    }
  };

  const NEW_TODO: Todo = {
    id: 1,
    content: FORM_SUBMISSION.value.content,
    isComplete: false
  };

  const ANOTHER_NEW_TODO: Todo = {
    id: 2,
    content: FORM_SUBMISSION.value.content,
    isComplete: false
  };

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj("store", ["select", "dispatch"]);

    TestBed.configureTestingModule({
      declarations: [ NewTodoComponent, NgForm ],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();

    fixture   = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    el        = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe("Initialisation", () => {
    it("Initialises successfully", () => {
      expect(component).toBeTruthy();
    });
  });

  describe("#onSubmit", () => {
    beforeEach(() => {
      component.onSubmit(FORM_SUBMISSION);
    });

    it("Dispatches an ADD_TODO action to the store", () => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new todoActions.Add(NEW_TODO)
      );
    });

    it("Creates multiple todos with unique IDs for each", () => {
      component.onSubmit(FORM_SUBMISSION);

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new todoActions.Add(ANOTHER_NEW_TODO)
      );
    });
  });
});
