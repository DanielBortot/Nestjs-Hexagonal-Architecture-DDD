import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DomainExceptionFilter,
  FileLogger,
  setupSwagger,
  setupCors,
  ApplicationExceptionFilter,
  InfraestructureExceptionFilter,
  NotRegisteredExceptionFilter,
} from './common/infraestructure';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new FileLogger()
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new ApplicationExceptionFilter(),
    new InfraestructureExceptionFilter(),
    new NotRegisteredExceptionFilter(),
  );

  setupSwagger(app);

  setupCors(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
