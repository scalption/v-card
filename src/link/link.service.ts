import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Link } from './models/link.model.js';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: string): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { order: 'asc' },
    });
  }
}
