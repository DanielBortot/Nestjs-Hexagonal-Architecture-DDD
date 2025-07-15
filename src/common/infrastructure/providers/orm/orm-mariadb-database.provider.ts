import { Provider } from "@nestjs/common";
import { MariadbDatabaseSingleton } from "../../database/mariadb/mariadb-database.singleton";

export const OrmMariadbDatabaseProvider: Provider = {
	provide: "OrmMariadbDataSource",
	useFactory: async () => {
		return MariadbDatabaseSingleton.getInstance();
	},
};
