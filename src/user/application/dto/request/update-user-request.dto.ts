import { UserRoleEnum } from 'src/user/domain/enums/role.enum'

export class UpdateUserRequestDto {
	constructor(
		public id: string,
		public name?: string,
		public email?: string,
		public phone?: string,
		public role?: UserRoleEnum,
	) {}
}
