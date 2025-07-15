export abstract class BaseRequest {
	public userId: string

	constructor(userId: string) {
		this.userId = userId
	}
}
