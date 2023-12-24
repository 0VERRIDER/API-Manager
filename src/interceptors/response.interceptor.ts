import { CallHandler, ExecutionContext, NestInterceptor, Injectable, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(res => ({
                    data: res.data,
                    message: res.message,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    status: 'success',
                })),
                catchError(err => {
                    const statusCode = err.statusCode || 500;
                    const message = err.message || 'Internal server error';
                    
                    throw new HttpException({
                        statusCode,
                        message,
                        status: 'error',
                    }, statusCode);
                }),
            );
    }
}