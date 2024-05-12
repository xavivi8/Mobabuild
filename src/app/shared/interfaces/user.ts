import { Build, FavoriteBuild } from "./build";

export interface User {
  id: number;
  email: string;
  userName: string;
  pass: string;
  image: ArrayBuffer;
  builds: Build[];
  favoriteBuild: FavoriteBuild;
}
