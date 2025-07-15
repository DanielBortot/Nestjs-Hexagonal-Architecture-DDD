import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class UserLoginRequestInfDto {
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string
}
