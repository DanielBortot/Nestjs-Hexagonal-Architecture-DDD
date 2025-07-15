export abstract class ValueObjectRoot<T> {
	abstract equals(value: T): boolean;
}
