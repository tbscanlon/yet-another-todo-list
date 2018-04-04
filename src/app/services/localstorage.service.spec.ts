import { TestBed, inject } from "@angular/core/testing";

import { LocalstorageService } from "./localstorage.service";
import { Todo } from "../models/todo";
import { TODO, TODO_2, TODO_3, TODO_LIST } from "../../spec/mocks";

describe("LocalstorageService", () => {
  let service: LocalstorageService;
  let mockStorage: jasmine.SpyObj<Storage>;

  const storage: Storage = localStorage;

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

  describe("#saveAllTodos", () => {
    it("Saves todo to local storage", () => {
      spyOn(storage, "setItem");
      service.saveAllTodos(TODO_LIST);

      expect(storage.setItem).toHaveBeenCalledWith(
        TODO.id,
        JSON.stringify(TODO)
      );

      expect(storage.setItem).toHaveBeenCalledWith(
        TODO_2.id,
        JSON.stringify(TODO_2)
      );

      expect(storage.setItem).toHaveBeenCalledWith(
        TODO_3.id,
        JSON.stringify(TODO_3)
      );
    });
  });

  describe("#getAllTodos", () => {
    beforeEach(() => {
      service.saveAllTodos(TODO_LIST);
    });

    it("Fetches all saved todos from local storage", () => {
      expect(service.getAllTodos()).toEqual(TODO_LIST);
    });
  });
});
