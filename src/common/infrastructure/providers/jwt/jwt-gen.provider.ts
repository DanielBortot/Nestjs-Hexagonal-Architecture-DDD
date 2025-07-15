import { Provider } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtGen } from 'src/auth/infrastructure/jwt-gen/jwt-gen'

export const JwtGenProvider: Provider = {
	provide: 'JwtGen',
	useFactory: async (jwtService: JwtService) => {
		return new JwtGen(jwtService)
	},
	inject: [JwtService],
}
