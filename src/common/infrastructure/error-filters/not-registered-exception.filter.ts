import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { CustomError } from "src/common/utils/CustomError";
import { NotRegisteredException } from "src/common/utils/exceptions/not-registered-exception";

@Catch(NotRegisteredException)
export class NotRegisteredExceptionFilter implements ExceptionFilter {
	catch(exception: NotRegisteredException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const error = CustomError.create(
			exception.message,
			exception.constructor.name,
			HttpStatus.INTERNAL_SERVER_ERROR,
		);

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
}
