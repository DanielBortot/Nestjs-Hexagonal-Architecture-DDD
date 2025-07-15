import { ApplicationException } from "src/common/application";

export class UserEmailAlreadyExistsException extends ApplicationException {
	constructor(email: string) {
		super(`user email: "${email}" already exists`);
	}
}
