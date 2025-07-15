import { BaseExceptionEnum } from "./BaseExceptionEnum";

export abstract class BaseException extends Error {
	private type: BaseExceptionEnum;
	protected stacks: string[] = [];

	constructor(message: string, type?: BaseExceptionEnum) {
		super(message);
		this.type = type ? type : BaseExceptionEnum.NOT_REGISTERED;
	}

	addExceptions(...exception: string[]): void {
		this.stacks.push(...exception);
	}

	get Type(): BaseExceptionEnum {
		return this.type;
	}

	get Stacks(): string[] {
		return this.stacks;
	}
}
