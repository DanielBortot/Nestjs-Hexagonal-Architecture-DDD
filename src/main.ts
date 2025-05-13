import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/infraestructure';
import { ApplicationExceptionFilter } from './common/infraestructure';
import { InfraestructureExceptionFilter } from './common/infraestructure';
import { NotRegisteredExceptionFilter } from './common/infraestructure';
import { setupSwagger } from './common/infraestructure';
import { setupCors } from './common/infraestructure';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.useGlobalFilters(
    new DomainExceptionFilter(), 
    new ApplicationExceptionFilter(), 
    new InfraestructureExceptionFilter(), 
    new NotRegisteredExceptionFilter()
  );

  setupSwagger(app);

  setupCors(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
