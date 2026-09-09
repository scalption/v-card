import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaModule } from './prisma.module.js';
import { PrismaService } from './prisma.service.js';
import { seedData } from './seed-data.js';

function parseMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) {
    throw new Error(`Ожидается YYYY-MM`);
  }
  return new Date(Date.UTC(year, month - 1, 1));
}

async function seed(prisma: PrismaService): Promise<void> {
  const { slug, name, headline, description, location, email } = seedData;

  await prisma.$transaction(async (tx) => {
    const profile = await tx.profile.upsert({
      where: { slug },
      create: { slug, name, headline, description, location, email },
      update: { name, headline, description, location, email },
    });

    await Promise.all([
      tx.link.deleteMany({ where: { profileId: profile.id } }),
      tx.skill.deleteMany({ where: { profileId: profile.id } }),
      tx.experience.deleteMany({ where: { profileId: profile.id } }),
      tx.project.deleteMany({ where: { profileId: profile.id } }),
    ]);

    await tx.link.createMany({
      data: seedData.links.map((link, index) => ({
        ...link,
        order: index,
        profileId: profile.id,
      })),
    });

    await tx.skill.createMany({
      data: seedData.skills.map((skill) => ({
        ...skill,
        profileId: profile.id,
      })),
    });

    await tx.experience.createMany({
      data: seedData.experiences.map((experience) => ({
        ...experience,
        startDate: parseMonth(experience.startDate),
        endDate: experience.endDate ? parseMonth(experience.endDate) : null,
        profileId: profile.id,
      })),
    });

    await tx.project.createMany({
      data: seedData.projects.map((project) => ({
        ...project,
        profileId: profile.id,
      })),
    });
  });
}

async function bootstrap(): Promise<void> {
  const context = await NestFactory.createApplicationContext(PrismaModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    await seed(context.get(PrismaService));
    Logger.log(`Добавлен профиль "${seedData.slug}"`, 'Seed');
  } finally {
    await context.close();
  }
}

await bootstrap();
