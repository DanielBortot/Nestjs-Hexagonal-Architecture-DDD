import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
	NODE_ENV: string;
	PORT: number;
	POSTGRES_DB_HOST: string;
	POSTGRES_DB_PORT: number;
	POSTGRES_DB_USERNAME: string;
	POSTGRES_DB_PASSWORD: string;
	POSTGRES_DB_NAME: string;
}

const envsSchema = joi
	.object({
		NODE_ENV: joi.string().required(),
		PORT: joi.number().required(),
		POSTGRES_DB_HOST: joi.string().required(),
		POSTGRES_DB_PORT: joi.number().required(),
		POSTGRES_DB_USERNAME: joi.string().required(),
		POSTGRES_DB_PASSWORD: joi.string().required(),
		POSTGRES_DB_NAME: joi.string().required(),
	})
	.unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
	NODE_ENV: envVars.NODE_ENV,
	port: envVars.PORT,
	POSTGRES_DB_HOST: envVars.POSTGRES_DB_HOST,
	POSTGRES_DB_PORT: envVars.POSTGRES_DB_PORT,
	POSTGRES_DB_USERNAME: envVars.POSTGRES_DB_USERNAME,
	POSTGRES_DB_PASSWORD: envVars.POSTGRES_DB_PASSWORD,
	POSTGRES_DB_NAME: envVars.POSTGRES_DB_NAME,
};
