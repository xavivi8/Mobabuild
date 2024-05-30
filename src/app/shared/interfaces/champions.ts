import { Build } from "./build";

export interface Champions {
  id: number;
  name: string;
  builds: Build[];
  image: ArrayBuffer;
}
