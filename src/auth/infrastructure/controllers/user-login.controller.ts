import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InfProvidersEnum, NestLogger, TimerTimestamp } from "src/common/infrastructure";
import { OrmUserQueryRepository } from "src/user/infrastructure/repositories/orm-repository/query/orm-user-query.repository";
import { JwtGen } from "../jwt-gen/jwt-gen";
import { UserLoginRequestInfDto } from "../dto/request/user-login-request-inf.dto";
import { ExceptionDecorator, IService, LoggerDecorator } from "src/common/application";
import { UserLoginRequestDto } from "src/auth/application/dto/request/user-login-request.dto";
import { UserLoginResponseDto } from "src/auth/application/dto/response/user-login-response.dto";
import { UserLoginService } from "src/auth/application/services/user-login.service";
import { DataSource } from "typeorm";

@ApiTags("Auth")
@Controller("auth")
export class UserLoginController {

    private readonly ormUserQueryRepository: OrmUserQueryRepository;
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();

    constructor(
        @Inject(InfProvidersEnum.JwtGen) private readonly jwtGen: JwtGen,
        @Inject(InfProvidersEnum.OrmPgDataSource) private readonly ormDatasource: DataSource
    ) {
        this.ormUserQueryRepository = new OrmUserQueryRepository(this.ormDatasource)
    }

    @Post("login")
    async execute(@Body() body: UserLoginRequestInfDto) {

        const service: IService<UserLoginRequestDto, UserLoginResponseDto> =
        new ExceptionDecorator(
            new LoggerDecorator(
                new UserLoginService(
                    this.ormUserQueryRepository,
                    this.jwtGen
                ),
                this.logger,
                this.timer
            )
        );
        const request = new UserLoginRequestDto(body.email, body.password);
        const response = await service.execute(request);
        return response.Value;
    }
}