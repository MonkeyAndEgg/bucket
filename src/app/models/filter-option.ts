import { ThemePalette } from "@angular/material/core";

export interface FilterOption {
  name: string;
  checked: boolean;
  color: ThemePalette;
  subOptions?: FilterOption[];
}

