import { DomainException } from "src/common/domain";

export class InvalidUserNameException extends DomainException {
	constructor(name: string) {
		super(`Invalid user name: ${name}`);
	}
}
