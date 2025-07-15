import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Credentials } from "src/auth/application/credentials/credentials.model";

type Payload = {
	userId: string;
	iat: number;
	exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "secret",
		});
	}

	validate(payload: Payload): Credentials {
		return { userId: payload.userId };
	}
}
