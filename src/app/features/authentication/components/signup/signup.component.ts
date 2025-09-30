import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { Select } from "primeng/select";
import { SmartInputComponent } from "../../../../shared/components/smart-input/smart-input.component";
import {
  COUNTRIES,
  PHONE_NUMBER_PATTERN,
  REGISTRATION_MAX_LENGTH
} from "../../../../shared/constant/constant";
import {
  emailExistsValidator,
  nicknameExistsValidator,
  passwordMatchValidator
} from "../../../../shared/validators/validators";
import { UserProfileStore } from "../../../user-profile/store/user-profile.store";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-auth-signup",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    Select,
    SmartInputComponent
  ],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent {
  REGISTRATION_MAX_LENGTH = REGISTRATION_MAX_LENGTH;
  loading = false;
  countries = COUNTRIES;

  constructor(
    private userProfileStore: UserProfileStore,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  registrationForm = new FormGroup(
    {
      nickname: new FormControl("", [
        Validators.required,
        Validators.maxLength(REGISTRATION_MAX_LENGTH),
        nicknameExistsValidator(this.userProfileStore)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.maxLength(REGISTRATION_MAX_LENGTH),
        emailExistsValidator(this.userProfileStore)
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
      country: new FormControl<string>(COUNTRIES[0].value, [
        Validators.required
      ])
    },
    { validators: passwordMatchValidator() }
  );

  onSubmit(): void {
    if (
      this.registrationForm.valid &&
      !this.registrationForm.hasError("passwordMismatch")
    ) {
      this.loading = true;

      this.authenticationService
        .signup(this.registrationForm.value as any)
        .subscribe(res => {
          if (res) {
            this.router.navigate(["/home"]);
          }
        });
    }
  }
}
