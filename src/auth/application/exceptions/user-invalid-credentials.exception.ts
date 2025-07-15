import { ApplicationException } from 'src/common/application'

export class UserInvalidCredentialsException extends ApplicationException {
	constructor() {
		super('Invalid user credentials')
	}
}
