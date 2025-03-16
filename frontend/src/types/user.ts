export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
  city: string | null;
  state: string | null;
}