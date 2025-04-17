import { DomainException } from "src/common/domain/domain-exception/domain-exception";

export class InvalidUserEmailException extends DomainException {
    constructor(email: string) {
        super(`Invalid user email: ${email}`);
    }
}