import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { AuthenticationStore } from "./features/authentication/store/authentication.store";
import { UserProfileStore } from "./features/user-profile/store/user-profile.store";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  title = "codix-interview-project";
  constructor(
    private userProfileStore: UserProfileStore,
    private authenticationStore: AuthenticationStore
  ) {
    this.authenticationStore.loadRememberMe();
    this.userProfileStore.loadUserProfile();
    this.userProfileStore.loadExistingProfiles();
  }
}
