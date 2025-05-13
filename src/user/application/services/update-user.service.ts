import { IService } from "src/common/application";
import { UpdateUserRequestDto } from "../dto/request/update-user-request.dto";
import { Result } from "src/common/utils/Result";
import { IOrmUserQueryRepository } from "../repositories/query/orm-user-query-repository.interface";
import { IOrmUserCommandRepository } from "../repositories/command/orm-user-command-repository.interface";
import { UserEmailVo } from "src/user/domain/value-objects/user-email.vo";
import { UserEmailAlreadyExistsException } from "../application-exceptions/user-email-already-exists.exception";
import { UserNameVo } from "src/user/domain/value-objects/user-name.vo";
import { UserPhoneVo } from "src/user/domain/value-objects/user-phone.vo";
import { UserRoleVo } from "src/user/domain/value-objects/user-role.vo";

export class UpdateUserService extends IService<UpdateUserRequestDto, void> {

    constructor(
        private readonly ormUserQueryRepository: IOrmUserQueryRepository,
        private readonly ormUserCommandRepository: IOrmUserCommandRepository
    ) {
        super();
    }

    public async execute(value: UpdateUserRequestDto): Promise<Result<void>> {
        
        const userModel = await this.ormUserQueryRepository.findUserById(value.id);
        if (userModel.isError) return Result.fail(userModel.Error);

        const user = userModel.Value.user;

        if (value.email) {
            const userExist = await this.ormUserQueryRepository.existUserByEmail(value.email);
            if (userExist.isError || userExist.Value) return Result.fail(new UserEmailAlreadyExistsException(value.email));
            user.updateEmail(UserEmailVo.create(value.email));
        }

        if (value.name) user.updateName(UserNameVo.create(value.name));
        if (value.phone) user.updatePhone(UserPhoneVo.create(value.phone));
        if (value.role) user.updateRole(UserRoleVo.create(value.role.toString()));

        const save = await this.ormUserCommandRepository.saveUser({user, password: userModel.Value.password});
        if (save.isError) return Result.fail(save.Error);

        return Result.success(undefined);
    }

}