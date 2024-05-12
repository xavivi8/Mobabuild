import { Build } from "./build";

export interface ObjectSet {
  id: number;
  name: string;
  build: Build;
  objects: Object[];
}

export interface ObjectD {
  id: number;
  name: string;
  objectSets: ObjectSet[];
}
