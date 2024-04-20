export interface IUser {
  id: number;
  login: string | null;
  type: string | null;
  url?: string;
  avatar_url?: string;
}
