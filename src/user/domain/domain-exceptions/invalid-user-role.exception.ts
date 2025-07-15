import { DomainException } from 'src/common/domain'

export class InvalidUserRoleException extends DomainException {
	constructor(role: string) {
		super(`Invalid user role: ${role}`)
	}
}
