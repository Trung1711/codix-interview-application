import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SIDEBAR_ITEMS } from "../../../../shared/constant/constant";
import { CommonStore } from "../../../../shared/store/common.store";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  sidebarItems = SIDEBAR_ITEMS;

  constructor(
    private router: Router,
    public commonStore: CommonStore
  ) {}

  navigateToUserProfile(): void {
    this.commonStore.setSelectedTab("user-profile");
    this.router.navigate(["/home/user-profile"]);
  }
}
