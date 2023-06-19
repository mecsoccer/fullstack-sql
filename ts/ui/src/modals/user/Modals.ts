export type IUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
};

export type SignupForm = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export type AuthSuccessPayload = {
  accessToken: string,
  token: string
}