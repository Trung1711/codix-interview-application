import { TestBed } from "@angular/core/testing";
import { SignupComponent } from "./signup.component";

describe("SignupComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent]
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
