import { Module } from '@nestjs/common';
import { ormPgDatabaseProvider } from './common/infraestructure';
import { FindUserByEmailController } from './user/infraestructure/controllers/find-user-by-email.controller';
import { UpdateUserController } from './user/infraestructure/controllers/update-user.controller';

@Module({
  imports: [],
  controllers: [
    FindUserByEmailController,
    UpdateUserController
  ],
  providers: [ormPgDatabaseProvider],
})
export class AppModule {}
