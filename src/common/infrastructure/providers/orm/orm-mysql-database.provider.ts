import { Provider } from "@nestjs/common";
import { MysqlDatabaseSingleton } from "../../database/mysql/mysql-database.singleton";

export const OrmMysqlDatabaseProvider: Provider = {
	provide: "OrmMysqlDataSource",
	useFactory: async () => {
		return MysqlDatabaseSingleton.getInstance();
	},
};
