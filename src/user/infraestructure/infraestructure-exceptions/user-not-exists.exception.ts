import { InfraestructureException } from "src/common/infraestructure";

export class UserNotExistsException extends InfraestructureException {
    constructor() {
        super("The user does not exist");
    }
}