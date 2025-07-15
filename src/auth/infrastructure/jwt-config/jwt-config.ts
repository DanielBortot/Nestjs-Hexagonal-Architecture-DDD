import { JwtModule } from '@nestjs/jwt'

export const setupJwt = JwtModule.register({
	secret: 'hola',
	signOptions: { expiresIn: '8h' },
})
