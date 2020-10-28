import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  app.use(cookieParser()); //todo use midleware module
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.enableCors(corsOptions);
  const options = new DocumentBuilder()
  .setTitle('Nest.js Fundamentals Final Project Docs')
  .setDescription('Nest.js Fundamentals Final Project Docs ^_^')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
