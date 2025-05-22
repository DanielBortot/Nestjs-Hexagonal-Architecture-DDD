import { IIdGenerator, IService } from "src/common/application";
import { UserRegisterRequestDto } from "../dto/request/user-resgister-request.dto";
import { UserRegisterResponseDto } from "../dto/response/user-register-response.dto";
import { Result } from "src/common/utils";
import { IOrmUserQueryRepository } from "src/user/application/repositories/query/orm-user-query-repository.interface";
import { IOrmUserCommandRepository } from "src/user/application/repositories/command/orm-user-command-repository.interface";
import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception";
import { User } from "src/user/domain/aggregate/user.aggregate";
import { UserIdVo } from "src/user/domain/value-objects/user-id.vo";
import { UserNameVo } from "src/user/domain/value-objects/user-name.vo";
import { UserEmailVo } from "src/user/domain/value-objects/user-email.vo";
import { UserPhoneVo } from "src/user/domain/value-objects/user-phone.vo";
import { UserRoleVo } from "src/user/domain/value-objects/user-role.vo";
import { UserModel } from "src/user/application/models/user-model.type";
import { ITokenGen } from "../token-gen/token-gen.interface";
import { Credentials } from "../credentials/credentials.model";

export class UserRegisterService extends IService<UserRegisterRequestDto, UserRegisterResponseDto> {
    
    constructor(
        private readonly ormUserQueryRepository: IOrmUserQueryRepository,
        private readonly ormUserCommandRepository: IOrmUserCommandRepository,
        private readonly idGenerator: IIdGenerator,
        private readonly tokenGen: ITokenGen
    ) {
        super();
    }

    public async execute(value: UserRegisterRequestDto): Promise<Result<UserRegisterResponseDto>> {
        const findUser = await this.ormUserQueryRepository.existUserByEmail(value.email);
        
        if (findUser.isError) return Result.fail(findUser.Error);

        if (findUser.Value) return Result.fail(new UserAlreadyExistsException());

        const id = this.idGenerator.generateId();
        const newUser = User.create(
            UserIdVo.create(id),
            UserNameVo.create(value.name),
            UserEmailVo.create(value.email),
            UserPhoneVo.create(value.phone),
            UserRoleVo.create(value.role.toString())
        );

        const userModel: UserModel = {
            user: newUser,
            password: value.password
        }

        await this.ormUserCommandRepository.saveUser(userModel);

        const credentials: Credentials = {
            userId: id
        }
        const token = await this.tokenGen.genToken(credentials)

        const response = new UserRegisterResponseDto(
            id,
            token
        )

        return Result.success(response);
    }

}