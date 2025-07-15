import { Result } from 'src/common/utils/Result'
import { UserModel } from '../../models/user-model.type'

export interface IOrmUserQueryRepository {
	findUserById(id: string): Promise<Result<UserModel>>
	findAllUsers(): Promise<Result<UserModel[]>>
	findUserByEmail(email: string): Promise<Result<UserModel>>
	existUserByEmail(email: string): Promise<Result<boolean>>
}
