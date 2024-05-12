import { Build } from "./build";

export interface RuneSet {
  id: number;
  name: string;
  mainRune: string;
  mainSubRune: string;
  secondaryRune: string;
  secondarySubRune: string;
  additionalAdvantages: string;
  build: Build;
}

export interface Rune {
  id: number;
  name: string;
  rowType: string;
  groupName: string;
  description: string;
  longDescription: string;
  image: ArrayBuffer;
}
