import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Profile } from './models/profile.model.js';

type ProfileRow = Omit<
  Profile,
  'links' | 'skills' | 'experiences' | 'projects'
>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(slug?: string): Promise<ProfileRow> {
    const profile = slug
      ? await this.prisma.profile.findUnique({ where: { slug } })
      : await this.prisma.profile.findFirst({ orderBy: { createdAt: 'asc' } });

    if (!profile) {
      throw new NotFoundException(
        slug
          ? `Профиль "${slug}" не найден`
          : 'Не найден ни один профиль в базе',
      );
    }

    return profile;
  }
}
