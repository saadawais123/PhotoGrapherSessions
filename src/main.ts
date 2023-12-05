import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle('PhotographerSessions').setVersion('1.0').addTag('api').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.info(`Server running on ${await app.getUrl()}`);
}
bootstrap();
