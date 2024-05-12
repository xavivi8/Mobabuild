import { Champions } from "./champions";
import { RuneSet } from "./rune";
import { SpellSet } from "./spell";
import { User } from "./user";

export interface Build {
  id: number;
  buildName: string;
  user: User;
  champions: Champions;
  spellSets: SpellSet[];
  objectSet: Object[];
  runeSet: RuneSet[];
}

export interface FavoriteBuild {
  id: number;
  user: User;
  builds: number[];
}
