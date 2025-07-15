import { BaseException } from "src/common/utils/BaseException";
import { BaseExceptionEnum } from "src/common/utils/BaseExceptionEnum";
import { ApplicationExceptionType } from "./enum/application-exception-type.enum";

export class ApplicationException extends BaseException {
	private readonly appType: ApplicationExceptionType;

	constructor(
		message: string,
		appType: ApplicationExceptionType = ApplicationExceptionType.APPLICATION_ERROR,
	) {
		super(message, BaseExceptionEnum.APPLICATION_EXCEPTION);
		this.appType = appType;
	}

	get applicationType(): ApplicationExceptionType {
		return this.appType;
	}
}
