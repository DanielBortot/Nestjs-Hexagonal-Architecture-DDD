import { InfraestructureException } from 'src/common/infrastructure'
import { Result } from 'src/common/utils/Result'
import { UserModel } from 'src/user/application/models/user-model.type'
import { IOrmUserCommandRepository } from 'src/user/application/repositories/command/orm-user-command-repository.interface'
import { User } from 'src/user/domain/aggregate/user.aggregate'
import { UserRoleEnum } from 'src/user/domain/enums/role.enum'
import { OrmUserEntity } from 'src/user/infrastructure/entities/orm-entities/orm-user.entity'
import { DataSource, Repository } from 'typeorm'

export class OrmUserCommandRepository
	extends Repository<OrmUserEntity>
	implements IOrmUserCommandRepository
{
	constructor(dataSource: DataSource) {
		super(OrmUserEntity, dataSource.createEntityManager())
	}

	async saveUser(user: UserModel): Promise<Result<void>> {
		try {
			const userDomain = user.user
			const ormUser = OrmUserEntity.create(
				userDomain.Id.Value,
				userDomain.Name.Value,
				userDomain.Email.Value,
				userDomain.Phone.Value,
				UserRoleEnum[userDomain.Role.Value],
				user.password,
			)

			await this.save(ormUser)
			return Result.success(undefined)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}

	async deleteUser(user: User): Promise<Result<void>> {
		try {
			await this.delete(user.Id.Value)
			return Result.success(undefined)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}
}
