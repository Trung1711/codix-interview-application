import { TestBed } from "@angular/core/testing";
import { UserProfileComponent } from "./user-profile.component";

describe("UserProfileComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(UserProfileComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
