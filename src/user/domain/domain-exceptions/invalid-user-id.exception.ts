import { DomainException } from "src/common/domain";

export class InvalidUserIdException extends DomainException {
	constructor(userId: string) {
		super(`Invalid user id: ${userId}`);
	}
}
