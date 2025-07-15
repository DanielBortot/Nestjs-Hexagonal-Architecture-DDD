import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class UpdateUserRequestInfDto {
	@IsString()
	@IsOptional()
	name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	phone?: string;

	@IsEnum(UserRoleEnum)
	@IsOptional()
	role?: UserRoleEnum;
}
