export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ITokens {
  refresh: string;
  access: string;
}

export interface IJWTPayload {
  exp: number;
  jti: string;
  token_type: string;
  user_id: number;
}

export interface IUser {
  first_name: string;
  last_name: string;
  sex: Gender;
  date_of_birth: string;
  email: string;
}

export type Gender = 'M' | 'F';

export type userRole = 'guest' | 'user' | 'admin';
