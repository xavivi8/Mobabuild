import { Build } from "./build";

export interface RuneSet {
  id: number | null;
  name: string;
  mainRune: string;
  mainSubRune: string;
  secondaryRune: string;
  secondarySubRune: string;
  additionalAdvantages: string;
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
