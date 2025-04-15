import { BaseExceptionEnum } from "./BaseExceptionEnum";

export abstract class BaseException extends Error {
    private type: BaseExceptionEnum;
    
    constructor(message: string, type?:BaseExceptionEnum) {
        super(message);
        this.type = type ? type : BaseExceptionEnum.NOT_REGISTERED;
    }

    get Type(): BaseExceptionEnum {
        return this.type;
    }
    
}