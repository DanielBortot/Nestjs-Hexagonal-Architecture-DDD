import { JwtService } from "@nestjs/jwt";
import { Credentials } from "src/auth/application/credentials/credentials.model";
import { ITokenGen } from "src/auth/application/token-gen/token-gen.interface";

export class JwtGen implements ITokenGen {
	constructor(private readonly jwtService: JwtService) {}

	async genToken(value: Credentials): Promise<string> {
		return this.jwtService.signAsync(value);
	}
}
