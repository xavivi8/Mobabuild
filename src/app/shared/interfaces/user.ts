import { Build, FavoriteBuild } from "./build";

export interface Authority {
  id: number;
  name: AuthorityName;
}

export enum AuthorityName {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number;
  email: string;
  user_name: string;
  pass: string;
  image: ArrayBuffer | null;
  builds: Build[];
  favoriteBuild: FavoriteBuild;
  authorities: Authority[];
}

export interface AddUserRequest {
  email: string;
  userName: string;
  pass: string;
  authorityNames: string[];
}

