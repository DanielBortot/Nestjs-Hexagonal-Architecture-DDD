import { DomainException } from 'src/common/domain/domain-exception/domain-exception';

export class InvalidUserIdException extends DomainException {
    constructor(userId: string) {
        super(`Invalid user id: ${userId}`);
    }
}
