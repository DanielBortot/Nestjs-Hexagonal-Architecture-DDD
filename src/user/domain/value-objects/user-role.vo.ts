import { ValueObjectRoot } from "src/common/domain/value-object/value-object-root.abstract";
import { InvalidUserRoleException } from "../domain-exceptions/invalid-user-role.exception";
import { UserRoleEnum } from "../enums/role.enum";

export class UserRoleVo extends ValueObjectRoot<UserRoleVo> {
    private readonly role: string;

    private constructor(role: string) {
        super();
        if (!UserRoleEnum[role]) throw new InvalidUserRoleException(role);
        this.role = role;
    }

    equals(value: UserRoleVo): boolean {
        return this.role === value.Value;
    }

    static create(role: string): UserRoleVo {
        return new UserRoleVo(role);
    }

    get Value(): string {
        return this.role;
    }
}