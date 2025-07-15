import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NestLogger, TimerTimestamp, UuidGenerator, InfProvidersEnum } from "src/common/infraestructure";
import { OrmUserQueryRepository } from "src/user/infraestructure/repositories/orm-repository/query/orm-user-query.repository";
import { JwtGen } from "../jwt-gen/jwt-gen";
import { OrmUserCommandRepository } from "src/user/infraestructure/repositories/orm-repository/command/orm-user-command.repository";
import { UserRegisterRequestInfDto } from "../dto/request/user-register-request-inf.dto";
import { ExceptionDecorator, IService, LoggerDecorator } from "src/common/application";
import { UserRegisterRequestDto } from "src/auth/application/dto/request/user-resgister-request.dto";
import { UserRegisterResponseDto } from "src/auth/application/dto/response/user-register-response.dto";
import { UserRegisterService } from "src/auth/application/services/user-register.service";
import { DataSource } from "typeorm";

@ApiTags("Auth")
@Controller("auth")
export class UserRegisterController {
    private readonly ormUserQueryRepository: OrmUserQueryRepository;
    private readonly ormUserCommandRepository: OrmUserCommandRepository;
    private readonly uuidGen = new UuidGenerator();
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();
    
    constructor(
        @Inject(InfProvidersEnum.JwtGen) private readonly jwtGen: JwtGen,
        @Inject(InfProvidersEnum.OrmPgDataSource) private readonly ormDatasource: DataSource
    ) {
        this.ormUserQueryRepository = new OrmUserQueryRepository(this.ormDatasource);
        this.ormUserCommandRepository = new OrmUserCommandRepository(this.ormDatasource);
    }

    @Post("register")
    async execute(@Body() body: UserRegisterRequestInfDto) {

        const service: IService<UserRegisterRequestDto, UserRegisterResponseDto> = 
        new ExceptionDecorator(
            new LoggerDecorator(
                new UserRegisterService(
                    this.ormUserQueryRepository,
                    this.ormUserCommandRepository,
                    this.uuidGen,
                    this.jwtGen
                ),
                this.logger,
                this.timer
            )
        );

        const request = new UserRegisterRequestDto(
            body.name,
            body.email,
            body.phone,
            body.role,
            body.password
        );
        const response = await service.execute(request);
        return response.Value;
    }
}