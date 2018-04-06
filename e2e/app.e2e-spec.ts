import { AppPage } from "./app.po";

describe("todo-ngrx App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  afterEach(() => {
    page.clearStorage();
  });

  describe("Initialisation", () => {
    it("Shows the app title", () => {
      expect(page.getParagraphText()).toEqual("Yet Another Todo List");
    });

    it("Shows a form for adding a new todo", () => {
      expect(page.getNewTodoForm()).toBeTruthy();
    });

    describe("On first load", () => {
      it("Does not have any todos on first visit", () => {
        expect(page.getTodoList()).not.toContain("Done");
      });
    });

    describe("On subsequent loads", () => {
      it("Displays saved todos from previous visits", () => {
        page.addAndGetTodo();
        page.navigateTo();
        expect(page.getTodoList()).toContain(page.TODO_TEXT);
      });
    });
  });

  describe("Using the Todo List", () => {
    describe("Adding and completing todos", () => {
      it("Adds a todo to the list", () => {
        expect(page.addAndGetTodo()).toBe(page.TODO_TEXT);
      });

      it("Marks a todo as complete", () => {
        expect(page.addAndCompleteTodo()).toBeTruthy();
      });
    });

    describe("Removing todos", () => {
      it("Removes a uncomplete todo", () => {
        page.addThenRemoveTodo();
        expect(page.getTodoList()).not.toContain(page.TODO_TEXT);
      });

      it("Removes a completed todo", () => {
        page.addAndCompleteTodo();
        page.removeTodo();
        expect(page.getTodoList()).not.toContain(page.TODO_TEXT);
      });
    });

    describe("Clearing the todo list", () => {
      it("Resets the entire list", () => {
        page.addAndCompleteTodo();
        page.addAndGetTodo();
        page.resetTodoList();
        expect(page.getTodoList).not.toContain(page.TODO_TEXT);
      });
    });
  });
});
