import { UserRegistrationInput } from "../types";

export const validateUserRegistration = (user: UserRegistrationInput) => {
  console.log({ user });
  const { name, username, email, password, passwordConfirm } = user;

  const errors: any = {};

  if (!name) {
    errors.name = "Name is required";
  }
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!passwordConfirm) {
    errors.passwordConfirm = "Password confirmation is required";
  }
  if (password !== passwordConfirm) {
    errors.password = "Passwords do not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
