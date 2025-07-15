import { INestApplication, ValidationPipe } from "@nestjs/common";

export const setupPipes = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
}