import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Password } from "primeng/password";
import {
  PHONE_NUMBER_PATTERN,
  REGISTRATION_MAX_LENGTH,
  USER_PROFILE_STORAGE_KEY
} from "../../../../shared/constant/constant";
import { UserProfile } from "../../../user-profile/models/user-profile.model";
import { UserProfileStore } from "../../../user-profile/store/user-profile.store";

@Component({
  selector: "app-auth-signup",
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputText, Password],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
  constructor(
    private userProfileStore: UserProfileStore,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    nickname: new FormControl("", [
      Validators.required,
      Validators.maxLength(REGISTRATION_MAX_LENGTH)
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.maxLength(REGISTRATION_MAX_LENGTH)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(REGISTRATION_MAX_LENGTH)
    ]),
    confirmPassword: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(PHONE_NUMBER_PATTERN)
    ]),
    country: new FormControl("", [Validators.required])
  });

  onSubmit(): void {
    localStorage.setItem(
      USER_PROFILE_STORAGE_KEY,
      JSON.stringify(this.registrationForm.value)
    );
    this.userProfileStore.addProfile(
      this.registrationForm.value as UserProfile
    );
    this.router.navigate(["/user-profile"]);
  }
}
