import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CONFIG_NAMESPACE } from '../src/config/config.constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get<ConfigService>(ConfigService);
    const appConfig = configService.get(CONFIG_NAMESPACE.APP);

    // Set API prefix
    app.setGlobalPrefix(appConfig.apiPrefix);

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
    await app.init();
  });

  it('/ (GET)', () => {
    const appConfig = configService.get(CONFIG_NAMESPACE.APP);
    const prefix = appConfig.apiPrefix;

    return request(app.getHttpServer())
      .get(`/${prefix}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Hello from NestJS API!');
        expect(res.body).toHaveProperty('environment');
        expect(res.body.environment).toBe('test');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
