import { ValueObjectRoot } from "src/common/domain";
import { InvalidUserEmailException } from "../domain-exceptions/invalid-user-email.exception";

export class UserEmailVo extends ValueObjectRoot<UserEmailVo> {

    private readonly email: string

    private constructor(email:string){
        super();
        const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (!regex.test(email)) throw new InvalidUserEmailException(email);
        this.email=email
    }

    equals(valueObject: UserEmailVo): boolean {
        if (this.Value===valueObject.Value) return true
        return false
    }

    static create ( email: string ): UserEmailVo {        
        return new UserEmailVo( email )
    }

    get Value(): string { 
        return this.email 
    }

}