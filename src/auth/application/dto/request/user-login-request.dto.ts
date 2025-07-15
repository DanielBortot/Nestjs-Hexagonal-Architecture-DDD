export class UserLoginRequestDto {
	constructor(
		public email: string,
		public password: string,
	) {}

	toJSON() {
		const { password, ...dto } = this;
		return dto;
	}
}
