import { Haul } from './haul';
import { Comment } from './comment';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio?: string;
  city?: string;
  state?: string;
  role: Role;
  comments: Comment[];
  hauls: Haul[];
}