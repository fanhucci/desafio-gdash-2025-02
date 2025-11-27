import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          
      forbidNonWhitelisted: false, 
      transform: true,          
    }),
  );

  app.enableCors({
    origin:"*"
  })

  const config = new DocumentBuilder()
    .setTitle('Clima')
    .setDescription('API clima')
    .setVersion('1.0')
    .addBearerAuth({
      type:"http",
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"JWT",
      description:"Digite o token de acesso.",
      in:"header"
    },"acess-token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
