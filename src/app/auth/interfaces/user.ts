export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export enum userTypes {
  User,
  Admin,
}
