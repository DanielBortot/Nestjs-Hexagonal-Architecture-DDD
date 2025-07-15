import { DataSource, getMetadataArgsStorage } from "typeorm";
import { envs } from "../../framework-config/envs-config/envs";

// USE DEPENDENCY sqlite3

export class SqliteDatabaseSingleton {
	static instance: DataSource;

	static getInstance(): DataSource {
		if (!SqliteDatabaseSingleton.instance) {
			SqliteDatabaseSingleton.instance = new DataSource({
				type: "sqlite",
				database: "db.sqlite",
				synchronize: true,
				entities: getMetadataArgsStorage().tables.map(
					(tbl) => tbl.target,
				),
			});

			this.instance.initialize();
		}
		return SqliteDatabaseSingleton.instance;
	}
}
