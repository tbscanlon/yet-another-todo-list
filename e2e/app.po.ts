import { browser, by, element, promise } from "protractor";

export class AppPage {
  public TODO_TEXT = "Write more tests";

  public navigateTo(): promise.Promise<any> {
    return browser.get("/");
  }

  public clearStorage(): promise.Promise<Object> {
    return browser.executeScript("window.localStorage.clear();");
  }

  public getParagraphText(): promise.Promise<string> {
    return element(by.css("app-root h1")).getText();
  }

  public getNewTodoForm(): promise.Promise<string> {
    return element(by.css("app-new-todo")).getText();
  }

  public getTodoList(): promise.Promise<string> {
    return browser.findElement(by.tagName("app-todo-list")).getText();
  }

  public addAndGetTodo(): promise.Promise<string> {
    this.addTodo();
    return this.getTodoText();
  }

  public addAndCompleteTodo(): promise.Promise<string> {
    this.addAndGetTodo();
    return this.completeTodo();
  }

  public addThenRemoveTodo(): void {
    this.addTodo();
    this.removeTodo();
  }

  public removeTodo(): void {
    element(by.css(".remove-todo")).click();
  }

  public resetTodoList(): void {
    element(by.cssContainingText("button", "Reset")).click();
  }

  private completeTodo(): promise.Promise<string> {
    element(by.css("input[type='checkbox']")).click();
    return element(by.css("input[type='checkbox']")).getAttribute("checked");
  }

  private getTodoText(): promise.Promise<string> {
    return element(by.css(".todo-content")).getText();
  }

  private addTodo(): void {
    const todoInput = browser.findElement(by.css("input[name='content']"));
    const addButton = browser.findElement(by.css("button[type='submit']"));

    todoInput.sendKeys(this.TODO_TEXT);
    addButton.click();
  }
}
