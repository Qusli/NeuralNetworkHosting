import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const host = process.env.SERVER_HOST || "localhost"
const port = parseInt(process.env.SERVER_PORT) || 3000

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true
  })

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('NNH Example')
    .setDescription('The NNH API description')
    .setVersion('1.0')
    .addTag('nnh')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, host, () => {
    const logger = new Logger()
    logger.log(`Server start: http://${host}:${port}`)
  });
}

bootstrap();
