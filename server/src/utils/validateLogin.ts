import { LoginUserInput } from "../types";

export const validateLogin = (loginRequest: LoginUserInput) => {
  const errors: any = {};
  const { email, password } = loginRequest;
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
