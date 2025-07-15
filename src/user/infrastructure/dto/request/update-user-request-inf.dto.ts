import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'

export class UpdateUserRequestInfDto {
	@IsUUID()
	@IsNotEmpty()
	id: string

	@IsString()
	@IsOptional()
	name?: string

	@IsEmail()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	phone?: string
}
