import { Credentials } from '../credentials/credentials.model'

export interface ITokenGen {
	genToken(value: Credentials): Promise<string>
}
