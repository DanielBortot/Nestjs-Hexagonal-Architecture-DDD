import { AggregateRoot } from "src/common/domain";
import { UserIdVo } from "../value-objects/user-id.vo";
import { DomainEventRoot } from "src/common/domain";
import { UserNameVo } from "../value-objects/user-name.vo";
import { UserEmailVo } from "../value-objects/user-email.vo";
import { UserPhoneVo } from "../value-objects/user-phone.vo";
import { UserRoleVo } from "../value-objects/user-role.vo";
import { InvalidUserException } from "../domain-exceptions/invalid-user.exception";

export class User extends AggregateRoot<UserIdVo> {

    private name: UserNameVo;
    private email: UserEmailVo;
    private phone: UserPhoneVo;
    private role: UserRoleVo;

    private constructor(id: UserIdVo, name: UserNameVo, email: UserEmailVo, phone: UserPhoneVo, role: UserRoleVo) {
        super(id);
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    protected when(event: DomainEventRoot): void {
        throw new Error("Method not implemented.");
    }

    protected validateState(): void {
        if(
            !this.Id ||
            !this.name ||
            !this.phone ||
            !this.role ||
            !this.email
        )
        throw new InvalidUserException();
    }

    updateName(name: UserNameVo) {
        this.name = name;
    }

    updateEmail(email: UserEmailVo) {
        this.email = email;
    }

    updatePhone(phone: UserPhoneVo) {
        this.phone = phone;
    }

    updateRole(role: UserRoleVo) {
        this.role = role;
    }

    static create(id: UserIdVo, name: UserNameVo, email: UserEmailVo, phone: UserPhoneVo, role: UserRoleVo): User {
        return new User(id, name, email, phone, role);
    }

    get Name(): UserNameVo {
        return this.name;
    }

    get Email(): UserEmailVo {
        return this.email;
    }

    get Phone(): UserPhoneVo {
        return this.phone;
    }

    get Role(): UserRoleVo {
        return this.role;
    }
}