import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(AppComponent);
    app       = fixture.debugElement.nativeElement;
    compiled  = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it("Successfully initialise the app", async(() => {
    expect(app).toBeTruthy();
  }));

  it("Has a title in a h1 tag", async(() => {
    expect(compiled.querySelector("h1").textContent).toContain("Yet Another Todo List");
  }));
});
