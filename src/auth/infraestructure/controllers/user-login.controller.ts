import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NestLogger, PgDatabaseSingleton, TimerTimestamp } from "src/common/infraestructure";
import { OrmUserCommandRepository } from "src/user/infraestructure/repositories/orm-repository/command/orm-user-command.repository";
import { OrmUserQueryRepository } from "src/user/infraestructure/repositories/orm-repository/query/orm-user-query.repository";
import { JwtGen } from "../jwt-gen/jwt-gen";
import { JwtService } from "@nestjs/jwt";
import { UserLoginRequestInfDto } from "../dto/request/user-login-request-inf.dto";
import { ExceptionDecorator, IService, LoggerDecorator } from "src/common/application";
import { UserLoginRequestDto } from "src/auth/application/dto/request/user-login-request.dto";
import { UserLoginResponseDto } from "src/auth/application/dto/response/user-login-response.dto";
import { UserLoginService } from "src/auth/application/services/user-login.service";

@ApiTags("Auth")
@Controller("ath")
export class UserLoginController {

    private readonly jwtGen: JwtGen;
    private readonly ormUserQueryRepository = new OrmUserQueryRepository(PgDatabaseSingleton.getInstance());
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();

    constructor(
        private readonly jwtService: JwtService
    ) {
        this.jwtGen = new JwtGen(this.jwtService)
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