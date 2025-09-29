import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { UserProfileStore } from "../../../features/user-profile/store/user-profile.store";

@Component({
  selector: "app-page-not-found",
  standalone: true,
  imports: [Button],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss"
})
export class PageNotFoundComponent {
  constructor(
    public router: Router,
    public userProfileStore: UserProfileStore
  ) {}
}
