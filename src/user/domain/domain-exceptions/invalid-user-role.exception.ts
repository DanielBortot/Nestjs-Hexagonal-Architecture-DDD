import { DomainException } from "src/common/domain/domain-exception/domain-exception";

export class InvalidUserRoleException extends DomainException {
    constructor(role: string) {
        super(`Invalid user role: ${role}`);
    }
}