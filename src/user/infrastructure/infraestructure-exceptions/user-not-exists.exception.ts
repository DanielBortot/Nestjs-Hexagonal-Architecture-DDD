import { InfraestructureException } from 'src/common/infrastructure'

export class UserNotExistsException extends InfraestructureException {
	constructor() {
		super('The user does not exist')
	}
}
