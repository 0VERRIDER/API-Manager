import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import * as process from 'process';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: +process.env.SESSION_COOKIE_MAX_AGE },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
  
}



bootstrap();
