import { UserRoleEnum } from "src/user/domain/enums/role.enum";

export class UserLoginResponseDto {
    
    constructor(
        public userId: string,
        public name: string,
        public email: string,
        public phone: string,
        public role: UserRoleEnum,
        public token: string
    ) {}
}