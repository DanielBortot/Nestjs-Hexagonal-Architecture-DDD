import { DataSource, getMetadataArgsStorage } from "typeorm";
import { envs } from "../../framework-config/envs-config/envs";

// USE DEPENDENCY mysql or mysql2

export class MysqlDatabaseSingleton {
	static instance: DataSource;

	static getInstance(): DataSource {
		if (!MysqlDatabaseSingleton.instance) {
			MysqlDatabaseSingleton.instance = new DataSource({
				type: "mysql",
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
		return MysqlDatabaseSingleton.instance;
	}
}
