import { Body, Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { PgDatabaseSingleton, NestLogger, TimerTimestamp, UuidGenerator } from "src/common/infraestructure";
import { OrmUserQueryRepository } from "src/user/infraestructure/repositories/orm-repository/query/orm-user-query.repository";
import { JwtGen } from "../jwt-gen/jwt-gen";
import { OrmUserCommandRepository } from "src/user/infraestructure/repositories/orm-repository/command/orm-user-command.repository";
import { UserRegisterRequestInfDto } from "../dto/request/user-register-request-inf.dto";
import { ExceptionDecorator, IService, LoggerDecorator } from "src/common/application";
import { UserRegisterRequestDto } from "src/auth/application/dto/request/user-resgister-request.dto";
import { UserRegisterResponseDto } from "src/auth/application/dto/response/user-register-response.dto";
import { UserRegisterService } from "src/auth/application/services/user-register.service";

@ApiTags("Auth")
@Controller("auth")
export class UserRegisterController {
    private readonly jwtGen: JwtGen;
    private readonly ormUserQueryRepository = new OrmUserQueryRepository(PgDatabaseSingleton.getInstance());
    private readonly ormUserCommandRepository = new OrmUserCommandRepository(PgDatabaseSingleton.getInstance());
    private readonly uuidGen = new UuidGenerator();
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();
    
    constructor(
        private readonly jwtService: JwtService
    ) {
        this.jwtGen = new JwtGen(this.jwtService)
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