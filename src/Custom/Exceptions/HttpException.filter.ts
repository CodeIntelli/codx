import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
// [ + ] generate all type http exception is here
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const allResponse = exception.getResponse()
        response
            .json({
                statusCode: status,
                response: allResponse,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}