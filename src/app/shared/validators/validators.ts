import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UserProfileStore } from "../../features/user-profile/store/user-profile.store";

/**
 * Validator to check if password and confirmPassword match
 * @returns ValidatorFn that returns null if passwords match, or { passwordMismatch: true } if they don't
 */
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}

/**
 * Factory function to create a validator that checks if a nickname already exists
 * @param userProfileStore The UserProfileStore service
 * @returns ValidatorFn that returns null if nickname doesn't exist, or { nicknameExists: true } if it does
 */
export function nicknameExistsValidator(
  userProfileStore: UserProfileStore
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nickname = control.value;
    if (!nickname) return null;

    const existingProfiles = userProfileStore.existingUserProfile();
    if (!existingProfiles) return null;

    const exists = existingProfiles.some(
      profile => profile.nickname?.toLowerCase() === nickname.toLowerCase()
    );

    return exists ? { nicknameExists: true } : null;
  };
}

/**
 * Factory function to create a validator that checks if an email already exists
 * @param userProfileStore The UserProfileStore service
 * @returns ValidatorFn that returns null if email doesn't exist, or { emailExists: true } if it does
 */
export function emailExistsValidator(
  userProfileStore: UserProfileStore
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) return null;

    const existingProfiles = userProfileStore.existingUserProfile();
    if (!existingProfiles) return null;

    const exists = existingProfiles.some(
      profile => profile.email?.toLowerCase() === email.toLowerCase()
    );

    return exists ? { emailExists: true } : null;
  };
}

/**
 * Factory function to create a validator that checks if a nickname already exists,
 * but ignores the current user's profile
 * @param userProfileStore The UserProfileStore service
 * @returns ValidatorFn that returns null if nickname doesn't exist (or belongs to current user),
 * or { nicknameExists: true } if it exists and belongs to another user
 */
export function nicknameExistsExcludingCurrentValidator(
  userProfileStore: UserProfileStore
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nickname: string = (control.value || "").trim();
    if (!nickname) return null;

    const currentUser = userProfileStore.userProfile();
    const currentEmail = currentUser?.email?.toLowerCase() || "";
    const existingProfiles = userProfileStore.existingUserProfile() || [];

    const matched = existingProfiles.find(
      p => (p.nickname || "").toLowerCase() === nickname.toLowerCase()
    );
    if (!matched) return null;

    // If the matched profile belongs to the current user (same email), ignore
    if ((matched.email || "").toLowerCase() === currentEmail) return null;

    return { nicknameExists: true };
  };
}
