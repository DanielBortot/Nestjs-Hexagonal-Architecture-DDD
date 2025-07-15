import { UserRoleEnum } from 'src/user/domain/enums/role.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class OrmUserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('varchar')
	name: string

	@Column('varchar')
	email: string

	@Column('varchar')
	phone: string

	@Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CLIENT })
	role: UserRoleEnum

	@Column('varchar')
	password: string

	static create(
		id: string,
		name: string,
		email: string,
		phone: string,
		role: UserRoleEnum,
		password: string,
	): OrmUserEntity {
		const user = new OrmUserEntity()
		user.id = id
		user.name = name
		user.email = email
		user.phone = phone
		user.role = role
		user.password = password
		return user
	}
}
