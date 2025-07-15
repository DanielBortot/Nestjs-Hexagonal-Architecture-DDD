import { BaseException } from "./BaseException";
import { NotRegisteredException } from "./exceptions/not-registered-exception";

export class Result<T> {
	private value?: T;
	private error?: BaseException;

	private constructor(value?: T, error?: BaseException) {
		this.value = value;
		this.error = error;
	}

	get isError(): boolean {
		return !!this.error;
	}

	get isSuccess(): boolean {
		return !!this.value;
	}

	get Value(): T {
		if (this.value == null)
			throw new NotRegisteredException("There is no value");
		return this.value;
	}

	get Error(): BaseException {
		if (!this.error) throw new NotRegisteredException("There is no error");
		return this.error;
	}

	public static success<T>(value: T): Result<T> {
		return new Result<T>(value, undefined);
	}

	public static fail<T>(error: BaseException): Result<T> {
		return new Result<T>(undefined, error);
	}
}
