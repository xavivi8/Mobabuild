import { Build } from "./build";

export interface RuneSet {
  id: number | null;
  name: string;
  main_rune: string;
  main_sub_rune: string;
  secondary_rune: string;
  secondary_sub_rune: string;
  additional_advantages: string;
  build: Build | null;
}

export interface Rune {
  id: number;
  name: string;
  rowType: string;
  group_name: string;
  description: string;
  long_description: string;
  image: ArrayBuffer;
}
