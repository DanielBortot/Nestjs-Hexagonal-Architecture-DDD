import { DataSource, getMetadataArgsStorage } from "typeorm";
import { envs } from "../../framework-config/envs-config/envs";

export class PgDatabaseSingleton {
	static instance: DataSource;

	static getInstance(): DataSource {
		if (!PgDatabaseSingleton.instance) {
			PgDatabaseSingleton.instance = new DataSource({
				ssl: envs.NODE_ENV === "production",
				extra: {
					ssl:
						envs.NODE_ENV === "production"
							? { rejectUnauthorized: false }
							: null,
				},
				type: "postgres",
				host: envs.POSTGRES_DB_HOST,
				port: envs.POSTGRES_DB_PORT,
				username: envs.POSTGRES_DB_USERNAME,
				password: envs.POSTGRES_DB_PASSWORD,
				database: envs.POSTGRES_DB_NAME,
				synchronize: true,
				entities: getMetadataArgsStorage().tables.map(
					(tbl) => tbl.target,
				),
			});

			this.instance.initialize();
		}
		return PgDatabaseSingleton.instance;
	}
}
