import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.overrideComponent(TodoListComponent, {
      set: {
        selector: "app-todo-list"
      }})
      .createComponent(AppComponent);

    app = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it("Successfully initialise the app", async(() => {
    expect(app).toBeTruthy();
  }));

  it("Has a title in a h1 tag", async(() => {
    expect(app.querySelector("h1").textContent).toContain("Yet Another Todo List");
  }));

  it("Contains the Todo list", async(() => {
    expect(app.querySelector("app-todo-list")).toBeTruthy();
  }));
});
