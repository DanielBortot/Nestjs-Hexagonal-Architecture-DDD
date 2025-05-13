import { ValueObjectRoot } from "src/common/domain";
import { InvalidUserIdException } from "../domain-exceptions/invalid-user-id.exception";

export class UserIdVo extends ValueObjectRoot<UserIdVo> {
    
    private readonly id: string;

    private constructor(id: string) {
        super();
        const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')
        if (!regex.test(id)) throw new InvalidUserIdException(id);
        this.id = id;
    }

    equals(value: UserIdVo): boolean {
        return this.id === value.Value;
    }

    static create(id: string): UserIdVo {
        return new UserIdVo(id);
    }

    get Value(): string {
        return this.id;
    }
}