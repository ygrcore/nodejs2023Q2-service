import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yamljs from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document: OpenAPIObject = yamljs.load('./doc/api.yaml');
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT') || 4000;

  await app.listen(PORT);

  console.log(`Server started on PORT: ${PORT}`);
}
bootstrap();
