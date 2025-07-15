import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class UserRegisterRequestInfDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEnum(UserRoleEnum)
    @IsNotEmpty()
    role: UserRoleEnum;

    @IsString()
    @IsNotEmpty()
    password: string;
}