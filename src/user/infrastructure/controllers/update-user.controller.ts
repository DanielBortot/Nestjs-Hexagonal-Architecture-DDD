import {
	Body,
	Controller,
	Inject,
	Patch,
	Req,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateUserRequestInfDto } from "../dto/request/update-user-request-inf.dto";
import {
	NestLogger,
	TimerTimestamp,
	InfProvidersEnum,
} from "src/common/infrastructure";
import { OrmUserQueryRepository } from "../repositories/orm-repository/query/orm-user-query.repository";
import {
	IService,
	LoggerDecorator,
	ExceptionDecorator,
} from "src/common/application";
import { UpdateUserRequestDto } from "src/user/application/dto/request/update-user-request.dto";
import { UpdateUserService } from "src/user/application/services/update-user.service";
import { OrmUserCommandRepository } from "../repositories/orm-repository/command/orm-user-command.repository";
import { JwtAuthGuard } from "src/auth/infrastructure/guards/jwt.guard";
import { DataSource } from "typeorm";
import { Request } from "express";
import { Credentials } from "src/auth/application/credentials/credentials.model";

@ApiTags("User")
@Controller("user")
export class UpdateUserController {
	private readonly ormUserCommandRepository: OrmUserCommandRepository;
	private readonly ormUserQueryRepository: OrmUserQueryRepository;
	private readonly logger = new NestLogger();
	private readonly timer = new TimerTimestamp();

	constructor(
		@Inject(InfProvidersEnum.OrmPgDataSource)
		private readonly ormDatasource: DataSource,
	) {
		this.ormUserCommandRepository = new OrmUserCommandRepository(
			this.ormDatasource,
		);
		this.ormUserQueryRepository = new OrmUserQueryRepository(
			this.ormDatasource,
		);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch("")
	async updateUser(
		@Body() body: UpdateUserRequestInfDto,
		@Req() req: Request,
	) {
		const userReq = req.user as Credentials;

		const service: IService<UpdateUserRequestDto, void> =
			new ExceptionDecorator(
				new LoggerDecorator(
					new UpdateUserService(
						this.ormUserQueryRepository,
						this.ormUserCommandRepository,
					),
					this.logger,
					this.timer,
				),
			);

		const request = new UpdateUserRequestDto(
			userReq.userId,
			body.name,
			body.email,
			body.phone,
			body.role,
		);

		const response = await service.execute(request);
		return null;
	}
}
