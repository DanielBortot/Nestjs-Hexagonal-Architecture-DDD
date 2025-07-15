import {
	ApplicationException,
	ApplicationExceptionType,
} from "src/common/application";

export class UserAlreadyExistsException extends ApplicationException {
	constructor() {
		super("User already exists", ApplicationExceptionType.CONFLICT);
	}
}
