export class RequestRootDto {
	constructor(public userId: string) {}

	get UserId(): string {
		return this.userId
	}
}
