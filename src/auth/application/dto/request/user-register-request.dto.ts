import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class UserRegisterRequestDto {
	constructor(
		public name: string,
		public email: string,
		public phone: string,
		public role: UserRoleEnum,
		public password: string,
	) {}

	toJSON() {
		const { password, ...dto } = this;
		return dto;
	}
}
