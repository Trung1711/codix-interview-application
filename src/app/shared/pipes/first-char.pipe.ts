import { Pipe, PipeTransform } from "@angular/core";

/**
 * Takes a string input and returns its first character in uppercase
 * Usage: {{ 'john' | firstChar }} => 'J'
 * If input is null, undefined, or empty string, returns an empty string
 */
@Pipe({
  name: "firstChar",
  standalone: true
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return "";

    return value.charAt(0).toUpperCase();
  }
}
