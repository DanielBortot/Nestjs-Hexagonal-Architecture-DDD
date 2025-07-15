import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { DomainException } from "src/common/domain";
import { CustomError } from "src/common/utils/CustomError";

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
	catch(exception: DomainException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const error = CustomError.create(
			exception.message,
			exception.constructor.name,
			HttpStatus.BAD_REQUEST,
		);

		response.status(HttpStatus.BAD_REQUEST).json(error);
	}
}
