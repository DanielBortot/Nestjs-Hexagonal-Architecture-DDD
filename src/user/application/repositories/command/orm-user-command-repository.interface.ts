import { User } from "src/user/domain/aggregate/user.aggregate";
import { UserModel } from "../../models/user-model.type";
import { Result } from "src/common/utils/Result";

export interface IOrmUserCommandRepository {
    saveUser(user: UserModel): Promise<Result<void>>;
    deleteUser(user: User): Promise<Result<void>>;
}