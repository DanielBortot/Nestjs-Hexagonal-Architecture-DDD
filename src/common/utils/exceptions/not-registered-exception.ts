import { BaseException } from "../BaseException";
import { BaseExceptionEnum } from "../BaseExceptionEnum";

export class NotRegisteredException extends BaseException {

    constructor(message: string) {
        super(message, BaseExceptionEnum.NOT_REGISTERED);
    }
}