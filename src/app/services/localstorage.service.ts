import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { Observable } from "rxjs/Observable";

/**
 * Represents an interface for interacting with the browser's
 * local storage.
 * @class LocalstorageService
 */
@Injectable()
export class LocalstorageService {

  private storage: Storage = localStorage;

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
    this.clear();

    todos.forEach((todo: Todo) => {
      this.storage.setItem(
        todo.id,
        this.convertToString(todo)
      );
    });
  }

  /**
   * Fetches all previously saved todos from the local storage.
   * @returns {Todo[]} An array of all saved todos.
   */
  public getAllTodos(): Todo[] {
    const todos: Todo[] = [];

    if (this.storage.length !== 0) {
      for (let index = 0; index < this.storage.length; index += 1) {
        const key = this.storage.key(index);
        todos.push(
          this.loadTodo(key)
        );
      }
    }

    return todos;
  }

  /**
   * Fetches a todo from local storage by its ID.
   * @param {string} storageIndex The ID of the saved todo.
   */
  private loadTodo(storageIndex: string): Todo {
    return this.convertToTodo(
      this.storage.getItem(storageIndex)
    );
  }

  /**
   * Converts a todo to a string so that it can be saved in
   * local storage.
   * @param {Todo} todo The todo to be saved.
   */
  private convertToString(todo: Todo): string {
    return JSON.stringify(todo);
  }

  /**
   * Converts a previously saved todo to a Todo object
   * so that it can be loaded by the application.
   * @param {string} item The saved todo to be loaded.
   */
  private convertToTodo(item: string): Todo {
    return JSON.parse(item);
  }

}
