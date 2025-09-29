import { Injectable, signal } from "@angular/core";
import {
  EXISTING_USER_PROFILE_STORAGE_KEY,
  USER_PROFILE_STORAGE_KEY
} from "../../../shared/constant/constant";
import { UserProfile } from "../models/user-profile.model";

@Injectable({ providedIn: "root" })
export class UserProfileStore {
  userProfile = signal<UserProfile | null>(null);
  existingUserProfile = signal<UserProfile[] | null>(null);

  loadUserProfile(): void {
    const stored =
      localStorage.getItem(USER_PROFILE_STORAGE_KEY) ??
      sessionStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (stored) {
      this.userProfile.set(JSON.parse(stored) as UserProfile);
    }
  }

  setUserProfile(userProfile: UserProfile): void {
    this.userProfile.set(userProfile);
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

  logout(): void {
    this.userProfile.set(null);
    localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
    sessionStorage.removeItem(USER_PROFILE_STORAGE_KEY);
  }
}
