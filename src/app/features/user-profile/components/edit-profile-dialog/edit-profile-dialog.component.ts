import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { Select } from "primeng/select";
import { SmartInputComponent } from "../../../../shared/components/smart-input/smart-input.component";
import {
  COUNTRIES,
  PHONE_NUMBER_PATTERN,
  REGISTRATION_MAX_LENGTH
} from "../../../../shared/constant/constant";
import { nicknameExistsExcludingCurrentValidator } from "../../../../shared/validators/validators";
import { UserProfileStore } from "../../store/user-profile.store";

@Component({
  selector: "app-edit-profile-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dialog,
    Button,
    Select,
    SmartInputComponent
  ],
  templateUrl: "./edit-profile-dialog.component.html",
  styleUrls: ["./edit-profile-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileDialogComponent implements OnInit {
  @Input() visible = false;
  @Output() onClose = new EventEmitter<boolean>();

  REGISTRATION_MAX_LENGTH = REGISTRATION_MAX_LENGTH;
  countries = COUNTRIES;

  constructor(private userProfileStore: UserProfileStore) {}

  form = new FormGroup({
    nickname: new FormControl<string>("", [
      Validators.required,
      Validators.maxLength(REGISTRATION_MAX_LENGTH),
      nicknameExistsExcludingCurrentValidator(this.userProfileStore)
    ]),
    phone: new FormControl<string>("", [
      Validators.required,
      Validators.pattern(PHONE_NUMBER_PATTERN)
    ]),
    country: new FormControl<string>(COUNTRIES[0].value, [Validators.required]),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(REGISTRATION_MAX_LENGTH)
    ])
  });

  ngOnInit(): void {
    const userProfile = this.userProfileStore.userProfile();
    if (userProfile) {
      this.form.patchValue({
        nickname: userProfile.nickname,
        phone: userProfile.phone,
        country: userProfile.country,
        password: userProfile.password
      });
    }
  }

  close(): void {
    this.visible = false;
    this.onClose.emit(false);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const current = this.userProfileStore.userProfile();
    if (!current) {
      this.close();
      return;
    }

    const formValues = this.form.value;
    const changedFields = Object.entries(formValues)
      .filter(
        ([key, value]) =>
          value !== undefined &&
          value !== null &&
          value !== current[key as keyof typeof current]
      )
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    if (Object.keys(changedFields).length > 0) {
      this.userProfileStore.updateCurrentProfile(changedFields);
    }

    this.close();
  }
}
