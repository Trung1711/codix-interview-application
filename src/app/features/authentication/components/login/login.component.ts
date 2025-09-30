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
import { Checkbox } from "primeng/checkbox";
import { finalize } from "rxjs";
import { SmartInputComponent } from "../../../../shared/components/smart-input/smart-input.component";
import { UserProfileStore } from "../../../user-profile/store/user-profile.store";
import { AuthenticationService } from "../../services/authentication.service";
import { AuthenticationStore } from "../../store/authentication.store";

@Component({
  selector: "app-auth-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Button,
    Checkbox,
    SmartInputComponent
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  rememberMe = new FormControl(false);

  constructor(
    private router: Router,
    private userProfileStore: UserProfileStore,
    private authenticationService: AuthenticationService,
    private authenticationStore: AuthenticationStore
  ) {}

  onSubmit(): void {
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authenticationService
      .login(
        email as string,
        password as string,
        this.rememberMe.value as boolean
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {
        if (res) {
          this.router.navigate(["/home"]);
          this.authenticationStore.rememberMe.set(
            this.rememberMe.value as boolean
          );
          localStorage.setItem(
            "rememberMe",
            JSON.stringify(this.rememberMe.value as boolean)
          );
        }
      });
  }
}
