import { Build } from "./build";

export interface SpellSet {
  id: number | null;
  name: string;
  build: Build | null;
  spells: Spell[];
}

export interface Spell {
  id: number;
  name: string;
  champion_level: number;
  game_mode: string;
  description: string;
  cooldown: string;
  image: ArrayBuffer;
}
