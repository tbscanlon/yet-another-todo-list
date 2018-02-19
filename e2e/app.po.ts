import { browser, by, element, promise } from "protractor";

export class AppPage {
  public TODO_TEXT = "Write more tests";

  public navigateTo(): promise.Promise<any> {
    return browser.get("/");
  }

  public getParagraphText(): promise.Promise<string> {
    return element(by.css("app-root h1")).getText();
  }

  public getTodoList(): promise.Promise<string> {
    return browser.findElement(by.tagName("app-todo-list")).getText();
  }

  public addAndGetTodo(): promise.Promise<string> {
    this.addTodo();
    return browser.findElement(by.tagName("app-todo")).getText();
  }

  private addTodo() {
    const todoInput = browser.findElement(by.css("todo-content"));
    const addButton = browser.findElement(by.css("add-todo"));
    todoInput.sendKeys(this.TODO_TEXT);
    addButton.click();
  }
}
