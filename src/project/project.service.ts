import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Project } from './models/project.model.js';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(profileId: string, featuredOnly = false): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { profileId, ...(featuredOnly ? { featured: true } : {}) },
      orderBy: [
        { featured: 'desc' },
        { year: { sort: 'desc', nulls: 'last' } },
        { name: 'asc' },
      ],
    });
  }
}
