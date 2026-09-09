import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SkillCategory } from '../generated/prisma/enums.js';
import { Skill } from './models/skill.model.js';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileId(
    profileId: string,
    category?: SkillCategory,
  ): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { profileId, ...(category ? { category } : {}) },
      orderBy: [{ level: 'desc' }, { name: 'asc' }],
    });
  }
}
