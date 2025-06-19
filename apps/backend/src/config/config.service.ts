import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get databaseUrl(): string {
    return this.get('DATABASE_URL') || 'postgres://postgres:postgres@db:5432/smartshopper';
  }

  get openaiApiKey(): string {
    return this.get('OPENAI_API_KEY');
  }
}
