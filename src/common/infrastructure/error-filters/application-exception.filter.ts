import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common'
import { ApplicationException } from 'src/common/application'
import { CustomError } from 'src/common/utils/CustomError'

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
	catch(exception: ApplicationException, host: ArgumentsHost) {
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
