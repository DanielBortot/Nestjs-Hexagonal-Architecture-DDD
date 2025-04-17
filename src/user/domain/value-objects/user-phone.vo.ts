import { ValueObjectRoot } from "src/common/domain/value-object/value-object-root.abstract";
import { InvalidUserPhoneException } from "../domain-exceptions/invalid-user-phone.exception";

export class UserPhoneVo extends ValueObjectRoot<UserPhoneVo> {
    
    private readonly phone: string;

    private constructor(phone: string) {
        super();
        const regex = new RegExp('^\\+?[0-9]{1,4}?[-.\\s]?\\(?[0-9]{1,3}?\\)?[-.\\s]?[0-9]{4,10}$');
        if (!regex.test(phone)) throw new InvalidUserPhoneException(phone);
        this.phone = phone;
    }

    equals(value: UserPhoneVo): boolean {
        return this.phone === value.Value;
    }

    static create(phone: string): UserPhoneVo {
        return new UserPhoneVo(phone);
    }

    get Value(): string {
        return this.phone;
    }
}