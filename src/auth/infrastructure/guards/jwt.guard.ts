import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import {
	InfrastructureException,
	InfrastructureExceptionType,
} from "src/common/infrastructure";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
		status?: any,
	): TUser {
		if (err || !user)
			throw new InfrastructureException(
				"Access denied",
				InfrastructureExceptionType.FORBIDDEN,
			);

		const request = context.switchToHttp().getRequest();
		request.user = user;
		return user;
	}
}
