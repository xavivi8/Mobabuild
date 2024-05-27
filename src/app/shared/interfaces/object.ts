import { Build } from "./build";

export interface ObjectSet {
  id: number | null;
  name: string;
  build: Build | null;
  objects: Object[];
}

export interface ObjectD {
  id: number;
  name: string;
  objectSets: ObjectSet[];
}
