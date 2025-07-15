import { BaseException } from "src/common/utils/BaseException";
import { BaseExceptionEnum } from "src/common/utils/BaseExceptionEnum";

export class DomainException extends BaseException {
	constructor(message: string) {
		super(message, BaseExceptionEnum.DOMAIN_EXCEPTION);
	}
}
