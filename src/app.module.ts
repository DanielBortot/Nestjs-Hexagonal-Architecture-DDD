import { Module } from '@nestjs/common';
import { ormPgDatabaseProvider } from './common/infraestructure';
import { FindUserByEmailController } from './user/infraestructure/controllers/find-user-by-email.controller';
import { UpdateUserController } from './user/infraestructure/controllers/update-user.controller';
import { setupJwt } from './auth/infraestructure/jwt-config/jwt-config';
import { JwtStrategy } from './auth/infraestructure/strategies/jwt.strategy';

@Module({
  imports: [
    setupJwt
  ],
  controllers: [
    FindUserByEmailController,
    UpdateUserController
  ],
  providers: [ormPgDatabaseProvider, JwtStrategy],
})
export class AppModule {}
