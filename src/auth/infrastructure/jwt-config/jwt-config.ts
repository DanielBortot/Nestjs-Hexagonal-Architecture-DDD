import { JwtModule } from "@nestjs/jwt";

export const setupJwt = JwtModule.register({
	secret: "secret",
	signOptions: { expiresIn: "8h" },
});
