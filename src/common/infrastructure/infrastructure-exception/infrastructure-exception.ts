import { BaseException } from "src/common/utils/BaseException";
import { BaseExceptionEnum } from "src/common/utils/BaseExceptionEnum";
import { InfrastructureExceptionType } from "./enum/infrastructure-exception-type.enum";

export class InfrastructureException extends BaseException {
	private readonly infraType: InfrastructureExceptionType;

	constructor(
		message: string = "An unexpected error has occurred",
		infraType: InfrastructureExceptionType = InfrastructureExceptionType.INTERNAL_SERVER_ERROR,
	) {
		super(message, BaseExceptionEnum.INFRAESTRUCTURE_EXCEPTION);
		this.infraType = infraType;
	}

	get infrastructureType(): InfrastructureExceptionType {
		return this.infraType;
	}
}
