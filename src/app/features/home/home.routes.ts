import { Routes } from "@angular/router";

export const HOME_ROUTES: Routes = [
  { path: "", redirectTo: "user-profile", pathMatch: "full" },
  {
    path: "user-profile",
    loadComponent: () =>
      import("../user-profile/user-profile.component").then(
        m => m.UserProfileComponent
      )
  }
];
