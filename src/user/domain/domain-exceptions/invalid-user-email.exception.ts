import { DomainException } from 'src/common/domain'

export class InvalidUserEmailException extends DomainException {
	constructor(email: string) {
		super(`Invalid user email: ${email}`)
	}
}
