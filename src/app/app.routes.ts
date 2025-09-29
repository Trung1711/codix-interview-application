import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "authentication", pathMatch: "full" },
  {
    path: "authentication",
    loadChildren: () =>
      import("./features/authentication/authentication.routes").then(
        m => m.AUTHENTICATION_ROUTES
      )
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./features/user-profile/user-profile.routes").then(
        m => m.USER_PROFILE_ROUTES
      )
  }
];
