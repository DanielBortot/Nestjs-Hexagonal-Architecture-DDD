import { ApplicationException } from "src/common/application/application-exception/application-exception";

export class UserEmailAlreadyExistsException extends ApplicationException {
    constructor(email: string) {
        super(`user email: "${email}" already exists`);
    }
}