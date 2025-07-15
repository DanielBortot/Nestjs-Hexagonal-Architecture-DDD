import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common'
import { CustomError } from 'src/common/utils/CustomError'
import { InfraestructureException } from '../infraestructure-exception/infraestructure-exception'

@Catch(InfraestructureException)
export class InfraestructureExceptionFilter implements ExceptionFilter {
	catch(exception: InfraestructureException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()

		const error = CustomError.create(
			exception.message,
			exception.constructor.name,
			HttpStatus.INTERNAL_SERVER_ERROR,
		)

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
	}
}
