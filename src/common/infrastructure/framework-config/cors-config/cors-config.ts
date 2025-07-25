import { INestApplication } from "@nestjs/common";

export const setupCors = (app: INestApplication) => {
	app.enableCors({ origin: "*" });
};
