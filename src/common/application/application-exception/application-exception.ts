import { BaseException } from 'src/common/utils/BaseException'
import { BaseExceptionEnum } from 'src/common/utils/BaseExceptionEnum'

export class ApplicationException extends BaseException {
	constructor(message: string) {
		super(message, BaseExceptionEnum.APPLICATION_EXCEPTION)
	}
}
