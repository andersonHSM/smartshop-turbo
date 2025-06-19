import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'SmartShopper API',
      description: 'AI-powered semantic product search API',
      version: '1.0.0',
      documentation: '/api',
    };
  }
}
