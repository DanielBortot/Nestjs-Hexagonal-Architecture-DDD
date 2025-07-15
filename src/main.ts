import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	FileLogger,
	setupSwagger,
	setupCors,
	setupFilters,
	setupPipes,
} from './common/infrastructure'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new FileLogger(),
	})

	setupPipes(app)
	setupFilters(app)
	setupSwagger(app)
	setupCors(app)

	await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
