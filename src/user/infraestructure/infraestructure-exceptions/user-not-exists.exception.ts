import { InfraestructureException } from "src/common/infraestructure/infraestructure-exception/infraestructure-exception";

export class UserNotExistsException extends InfraestructureException {
    constructor() {
        super("The user does not exist");
    }
}