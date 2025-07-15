import { Module } from '@nestjs/common';
import { FindUserByEmailController } from './user/infrastructure/controllers/find-user-by-email.controller';
import { UpdateUserController } from './user/infrastructure/controllers/update-user.controller';
import { setupJwt } from './auth/infrastructure/jwt-config/jwt-config';
import { JwtStrategy } from './auth/infrastructure/strategies/jwt.strategy';
import { InfProviders } from './common/infrastructure';
import { UserLoginController } from './auth/infrastructure/controllers/user-login.controller';
import { UserRegisterController } from './auth/infrastructure/controllers/user-register.controller';

@Module({
  imports: [
    setupJwt
  ],
  controllers: [
    FindUserByEmailController,
    UpdateUserController,
    UserLoginController,
    UserRegisterController
  ],
  providers: [...InfProviders, JwtStrategy],
})
export class AppModule {}
