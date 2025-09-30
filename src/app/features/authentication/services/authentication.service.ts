import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { USER_PROFILE_STORAGE_KEY } from "../../../shared/constant/constant";
import { UserProfile } from "../../user-profile/models/user-profile.model";
import { UserProfileStore } from "../../user-profile/store/user-profile.store";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private userProfileStore: UserProfileStore) {}

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    const existingUserProfile = this.userProfileStore.existingUserProfile();
    const userProfile = existingUserProfile?.find(
      user => user.email === email && user.password === password
    );
    if (userProfile) {
      this.userProfileStore.setUserProfile(userProfile);
      rememberMe
        ? localStorage.setItem(
            USER_PROFILE_STORAGE_KEY,
            JSON.stringify(userProfile)
          )
        : sessionStorage.setItem(
            USER_PROFILE_STORAGE_KEY,
            JSON.stringify(userProfile)
          );
      return of(true).pipe(delay(2000));
    }
    return of(false).pipe(delay(2000));
  }

  signup(userProfile: UserProfile): Observable<any> {
    this.userProfileStore.setUserProfile(userProfile);
    this.userProfileStore.addProfile(userProfile);
    return of(true).pipe(delay(2000));
  }
}
