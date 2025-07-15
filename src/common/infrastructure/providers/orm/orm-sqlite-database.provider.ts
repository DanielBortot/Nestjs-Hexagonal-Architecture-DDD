import { Provider } from "@nestjs/common";
import { SqliteDatabaseSingleton } from "../../database/sqlite/sqlite-database.singleton";

export const OrmSqliteDatabaseProvider: Provider = {
	provide: "OrmSqliteDataSource",
	useFactory: async () => {
		return SqliteDatabaseSingleton.getInstance();
	},
};
