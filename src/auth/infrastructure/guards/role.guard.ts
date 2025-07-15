import {
	CanActivate,
	ExecutionContext,
	Injectable,
	mixin,
} from "@nestjs/common";
import { Observable } from "rxjs";
import {
	InfrastructureException,
	InfrastructureExceptionType,
	PgDatabaseSingleton,
} from "src/common/infrastructure";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";
import { OrmUserQueryRepository } from "src/user/infrastructure/repositories/orm-repository/query/orm-user-query.repository";
import { AccessDeniedException } from "../exceptions/access-denied.exception";

export const RoleAuthGuard = (roles: UserRoleEnum[]) => {
	@Injectable()
	class RoleGuard implements CanActivate {
		repository: OrmUserQueryRepository = new OrmUserQueryRepository(
			PgDatabaseSingleton.getInstance(),
		);

		canActivate(
			context: ExecutionContext,
		): boolean | Promise<boolean> | Observable<boolean> {
			const request = context.switchToHttp().getRequest();
			const userId: string = request.user?.userId;

			if (!userId) throw new AccessDeniedException();

			return this.repository.findUserById(userId).then((userModel) => {
				if (userModel.isError) throw new AccessDeniedException();
				const user = userModel.Value.user;
				if (!roles.includes(UserRoleEnum[user.Role.Value]))
					throw new AccessDeniedException();
				return true;
			});
		}
	}
	return mixin(RoleGuard);
};
