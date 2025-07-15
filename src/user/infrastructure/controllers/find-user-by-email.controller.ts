import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
	LoggerDecorator,
	IService,
	ExceptionDecorator,
} from 'src/common/application'
import { FindUserByEmailService } from 'src/user/application/services/find-user-by-email.service'
import {
	NestLogger,
	TimerTimestamp,
	InfProvidersEnum,
} from 'src/common/infrastructure'
import { OrmUserQueryRepository } from '../repositories/orm-repository/query/orm-user-query.repository'
import { FindUserByEmailRequestDto } from 'src/user/application/dto/request/find-user-by-email-request.dto'
import { FindUserByEmailResponseDto } from 'src/user/application/dto/response/find-user-by-email-response.dto'
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt.guard'
import { DataSource } from 'typeorm'

@ApiTags('User')
@Controller('user')
export class FindUserByEmailController {
	private readonly ormUserQueryRepository: OrmUserQueryRepository
	private readonly logger = new NestLogger()
	private readonly timer = new TimerTimestamp()

	constructor(
		@Inject(InfProvidersEnum.OrmPgDataSource)
		private readonly ormDatasource: DataSource,
	) {
		this.ormUserQueryRepository = new OrmUserQueryRepository(
			this.ormDatasource,
		)
	}

	@UseGuards(JwtAuthGuard)
	@Get('email')
	async findUserByEmail(@Query('email') email: string) {
		const service: IService<
			FindUserByEmailRequestDto,
			FindUserByEmailResponseDto
		> = new ExceptionDecorator(
			new LoggerDecorator(
				new FindUserByEmailService(this.ormUserQueryRepository),
				this.logger,
				this.timer,
			),
		)
		const request = new FindUserByEmailRequestDto(email)
		const response = await service.execute(request)

		return response.Value
	}
}
