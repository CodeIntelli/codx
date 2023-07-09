import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { AllExceptionsFilter } from './Custom/Exceptions/HttpException.filter';
import { createDocument } from './Configuration/Swagger';
import { HttpInterceptor } from './Custom/Interceptor/http.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })
  app.use(cookieParser());
  // app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/v1');
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors({
    origin: 'http://localhost:2030',
    credentials: true
  })
  SwaggerModule.setup('api', app, createDocument(app));
  await app.listen(2030);
}
bootstrap();



