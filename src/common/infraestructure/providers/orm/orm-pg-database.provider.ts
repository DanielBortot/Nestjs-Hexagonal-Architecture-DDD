import { Provider } from "@nestjs/common"
import { PgDatabaseSingleton } from "../../database/postgres/postgres-database.singleton"

export const ormPgDatabaseProvider: Provider = {
    provide: 'OrmPgDataSource',
    useFactory: async () => {
        return PgDatabaseSingleton.getInstance()
    },
}