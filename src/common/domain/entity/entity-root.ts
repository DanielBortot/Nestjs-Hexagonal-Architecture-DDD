import { ValueObjectRoot } from '../value-object/value-object-root.abstract'

export class EntityRoot<T extends ValueObjectRoot<T>> {
	protected readonly id: T

	protected constructor(id: T) {
		this.id = id
	}

	get Id(): T {
		return this.id
	}
}
