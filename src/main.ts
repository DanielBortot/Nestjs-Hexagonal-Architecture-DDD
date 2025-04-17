import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/infraestructure/error-filters/domain-exception.filter';
import { ApplicationExceptionFilter } from './common/infraestructure/error-filters/application-exception.filter';
import { InfraestructureExceptionFilter } from './common/infraestructure/error-filters/infraestructure-exception.filter';
import { NotRegisteredExceptionFilter } from './common/infraestructure/error-filters/not-registered-exception.filter';
import { setupSwagger } from './common/infraestructure/framework-config/swagger-config/swagger-config';
import { setupCors } from './common/infraestructure/framework-config/cors-config/cors-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
