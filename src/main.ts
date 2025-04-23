import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Thera Teste BackEnd')
  .setDescription('API RESTful para gerenciamento de pedidos de produtos, com foco em boas práticas (SOLID), orgnização de código em classes, e manipulação de banco de dados.')
  .setVersion('1.0.0')
  .build()

  const swaggerDocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocumentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
