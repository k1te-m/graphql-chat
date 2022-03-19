import mongoose from "mongoose";

export interface UserRegistrationInput {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export type UserDocument = mongoose.Document & {
  name: string;
  username: string;
  email: string;
  password: string;
  register_date: Date;
  last_login: Date;
};
