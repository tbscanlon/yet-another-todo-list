import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { Observable } from "rxjs/Observable";

export interface List {
  todos: Todo[];
}

/**
 * Represents an interface for interacting with the browser's
 * local storage.
 * @class LocalstorageService
 */
@Injectable()
export class LocalstorageService {

  private storage: Storage = localStorage;
  private key              = "todo-list";

  /**
   * Removes all saved data from the local storage.
   */
  public clear(): void {
    this.storage.clear();
  }

  /**
   * Saves all todos passed in to local storage.
   * @param {Todo[]} todos An array of todos to be saved.
   */
  public saveAllTodos(todos: Todo[]): void {
    const listToSave: List = { todos: todos };
    this.clear();

    this.storage.setItem(
      this.key,
      this.convertToString(listToSave)
    );
  }

  /**
   * Fetches all previously saved todos from the local storage.
   * @returns {Todo[]} An array of all saved todos.
   */
  public getAllTodos(): Todo[] {
    if (this.storage.length === 0) {
      this.initialiseNewList(this.key);
    }

    return this.loadTodoList(this.key).todos;
  }

  /**
   * Creates an empty todo list in local storage.
   * @param {string} id An identifier for the todo list.
   */
  private initialiseNewList(id: string): void {
    this.storage.setItem(
      id,
      JSON.stringify({ todos: [] }
      )
    );
  }

  /**
   * Fetches a todo list from local storage by its ID.
   * @param {string} storageIndex The ID of the saved todo.
   */
  private loadTodoList(storageIndex: string): List {
    return this.convertToTodoList(
      this.storage.getItem(storageIndex)
    );
  }

  /**
   * Converts a todo list to a string so that it can be saved in
   * local storage.
   * @param {List} list The todo list to be saved.
   */
  private convertToString(list: List): string {
    return JSON.stringify(list);
  }

  /**
   * Converts a previously saved todo list to a list object
   * so that it can be loaded by the application.
   * @param {string} item The saved todo list to be loaded.
   */
  private convertToTodoList(item: string): List {
    return JSON.parse(item);
  }

}
