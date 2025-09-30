import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthenticationStore {
  rememberMe = signal<boolean>(false);

  loadRememberMe(): void {
    const rememberMe = JSON.parse(
      localStorage.getItem("rememberMe") || "false"
    );
    this.rememberMe.set(rememberMe);
  }
}
