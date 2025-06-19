import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Setup pgvector extension if needed
    try {
      // Use direct SQL query to enable pgvector extension
      await this.prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS vector;');
      console.log('pgvector extension enabled successfully');
    } catch (error) {
      console.error('Failed to enable pgvector extension:', error);
    }
  }

  async query(sql: string, params: any[] = []) {
    return this.prisma.$queryRawUnsafe(sql, ...params);
  }
}
