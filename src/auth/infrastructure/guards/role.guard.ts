import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";
import { Observable } from "rxjs";
import { PgDatabaseSingleton } from "src/common/infrastructure";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";
import { OrmUserQueryRepository } from "src/user/infrastructure/repositories/orm-repository/query/orm-user-query.repository";

export const RoleAuthGuard = (roles: UserRoleEnum[]) => {
    @Injectable()
    class RoleGuard implements CanActivate {
        //! fix with providers
        repository: OrmUserQueryRepository = new OrmUserQueryRepository(PgDatabaseSingleton.getInstance());

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            const userId = request.user?.userId;
            if (!userId) return false;

            return this.repository.findUserById(userId).then(userModel => {
                if (userModel.isError) return false;
                const user = userModel.Value.user;
                if (!roles.includes(UserRoleEnum[user.Role.Value])) return false;
                return true;
            });
        }
    }
    return mixin(RoleGuard);
}