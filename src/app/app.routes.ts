import { Routes } from "@angular/router";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "authentication", pathMatch: "full" },
  {
    path: "authentication",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./features/authentication/authentication.routes").then(
        m => m.AUTHENTICATION_ROUTES
      )
  },
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./features/home/home.routes").then(m => m.HOME_ROUTES)
      }
    ]
  },
  {
    path: "**",
    loadComponent: () =>
      import(
        "./shared/components/page-not-found/page-not-found.component"
      ).then(m => m.PageNotFoundComponent)
  }
];
