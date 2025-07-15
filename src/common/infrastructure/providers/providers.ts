import { Provider } from "@nestjs/common";
import { JwtGenProvider } from "./jwt/jwt-gen.provider";
import { OrmPgDatabaseProvider } from "./orm/orm-pg-database.provider";

export const InfProviders: Provider[] = [JwtGenProvider, OrmPgDatabaseProvider];
