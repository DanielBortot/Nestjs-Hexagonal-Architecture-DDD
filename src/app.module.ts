import { Module } from '@nestjs/common';
import { FindUserByEmailController } from './user/infraestructure/controllers/find-user-by-email.controller';
import { UpdateUserController } from './user/infraestructure/controllers/update-user.controller';
import { setupJwt } from './auth/infraestructure/jwt-config/jwt-config';
import { JwtStrategy } from './auth/infraestructure/strategies/jwt.strategy';
import { InfProviders } from './common/infraestructure';
import { UserLoginController } from './auth/infraestructure/controllers/user-login.controller';
import { UserRegisterController } from './auth/infraestructure/controllers/user-register.controller';

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
