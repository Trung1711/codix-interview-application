import { CommonModule } from "@angular/common";
import { Component, Input, ViewEncapsulation } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { Password } from "primeng/password";

@Component({
  selector: "app-smart-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputText, Password],
  templateUrl: "./smart-input.component.html",
  styleUrls: ["./smart-input.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SmartInputComponent,
      multi: true
    }
  ]
})
export class SmartInputComponent implements ControlValueAccessor {
  @Input() control!: FormControl | any;
  @Input() formGroup?: FormGroup;
  @Input() formGroupErrors?: string[];
  @Input() label: string = "";
  @Input() id: string = "";
  @Input() type: "text" | "password" = "text";
  @Input() placeholder: string = "";
  @Input() showLabel = true;

  onChange: any = () => {};
  onTouch: any = () => {};

  onInputChange(): void {
    this.control.updateValueAndValidity();
  }

  writeValue(value: any): void {
    if (this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  getErrorMessage(): string {
    if (
      !this.control ||
      (!this.control.errors && !this.hasFormGroupError()) ||
      !this.control.touched
    ) {
      return "";
    }

    if (this.hasFormGroupError()) {
      const formGroupError = this.getFormGroupError();
      if (formGroupError === "passwordMismatch") {
        return `${this.label} must match the password`;
      }
    }

    const errors = this.control.errors || {};
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return "";

    const firstError = errorKeys[0];
    switch (firstError) {
      case "required":
        return `${this.label} is required`;
      case "email":
        return `Please enter a valid ${this.label.toLowerCase()} address`;
      case "minlength":
        return `${this.label} must be at least ${errors["minlength"].requiredLength} characters long`;
      case "maxlength":
        return `${this.label} must be less than ${errors["maxlength"].requiredLength} characters`;
      case "pattern":
        return `Please enter a valid ${this.label.toLowerCase()}`;
      case "passwordMismatch":
        return `${this.label} must match the password`;
      case "nicknameExists":
        return `This ${this.label.toLowerCase()} is already taken`;
      case "emailExists":
        return `This ${this.label.toLowerCase()} is already registered`;
      default:
        return `${this.label} is invalid`;
    }
  }

  hasError(): boolean {
    return !!(
      (this.control && this.control.invalid && this.control.touched) ||
      this.hasFormGroupError()
    );
  }

  hasFormGroupError(): boolean {
    if (
      !this.formGroup ||
      !this.formGroupErrors ||
      this.formGroupErrors.length === 0
    ) {
      return false;
    }

    return this.formGroupErrors.some(
      errorKey => this.formGroup?.hasError(errorKey) && this.control.touched
    );
  }

  getFormGroupError(): string | null {
    if (!this.formGroup || !this.formGroupErrors) {
      return null;
    }

    for (const errorKey of this.formGroupErrors) {
      if (this.formGroup.hasError(errorKey)) {
        return errorKey;
      }
    }

    return null;
  }
}
