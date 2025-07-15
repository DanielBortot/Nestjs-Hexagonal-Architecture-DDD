import { DomainException } from "src/common/domain";

export class InvalidUserPhoneException extends DomainException {
	constructor(phone: string) {
		super(`Invalid user phone: ${phone}`);
	}
}
