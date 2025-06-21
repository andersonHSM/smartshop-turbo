import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONFIG_NAMESPACE } from '../../config/config.constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    constructor(private configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const appConfig = this.configService.get(CONFIG_NAMESPACE.APP);
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();

        // Only log in development or if log level is debug
        if (appConfig.nodeEnv === 'development' || appConfig.logLevel === 'debug') {
            this.logger.log(`Request: ${method} ${url}`);
        }

        return next.handle().pipe(
            tap(() => {
                if (appConfig.nodeEnv === 'development' || appConfig.logLevel === 'debug') {
                    this.logger.log(`Response: ${method} ${url} - ${Date.now() - now}ms`);
                }
            }),
        );
    }
}
