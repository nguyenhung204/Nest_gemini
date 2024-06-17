import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateConfig } from './config/validate.config';
import * as express from 'express';
import * as compression from 'compression';
import { env } from './config/env.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
declare const module: any;


function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Gemini example')
    .setDescription('The Gemini API description')
    .setVersion('1.0')
    .addTag('google gemini')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(validateConfig);
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  setupSwagger(app);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport : Transport.TCP,
  //   options: {
  //     port : env().PORT
  // }});
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // await app.startAllMicroservices();
  app.listen(env().PORT);
}
bootstrap();


