import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";
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
  constructor(private userProfileStore: UserProfileStore) {
    this.userProfileStore.loadUserProfile();
    this.userProfileStore.loadExistingProfiles();
  }
}
