import { Injectable, signal } from "@angular/core";
import {
  EXISTING_USER_PROFILE_STORAGE_KEY,
  USER_PROFILE_STORAGE_KEY
} from "../../../shared/constant/constant";
import { AuthenticationStore } from "../../authentication/store/authentication.store";
import { UserProfile } from "../models/user-profile.model";

@Injectable({ providedIn: "root" })
export class UserProfileStore {
  userProfile = signal<UserProfile | null>(null);
  existingUserProfile = signal<UserProfile[] | null>(null);

  constructor(private authenticationStore: AuthenticationStore) {}

  loadUserProfile(): void {
    const storageKey = this.authenticationStore.rememberMe()
      ? localStorage
      : sessionStorage;

    const stored = storageKey.getItem(USER_PROFILE_STORAGE_KEY);
    if (stored) {
      this.userProfile.set(JSON.parse(stored) as UserProfile);
    }
  }

  setUserProfile(userProfile: UserProfile): void {
    this.userProfile.set(userProfile);
    const storageKey = this.authenticationStore.rememberMe()
      ? localStorage
      : sessionStorage;

    storageKey.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
  }

  addProfile(profile: UserProfile): void {
    const current = this.existingUserProfile() ?? [];
    const updated = [...current, profile];
    this.existingUserProfile.set(updated);

    localStorage.setItem(
      EXISTING_USER_PROFILE_STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  loadExistingProfiles(): void {
    const stored = localStorage.getItem(EXISTING_USER_PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const profiles = JSON.parse(stored) as UserProfile[];
        this.existingUserProfile.set(profiles);
      } catch (error) {
        console.error("Error loading profiles:", error);
        this.existingUserProfile.set([]);
      }
    }
  }

  updateCurrentProfile(partial: Partial<UserProfile>): void {
    const current = this.userProfile();
    if (!current || !Object.keys(partial).length) return;

    const safePartial = { ...partial };
    delete safePartial.email;

    const mergedProfile = { ...current, ...safePartial };
    this.userProfile.set(mergedProfile);

    const storageKey = this.authenticationStore.rememberMe()
      ? localStorage
      : sessionStorage;

    storageKey.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(mergedProfile));

    const currentEmail = current.email?.toLowerCase();
    if (currentEmail) {
      const profiles = this.existingUserProfile() ?? [];
      const updatedProfiles = profiles.map(profile =>
        profile.email?.toLowerCase() === currentEmail
          ? { ...profile, ...safePartial }
          : profile
      );

      this.existingUserProfile.set(updatedProfiles);
      localStorage.setItem(
        EXISTING_USER_PROFILE_STORAGE_KEY,
        JSON.stringify(updatedProfiles)
      );
    }
  }

  logout(): void {
    this.userProfile.set(null);
    localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
    sessionStorage.removeItem(USER_PROFILE_STORAGE_KEY);
  }
}
