import { CommonModule } from "@angular/common";
import { Component, signal, ViewEncapsulation } from "@angular/core";
import { Avatar } from "primeng/avatar";
import { Button } from "primeng/button";
import { COUNTRIES_MAP } from "../../shared/constant/constant";
import { FirstCharPipe } from "../../shared/pipes/first-char.pipe";
import { EditProfileDialogComponent } from "./components/edit-profile-dialog/edit-profile-dialog.component";
import { UserProfileStore } from "./store/user-profile.store";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [
    CommonModule,
    Avatar,
    Button,
    EditProfileDialogComponent,
    FirstCharPipe
  ],
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent {
  constructor(public userProfileStore: UserProfileStore) {}

  showEditProfileDialog = signal(false);
  countriesMap: Record<string, string> = COUNTRIES_MAP;
}
