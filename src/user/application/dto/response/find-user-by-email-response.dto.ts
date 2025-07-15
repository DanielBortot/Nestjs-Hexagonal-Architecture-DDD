import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class FindUserByEmailResponseDto {
	public id: string;
	public name: string;
	public email: string;
	public phone: string;
	public role: UserRoleEnum;

	constructor(
		id: string,
		name: string,
		email: string,
		phone: string,
		role: UserRoleEnum,
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.role = role;
	}
}
