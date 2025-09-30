import { Injectable, signal } from "@angular/core";
import { SIDEBAR_ITEMS } from "../constant/constant";

@Injectable({
  providedIn: "root"
})
export class CommonStore {
  selectedTab = signal<string>(SIDEBAR_ITEMS[0].value);

  setSelectedTab(tab: string): void {
    this.selectedTab.set(tab);
  }
}
