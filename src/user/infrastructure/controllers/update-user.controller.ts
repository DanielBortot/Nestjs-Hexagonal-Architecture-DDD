import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateUserRequestInfDto } from '../dto/request/update-user-request-inf.dto'
import {
	NestLogger,
	TimerTimestamp,
	InfProvidersEnum,
} from 'src/common/infrastructure'
import { OrmUserQueryRepository } from '../repositories/orm-repository/query/orm-user-query.repository'
import {
	IService,
	LoggerDecorator,
	ExceptionDecorator,
} from 'src/common/application'
import { UpdateUserRequestDto } from 'src/user/application/dto/request/update-user-request.dto'
import { UpdateUserService } from 'src/user/application/services/update-user.service'
import { OrmUserCommandRepository } from '../repositories/orm-repository/command/orm-user-command.repository'
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt.guard'
import { DataSource } from 'typeorm'

@ApiTags('User')
@Controller('user')
export class UpdateUserController {
	private readonly ormUserCommandRepository: OrmUserCommandRepository
	private readonly ormUserQueryRepository: OrmUserQueryRepository
	private readonly logger = new NestLogger()
	private readonly timer = new TimerTimestamp()

	constructor(
		@Inject(InfProvidersEnum.OrmPgDataSource)
		private readonly ormDatasource: DataSource,
	) {
		this.ormUserCommandRepository = new OrmUserCommandRepository(
			this.ormDatasource,
		)
		this.ormUserQueryRepository = new OrmUserQueryRepository(
			this.ormDatasource,
		)
	}

	@UseGuards(JwtAuthGuard)
	@Patch('')
	async updateUser(@Body() body: UpdateUserRequestInfDto) {
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
			)

		const response = await service.execute(body)
		return response.Value
	}
}
