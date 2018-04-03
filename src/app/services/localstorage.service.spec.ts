import { TestBed, inject } from "@angular/core/testing";

import { LocalstorageService } from "./localstorage.service";
import { Todo } from "../models/todo";

describe("LocalstorageService", () => {
  let service: LocalstorageService;
  let mockStorage: jasmine.SpyObj<Storage>;

  const storage: Storage = localStorage;
  const TODO: Todo = {
    id: "1",
    content: "Write unit tests",
    isComplete: false
  };
  const TODO_2: Todo = {
    id: "2",
    content: "Write more unit tests",
    isComplete: false
  };
  const TODO_3: Todo = {
    id: "3",
    content: "Write even more unit tests",
    isComplete: false
  };
  const TODO_LIST: Todo[] = [TODO, TODO_2, TODO_3];

  beforeEach(() => {
    mockStorage = jasmine.createSpyObj("storage", ["clear", "setItem"]);

    TestBed.configureTestingModule({
      providers: [
        LocalstorageService]
    });

    service = TestBed.get(LocalstorageService);

  });

  describe("Initialisation", () => {
    it("Initialises successfully", () => {
      expect(service).toBeTruthy();
    });
  });

  describe("#clear", () => {
    it("Clears all data saved locally", () => {
      spyOn(storage, "clear");
      service.clear();

      expect(storage.clear).toHaveBeenCalledTimes(1);
    });
  });

  describe("#save", () => {
    it("Saves a todo to local storage", () => {
      spyOn(storage, "setItem");
      service.save(TODO);

      expect(storage.setItem).toHaveBeenCalledWith(
        TODO.id,
        JSON.stringify(TODO)
      );
    });
  });

  describe("#getAllTodos", () => {
    beforeEach(() => {
      TODO_LIST.forEach((todo: Todo) => service.save(todo));
    });

    it("Fetches all saved todos from local storage", () => {
      expect(service.getAllTodos()).toEqual(TODO_LIST);
    });
  });
});
