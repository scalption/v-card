import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client.js';

function createPrismaOptions() {
  const connectionString = process.env['DATABASE_URL'];

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  return {
    adapter: new PrismaPg({ connectionString }),
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
    ],
  } satisfies Prisma.PrismaClientOptions;
}

@Injectable()
export class PrismaService
  extends PrismaClient<ReturnType<typeof createPrismaOptions>>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super(createPrismaOptions());
  }

  private readonly isDev = process.env.NODE_ENV === 'development';

  async onModuleInit() {
    if (this.isDev) {
      this.$on('query', (event: Prisma.QueryEvent) => {
        this.logger.debug(`${event.query} — ${event.duration}ms`);
      });
    }
    await this.$connect();
  }
}
