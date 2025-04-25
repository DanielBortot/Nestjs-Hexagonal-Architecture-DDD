import { User } from "src/user/domain/aggregate/user.aggregate"

export type UserModel = {
    user: User;
    password: string;
} 