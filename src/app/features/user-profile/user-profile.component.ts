import { Component } from "@angular/core";
import { UserProfileStore } from "./store/user-profile.store";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [],
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent {
  constructor(public userProfileStore: UserProfileStore) {}
}
