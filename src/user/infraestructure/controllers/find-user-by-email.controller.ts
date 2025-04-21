import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExceptionDecorator } from "src/common/application/aspects/exception-decorator/exception-decorator";
import { LoggerDecorator } from "src/common/application/aspects/logger-decorator/logger-decorator";
import { FindUserByEmailService } from "src/user/application/services/find-user-by-email.service";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/postgres/postgres-database.singleton";
import { OrmUserQueryRepository } from "../repositories/orm-repository/query/orm-user-query.repository";
import { IService } from "src/common/application/service/service.abstract";
import { FindUserByEmailRequestDto } from "src/user/application/dto/request/find-user-by-email-request.dto";
import { FindUserByEmailResponseDto } from "src/user/application/dto/response/find-user-by-email-response.dto";
import { NestLogger } from "src/common/infraestructure/logger/nest-logger";
import { TimerTimestamp } from "src/common/infraestructure/timer/timer-timestamp";

@ApiTags("User")
@Controller("user")
export class FindUserByEmailController {

    private readonly ormUserQueryRepository = new OrmUserQueryRepository(PgDatabaseSingleton.getInstance());
    private readonly logger = new NestLogger();
    private readonly timer = new TimerTimestamp();

    constructor() {}

    @Get("email")
    async findUserByEmail(@Query("email") email: string) {
        const service: IService<FindUserByEmailRequestDto, FindUserByEmailResponseDto> = 
        new ExceptionDecorator(
            new LoggerDecorator(
                new FindUserByEmailService(
                    this.ormUserQueryRepository
                ),
                this.logger,
                this.timer
            )
        );
        const request = new FindUserByEmailRequestDto(email);
        const response = await service.execute(request);

        return response.Value;
    }

}