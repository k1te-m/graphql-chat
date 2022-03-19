import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
console.log({ dirname: __dirname });
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoDbUri: envVars.MONGODB_URI,
};
export default config;
