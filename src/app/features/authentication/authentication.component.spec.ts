import { TestBed } from "@angular/core/testing";
import { AuthenticationComponent } from "./authentication.component";

describe("AuthenticationComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent]
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
