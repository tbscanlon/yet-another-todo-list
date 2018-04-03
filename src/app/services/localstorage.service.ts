import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";

@Injectable()
export class LocalstorageService {

  private storage: Storage = localStorage;

  public clear(): void {
    this.storage.clear();
  }

  public save(todo: Todo): void {
    this.storage.setItem(
      todo.id,
      this.convertToString(todo)
    );
  }

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

  private loadTodo(storageIndex: string): Todo {
    return this.convertToTodo(
      this.storage.getItem(storageIndex)
    );
  }

  private convertToString(todo: Todo): string {
    return JSON.stringify(todo);
  }

  private convertToTodo(item: string): Todo {
    return JSON.parse(item);
  }

}
