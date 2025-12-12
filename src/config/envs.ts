import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
}

// validamos mediante un esquema
const envsSchema = Joi.object({
  PORT: Joi.number().required(),
}).unknown(true);
// el unknown es por si hay mas variables de entorno las deje pasar sin validar

const { error, value } = envsSchema.validate(process.env) as {
  error?: Joi.ValidationError;
  value: EnvVars;
};

// console.log({ envsVars });
// console.log({ error });

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const envsVars = value;

export const envs = {
  port: envsVars.PORT,
};
