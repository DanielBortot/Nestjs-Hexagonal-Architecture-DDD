import { INestApplication } from "@nestjs/common";
import { ApplicationExceptionFilter } from "../../error-filters/application-exception.filter";
import { DomainExceptionFilter } from "../../error-filters/domain-exception.filter";
import { InfrastructureExceptionFilter } from "../../error-filters/infrastructure-exception.filter";
import { NotRegisteredExceptionFilter } from "../../error-filters/not-registered-exception.filter";

export const setupFilters = (app: INestApplication) => {
	app.useGlobalFilters(
		new DomainExceptionFilter(),
		new ApplicationExceptionFilter(),
		new InfrastructureExceptionFilter(),
		new NotRegisteredExceptionFilter(),
	);
};
