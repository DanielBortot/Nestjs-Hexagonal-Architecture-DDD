import { IService } from "src/common/application";
import { UserLoginRequestDto } from "../dto/request/user-login-request.dto";
import { UserLoginResponseDto } from "../dto/response/user-login-response.dto";
import { Result } from "src/common/utils";
import { IOrmUserQueryRepository } from "src/user/application/repositories/query/orm-user-query-repository.interface";
import { ITokenGen } from "../token-gen/token-gen.interface";
import { UserInvalidCredentialsException } from "../exceptions/user-invalid-credentials.exception";
import { Credentials } from "../credentials/credentials.model";
import { UserRoleEnum } from "src/user/domain/enums/role.enum";
import { IEncryptor } from "../encryptor/encryptor.interface";

export class UserLoginService extends IService<
	UserLoginRequestDto,
	UserLoginResponseDto
> {
	constructor(
		private readonly ormUserQueryRepository: IOrmUserQueryRepository,
		private readonly tokenGen: ITokenGen,
		private readonly encryptor: IEncryptor,
	) {
		super();
	}

	public async execute(
		value: UserLoginRequestDto,
	): Promise<Result<UserLoginResponseDto>> {
		const userModel = await this.ormUserQueryRepository.findUserByEmail(
			value.email,
		);

		if (userModel.isError)
			return Result.fail(new UserInvalidCredentialsException());

		const passwordCompared = await this.encryptor.comparePassword(
			value.password,
			userModel.Value.password,
		);

		if (!passwordCompared)
			return Result.fail(new UserInvalidCredentialsException());

		const user = userModel.Value.user;

		const credentials: Credentials = {
			userId: user.Id.Value,
		};

		const token = await this.tokenGen.genToken(credentials);
		const response = new UserLoginResponseDto(
			user.Id.Value,
			user.Name.Value,
			user.Email.Value,
			user.Phone.Value,
			UserRoleEnum[user.Role.Value as keyof typeof UserRoleEnum],
			token,
		);

		return Result.success(response);
	}
}
