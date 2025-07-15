import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class UserLoginResponseDto {
	public userId: string;
	public name: string;
	public email: string;
	public phone: string;
	public role: UserRoleEnum;
	public token: string;

	constructor(
		userId: string,
		name: string,
		email: string,
		phone: string,
		role: UserRoleEnum,
		token: string,
	) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.role = role;
		this.token = token;
	}
}
