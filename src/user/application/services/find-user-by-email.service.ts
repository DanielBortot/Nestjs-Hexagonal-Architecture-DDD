import { IService } from "src/common/application/service/service.abstract";
import { FindUserByEmailRequestDto } from "../dto/request/find-user-by-email-request.dto";
import { FindUserByEmailResponseDto } from "../dto/response/find-user-by-email-response.dto";
import { Result } from "src/common/utils/Result";
import { IOrmUserQueryRepository } from "../repositories/query/orm-user-query-repository.interface";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class FindUserByEmailService extends IService<FindUserByEmailRequestDto, FindUserByEmailResponseDto> {

    constructor(
        private readonly ormUserQueryRepository: IOrmUserQueryRepository
    ) {
        super();
    }

    async execute(value: FindUserByEmailRequestDto): Promise<Result<FindUserByEmailResponseDto>> {

        const userModel = await this.ormUserQueryRepository.findUserByEmail(value.email);
        if (userModel.isError) return Result.fail(userModel.Error);

        const user = userModel.Value.user;

        const response = new FindUserByEmailResponseDto(
            user.Id.Value,
            user.Name.Value,
            user.Email.Value,
            user.Phone.Value,
            UserRoleEnum[user.Role.Value]
        );

        return Result.success(response);
    }

}