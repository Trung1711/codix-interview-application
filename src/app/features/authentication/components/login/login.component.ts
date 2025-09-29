import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Button } from "primeng/button";
import { Checkbox } from "primeng/checkbox";
import { InputText } from "primeng/inputtext";
import { Password } from "primeng/password";
import { UserProfileStore } from "../../../user-profile/store/user-profile.store";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-auth-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputText,
    Password,
    Button,
    Checkbox
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  rememberMe = new FormControl(false);

  constructor(
    private router: Router,
    private userProfileStore: UserProfileStore,
    private authenticationService: AuthenticationService
  ) {}

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authenticationService
      .login(
        email as string,
        password as string,
        this.rememberMe.value as boolean
      )
      .subscribe(res => {
        if (res) {
          this.router.navigate(["/user-profile"]);
        }
      });
  }
}
