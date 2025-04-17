import { DomainException } from "src/common/domain/domain-exception/domain-exception";

export class InvalidUserNameException extends DomainException {
    constructor(name: string) {
        super(`Invalid user name: ${name}`);
    }
}