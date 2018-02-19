import { AppPage } from "./app.po";

describe("todo-ngrx App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  describe("Initialisation", () => {
    it("should display welcome message", () => {
      expect(page.getParagraphText()).toEqual("Yet Another Todo List");
    });

    it("Does not have any todos on first visit", () => {
      expect(page.getTodoList()).toBeFalsy();
    });
  });

  describe("Using the Todo List", () => {
    it("Successfully adds a todo to the list", () => {
      expect(page.addAndGetTodo()).toEqual(page.TODO_TEXT);
    });
  });
});
