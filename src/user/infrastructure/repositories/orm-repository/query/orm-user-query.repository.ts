import { InfraestructureException } from 'src/common/infrastructure'
import { Result } from 'src/common/utils/Result'
import { UserModel } from 'src/user/application/models/user-model.type'
import { IOrmUserQueryRepository } from 'src/user/application/repositories/query/orm-user-query-repository.interface'
import { User } from 'src/user/domain/aggregate/user.aggregate'
import { UserEmailVo } from 'src/user/domain/value-objects/user-email.vo'
import { UserIdVo } from 'src/user/domain/value-objects/user-id.vo'
import { UserNameVo } from 'src/user/domain/value-objects/user-name.vo'
import { UserPhoneVo } from 'src/user/domain/value-objects/user-phone.vo'
import { UserRoleVo } from 'src/user/domain/value-objects/user-role.vo'
import { OrmUserEntity } from 'src/user/infrastructure/entities/orm-entities/orm-user.entity'
import { UserNotExistsException } from 'src/user/infrastructure/infraestructure-exceptions/user-not-exists.exception'
import { DataSource, Repository } from 'typeorm'

export class OrmUserQueryRepository
	extends Repository<OrmUserEntity>
	implements IOrmUserQueryRepository
{
	constructor(dataSource: DataSource) {
		super(OrmUserEntity, dataSource.createEntityManager())
	}

	async findUserById(id: string): Promise<Result<UserModel>> {
		try {
			const user = await this.findOneBy({ id })
			if (!user) return Result.fail(new UserNotExistsException())

			const userDomain = User.create(
				UserIdVo.create(user.id),
				UserNameVo.create(user.name),
				UserEmailVo.create(user.email),
				UserPhoneVo.create(user.phone),
				UserRoleVo.create(user.role.toString()),
			)

			const userModel: UserModel = {
				password: user.password,
				user: userDomain,
			}

			return Result.success(userModel)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}

	async findAllUsers(): Promise<Result<UserModel[]>> {
		try {
			const users = await this.find()

			const userModels: UserModel[] = []

			users.forEach((user) => {
				const userDomain = User.create(
					UserIdVo.create(user.id),
					UserNameVo.create(user.name),
					UserEmailVo.create(user.email),
					UserPhoneVo.create(user.phone),
					UserRoleVo.create(user.role.toString()),
				)

				userModels.push({
					password: user.password,
					user: userDomain,
				})
			})

			return Result.success(userModels)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}

	async findUserByEmail(email: string): Promise<Result<UserModel>> {
		try {
			const user = await this.findOneBy({ email })
			if (!user) return Result.fail(new UserNotExistsException())

			const userDomain = User.create(
				UserIdVo.create(user.id),
				UserNameVo.create(user.name),
				UserEmailVo.create(user.email),
				UserPhoneVo.create(user.phone),
				UserRoleVo.create(user.role.toString()),
			)

			const userModel: UserModel = {
				password: user.password,
				user: userDomain,
			}

			return Result.success(userModel)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}

	async existUserByEmail(email: string): Promise<Result<boolean>> {
		try {
			const exixtsUser = await this.exists({ where: { email } })

			return Result.success(exixtsUser)
		} catch (error) {
			const err = new InfraestructureException(
				'An unexpected error has occurred',
			)
			err.addExceptions(error)
			return Result.fail(err)
		}
	}
}
