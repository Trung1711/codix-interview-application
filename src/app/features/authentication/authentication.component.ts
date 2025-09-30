import { CommonModule } from "@angular/common";
import { Component, signal, ViewEncapsulation } from "@angular/core";
import { Button } from "primeng/button";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

const AUTHENTICATION_TABS = {
  SIGNUP: "signup",
  LOGIN: "login"
};

@Component({
  selector: "app-authentication",
  standalone: true,
  imports: [CommonModule, SignupComponent, LoginComponent, Button],
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent {
  selectedTab = signal<string>(AUTHENTICATION_TABS.LOGIN);
  authenticationTabs = AUTHENTICATION_TABS;
}
