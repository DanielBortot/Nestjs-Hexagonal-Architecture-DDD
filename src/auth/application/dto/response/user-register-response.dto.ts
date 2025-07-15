export class UserRegisterResponseDto {
	public userId: string;

	public token: string;

	constructor(userId: string, token: string) {
		this.userId = userId;
		this.token = token;
	}
}
