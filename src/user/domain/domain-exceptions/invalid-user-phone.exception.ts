import { DomainException } from "src/common/domain/domain-exception/domain-exception";

export class InvalidUserPhoneException extends DomainException {
    constructor(phone: string) {
        super(`Invalid user phone: ${phone}`);
    }
}