import { Injectable, signal } from "@angular/core";
import { delay, of } from "rxjs";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  readonly isLoading = signal<boolean>(false);
  readonly currentUser = signal<AuthUser | null>(null);

  login(email: string, _password: string) {
    this.isLoading.set(true);
    return of({ id: "1", name: "Demo User", email }).pipe(delay(600));
  }

  signup(name: string, email: string, _password: string) {
    this.isLoading.set(true);
    return of({ id: "1", name, email }).pipe(delay(800));
  }

  setUser(user: AuthUser | null) {
    this.currentUser.set(user);
    this.isLoading.set(false);
  }

  logout() {
    this.currentUser.set(null);
  }
}
