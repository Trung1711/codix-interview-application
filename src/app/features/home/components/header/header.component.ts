import { CommonModule } from "@angular/common";
import { Component, signal, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Avatar } from "primeng/avatar";
import { Popover } from "primeng/popover";
import { UserProfileStore } from "../../../user-profile/store/user-profile.store";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, Avatar, Popover],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  showUserDropdown = signal(false);

  constructor(
    public userProfileStore: UserProfileStore,
    private router: Router
  ) {}

  get userAvatar(): string {
    return (
      this.userProfileStore.userProfile()?.nickname.charAt(0).toUpperCase() ||
      "N"
    );
  }

  logout(): void {
    this.userProfileStore.logout();
    this.router.navigate(["/authentication"]);
  }
}
