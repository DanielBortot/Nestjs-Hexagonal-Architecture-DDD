import { Provider } from "@nestjs/common";
import { SqlserverDatabaseSingleton } from "../../database/sqlserver/sqlserver-database.singleton";

export const OrmSqlserverDatabaseProvider: Provider = {
	provide: "OrmSqlserverDataSource",
	useFactory: async () => {
		return SqlserverDatabaseSingleton.getInstance();
	},
};
