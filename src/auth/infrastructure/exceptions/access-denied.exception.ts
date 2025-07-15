import {
	InfrastructureException,
	InfrastructureExceptionType,
} from "src/common/infrastructure";

export class AccessDeniedException extends InfrastructureException {
	constructor() {
		super("Access denied", InfrastructureExceptionType.FORBIDDEN);
	}
}
