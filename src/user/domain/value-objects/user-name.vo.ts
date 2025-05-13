import { ValueObjectRoot } from "src/common/domain";
import { InvalidUserNameException } from "../domain-exceptions/invalid-user-name.exception";

export class UserNameVo extends ValueObjectRoot<UserNameVo> {
    
    private readonly name: string;

    private constructor(name: string) {
        super();
        const regex = new RegExp('^[a-zA-Z]{2,30}$');
        if (!regex.test(name)) throw new InvalidUserNameException(name);
        this.name = name;
    }

    equals(value: UserNameVo): boolean {
        return this.name === value.Value;
    }

    static create(name: string): UserNameVo {
        return new UserNameVo(name);
    }

    get Value(): string {
        return this.name;
    }
}