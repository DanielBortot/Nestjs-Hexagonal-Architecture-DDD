import {
	InfrastructureException,
	InfrastructureExceptionType,
} from "src/common/infrastructure";

export class UserNotExistsException extends InfrastructureException {
	constructor() {
		super("The user does not exist", InfrastructureExceptionType.NOT_FOUND);
	}
}
