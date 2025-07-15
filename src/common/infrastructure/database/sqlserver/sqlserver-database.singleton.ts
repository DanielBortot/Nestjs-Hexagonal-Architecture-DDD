import { DataSource, getMetadataArgsStorage } from "typeorm";
import { envs } from "../../framework-config/envs-config/envs";

// USE DEPENDENCY mssql

export class SqlserverDatabaseSingleton {
	static instance: DataSource;

	static getInstance(): DataSource {
		if (!SqlserverDatabaseSingleton.instance) {
			SqlserverDatabaseSingleton.instance = new DataSource({
				type: "mssql",
				host: "localhost",
				port: 1433,
				username: "sa",
				password: "secret",
				database: "mydb",
				synchronize: true,
				entities: getMetadataArgsStorage().tables.map(
					(tbl) => tbl.target,
				),
				options: {
					encrypt: true,
				},
			});

			this.instance.initialize();
		}
		return SqlserverDatabaseSingleton.instance;
	}
}
