import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { CustomError } from "src/common/utils/CustomError";
import { InfrastructureException } from "../infrastructure-exception/infrastructure-exception";
import { InfrastructureExceptionType } from "../infrastructure-exception/enum/infrastructure-exception-type.enum";

@Catch(InfrastructureException)
export class InfrastructureExceptionFilter implements ExceptionFilter {
	catch(exception: InfrastructureException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const errType = exception.infrastructureType;
		let status: HttpStatus;

		switch (errType) {
			case InfrastructureExceptionType.BAD_REQUEST:
				status = HttpStatus.BAD_REQUEST;
				break;
			case InfrastructureExceptionType.CONFLICT:
				status = HttpStatus.CONFLICT;
				break;
			case InfrastructureExceptionType.NOT_FOUND:
				status = HttpStatus.NOT_FOUND;
				break;
			case InfrastructureExceptionType.UNAUTHORIZED:
				status = HttpStatus.UNAUTHORIZED;
				break;
			case InfrastructureExceptionType.FORBIDDEN:
				status = HttpStatus.FORBIDDEN;
				break;
			case InfrastructureExceptionType.INTERNAL_SERVER_ERROR:
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
