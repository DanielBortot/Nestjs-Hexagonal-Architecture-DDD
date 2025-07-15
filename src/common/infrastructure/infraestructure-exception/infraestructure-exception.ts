import { BaseException } from 'src/common/utils/BaseException'
import { BaseExceptionEnum } from 'src/common/utils/BaseExceptionEnum'

export class InfraestructureException extends BaseException {
	constructor(message?: string) {
		const msg = message ? message : 'ha ocurrido un error inesperado'
		super(msg, BaseExceptionEnum.INFRAESTRUCTURE_EXCEPTION)
	}
}
