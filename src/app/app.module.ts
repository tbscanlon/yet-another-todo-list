import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { reducer } from "./store/todo.reducer";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoComponent } from "./todo-list/todo/todo.component";
import { NewTodoComponent } from "./todo-list/new-todo/new-todo.component";
import { LocalstorageService } from "./services/localstorage.service";
import { TodoEffects } from "./store/todo.effects";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({reducer}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
