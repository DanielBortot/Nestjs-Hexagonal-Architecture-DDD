import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { ApplicationException } from "src/common/application";
import { ApplicationExceptionType } from "src/common/application/application-exception/enum/application-exception-type.enum";
import { CustomError } from "src/common/utils/CustomError";

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
	catch(exception: ApplicationException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const errType = exception.applicationType;
		let status: HttpStatus;

		switch (errType) {
			case ApplicationExceptionType.BAD_REQUEST:
				status = HttpStatus.BAD_REQUEST;
				break;
			case ApplicationExceptionType.CONFLICT:
				status = HttpStatus.CONFLICT;
				break;
			case ApplicationExceptionType.UNAUTHORIZED:
				status = HttpStatus.UNAUTHORIZED;
				break;
			case ApplicationExceptionType.APPLICATION_ERROR:
				status = HttpStatus.INTERNAL_SERVER_ERROR;
				break;
			default:
				status = HttpStatus.INTERNAL_SERVER_ERROR;
				break;
		}

		const error = CustomError.create(
			exception.message,
			exception.constructor.name,
			status,
		);

		response.status(status).json(error);
	}
}
