import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:5173',
    credentials: true,
  });
*/

  app.enableCors({
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'x-client-key',
      'x-client-token',
      'x-client-secret',
      'Authorization',
    ],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      name: 'frontend_vision',
      secret: 'HelloWorld_Strongest',
      resave: false,
      saveUninitialized: false,

      cookie: { maxAge: 86400000, httpOnly: true },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
