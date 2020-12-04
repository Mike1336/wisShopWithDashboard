export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export type userRole = 'guest' | 'user' | 'admin';
