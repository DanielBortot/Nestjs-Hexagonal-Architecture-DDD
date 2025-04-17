import { Module } from '@nestjs/common';
import { ormPgDatabaseProvider } from './common/infraestructure/providers/orm/orm-pg-database.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [ormPgDatabaseProvider],
})
export class AppModule {}
