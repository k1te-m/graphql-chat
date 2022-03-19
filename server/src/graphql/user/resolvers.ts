import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  UserInputError,
  AuthenticationError,
  ValidationError,
} from "apollo-server-core";
import config from "../../config/config";
import { validateLogin } from "../../utils/validateLogin";
import { validateUserRegistration } from "../../utils/validateUserRegistration";
import { UserRegistrationInput, LoginUserInput } from "../../types";
import User from "../../models/User";

const secret = config.jwtSecret;

const getToken = ({
  id,
  username,
  email,
}: {
  id: number;
  username: string;
  email: string;
}) => {
  return jwt.sign({ id, username, email }, secret, { expiresIn: "1h" });
};

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    RegisterUser: async ({ input }: { input: UserRegistrationInput }) => {
      const { errors, valid } = validateUserRegistration(input);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const { name, username, email, password } = input;

      try {
        const userExists = await User.findOne({ email });
        if (userExists) throw new ValidationError("Email already in use");

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!password) throw new ValidationError("Could not hash password");

        const newUser = new User({
          name,
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw new ValidationError("Could not save user");

        const token = getToken(savedUser);
        console.log({ savedUser });
        return {
          user: {
            id: savedUser._id,
            name: savedUser.name,
            username: savedUser.username,
            email: savedUser.email,
          },
          token,
        };
      } catch (err: any) {
        throw new ValidationError(err);
      }
    },
    LoginUser: async ({ input }: { input: LoginUserInput }) => {
      const { errors, valid } = validateLogin(input);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const { email, password } = input;

      try {
        const user = await User.findOne({ email });
        if (!user) throw new AuthenticationError("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AuthenticationError("Invalid credentials");

        user.last_login = new Date();
        const updatedUser = await user.save();
        if (!updatedUser) throw new ValidationError("Error on login");
        const token = getToken(user);
        return {
          user: {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            last_login: updatedUser.last_login,
            register_date: updatedUser.register_date,
          },
          token,
        };
      } catch (err: any) {
        throw new ValidationError(err);
      }
    },
  },
};

export default userResolvers;
