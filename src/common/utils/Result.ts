import { BaseException } from "./BaseException";
import { NotRegisteredException } from "./exceptions/not-registered-exception";

export class Result<T> {
    private value?: T;
    private error?: BaseException;

    private constructor(value?: T, error?: BaseException) {
        this.value = value;
        this.error = error;
    }

    get isError(): Boolean {
        return !!this.error;
    }

    get isSuccess(): Boolean {
        return !!this.value;
    }

    get Value(): T {
        if (!this.value) throw new NotRegisteredException("No existe un value");
        return this.value;
    }

    get Error(): BaseException {
        if (!this.error) throw new NotRegisteredException("No existe ningun error");
        return this.error;
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>(value, undefined);
    }

    public static fail<T>(error: BaseException): Result<T> {
        return new Result<T>(undefined, error);
    }
}