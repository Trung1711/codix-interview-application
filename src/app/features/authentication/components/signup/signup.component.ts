import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Button } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Password } from "primeng/password";

@Component({
  selector: "app-auth-signup",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputText, Password, Button],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {}
