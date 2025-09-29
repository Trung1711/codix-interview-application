import { Routes } from "@angular/router";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "authentication", pathMatch: "full" },
  {
    path: "authentication",
    loadChildren: () =>
      import("./features/authentication/authentication.routes").then(
        m => m.AUTHENTICATION_ROUTES
      ),
    canActivate: [authGuard]
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./features/user-profile/user-profile.routes").then(
        m => m.USER_PROFILE_ROUTES
      ),
    canActivate: [authGuard]
  },
  {
    path: "**",
    loadComponent: () =>
      import(
        "./shared/components/page-not-found/page-not-found.component"
      ).then(m => m.PageNotFoundComponent)
  }
];
