import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONFIG_NAMESPACE } from './config/config.constants';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Get configuration service
    const configService = app.get(ConfigService);
    const appConfig = configService.get(CONFIG_NAMESPACE.APP);
    const corsConfig = configService.get(CONFIG_NAMESPACE.CORS);

    // Enable CORS
    if (corsConfig.enabled) {
        app.enableCors({
            origin: corsConfig.origin,
            credentials: true,
        });
    }

    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Global interceptors
    app.useGlobalInterceptors(new LoggingInterceptor(configService));

    // API prefix
    app.setGlobalPrefix(appConfig.apiPrefix);

    // Swagger API documentation
    const config = new DocumentBuilder()
        .setTitle('Backend API')
        .setDescription('The backend API description')
        .setVersion(appConfig.apiVersion)
        .addTag('api')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document, { swaggerOptions: { persistAuthorization: true } });

    // Start the server
    const port = appConfig.port;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}/${appConfig.apiPrefix}`);
    console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
    console.log(`Environment: ${appConfig.nodeEnv}`);
}

void bootstrap().catch(console.error);
