import { Champions } from "./champions";
import { ObjectSet } from "./object";
import { RuneSet } from "./rune";
import { SpellSet } from "./spell";
import { User } from "./user";

export interface Build {
  id: number | null;
  buildName: string;
  user: User;
  champions: Champions;
  spellSets: SpellSet[];
  objectSet: ObjectSet[];
  runeSet: RuneSet[];
}

export interface FavoriteBuild {
  id: number;
  user: User;
  builds: number[];
}
