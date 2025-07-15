import { IIdGenerator } from 'src/common/application'
import { v4 as uuidv4 } from 'uuid'

export class UuidGenerator implements IIdGenerator {
	generateId(): string {
		return uuidv4()
	}
}
