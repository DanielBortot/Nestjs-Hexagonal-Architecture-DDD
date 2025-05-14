import { Body, Controller, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserRequestInfDto } from "../dto/request/update-user-request-inf.dto";
import { PgDatabaseSingleton, NestLogger, TimerTimestamp } from "src/common/infraestructure";
import { OrmUserQueryRepository } from "../repositories/orm-repository/query/orm-user-query.repository";
import { IService, LoggerDecorator, ExceptionDecorator } from "src/common/application";
import { UpdateUserRequestDto } from "src/user/application/dto/request/update-user-request.dto";
import { UpdateUserService } from "src/user/application/services/update-user.service";
import { OrmUserCommandRepository } from "../repositories/orm-repository/command/orm-user-command.repository";

@ApiTags("User")
@Controller("user")
export class UpdateUserController {

    private readonly ormUserCommandRepository = new OrmUserCommandRepository(PgDatabaseSingleton.getInstance());
    private readonly ormUserQueryRepository = new OrmUserQueryRepository(PgDatabaseSingleton.getInstance());
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();

    constructor() {}

    @Patch("")
    async updateUser(@Body() body: UpdateUserRequestInfDto) {

        const service: IService<UpdateUserRequestDto, void> = 
        new ExceptionDecorator(
            new LoggerDecorator(
                new UpdateUserService(
                    this.ormUserQueryRepository,
                    this.ormUserCommandRepository
                ),
                this.logger,
                this.timer
            )
        );

        const response = await service.execute(body);
        return response.Value;

    }
}