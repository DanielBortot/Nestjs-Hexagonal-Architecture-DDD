import { Module } from '@nestjs/common';
import { ormPgDatabaseProvider } from './common/infraestructure';

@Module({
  imports: [],
  controllers: [],
  providers: [ormPgDatabaseProvider],
})
export class AppModule {}
