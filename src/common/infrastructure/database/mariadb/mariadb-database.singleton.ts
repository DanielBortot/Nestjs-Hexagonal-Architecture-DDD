import { DataSource, getMetadataArgsStorage } from "typeorm";
import { envs } from "../../framework-config/envs-config/envs";

// USE DEPENDENCY mysql or mysql2

export class MariadbDatabaseSingleton {
	static instance: DataSource;

	static getInstance(): DataSource {
		if (!MariadbDatabaseSingleton.instance) {
			MariadbDatabaseSingleton.instance = new DataSource({
				type: "mariadb",
				host: "localhost",
				port: 3306,
				username: "root",
				password: "secret",
				database: "mydb",
				synchronize: true,
				entities: getMetadataArgsStorage().tables.map(
					(tbl) => tbl.target,
				),
			});

			this.instance.initialize();
		}
		return MariadbDatabaseSingleton.instance;
	}
}
