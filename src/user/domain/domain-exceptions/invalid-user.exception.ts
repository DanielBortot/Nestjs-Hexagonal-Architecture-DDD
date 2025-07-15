import { DomainException } from 'src/common/domain'

export class InvalidUserException extends DomainException {
	constructor() {
		super(`Invalid user`)
	}
}
