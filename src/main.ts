import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { AllExceptionsFilter } from './Custom/Exceptions/HttpException.filter';
import { createDocument } from './Configuration/Swagger';
import { HttpInterceptor } from './Custom/Interceptor/http.interceptor';
console.log(process.env.PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // @AWS s3 bucket to store image credentials here 
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })
  // ~ cookies 
  app.use(cookieParser());

  // app.useGlobalInterceptors(new HttpInterceptor());
  // ~ validation for input fields globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // ~ startpoint prefix for all apis 
  app.setGlobalPrefix('api/v1');

  // @Middleware excepton filter like middleware
  app.useGlobalFilters(new AllExceptionsFilter);
  app.enableCors({
    origin: 'http://localhost:2030',
    credentials: true
  })

  // ~ swagger to show your projects apis in the browser
  SwaggerModule.setup('api', app, createDocument(app));

  // [ . ] listen port and run server
  await app.listen(process.env.PORT);
}
bootstrap();