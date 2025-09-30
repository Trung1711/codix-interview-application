import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserProfileStore } from "../../features/user-profile/store/user-profile.store";

export const authGuard: CanActivateFn = (_route, state) => {
  const userProfileStore = inject(UserProfileStore);
  const router = inject(Router);

  const user = userProfileStore.userProfile();
  const url = state.url || "";

  const isAuthSection = url.startsWith("/authentication");
  const isHomeSection = url.startsWith("/home");

  if (user && isAuthSection) {
    return router.createUrlTree(["/home"]);
  }

  if (!user && isHomeSection) {
    return router.createUrlTree(["/authentication"]);
  }

  return true;
};
