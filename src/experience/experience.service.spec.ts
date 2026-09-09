import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExperienceService } from './experience.service.js';
import type { Experience } from './models/experience.model.js';

describe('ExperienceService', () => {
  const prismaMock = { experience: { findMany: vi.fn() } };
  let service: ExperienceService;

  beforeEach(async () => {
    vi.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ExperienceService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = moduleRef.get(ExperienceService);
  });

  it('сортирует места работы от новых к старым', async () => {
    prismaMock.experience.findMany.mockResolvedValue([]);

    await service.findByProfileId('p1');

    expect(prismaMock.experience.findMany).toHaveBeenCalledWith({
      where: { profileId: 'p1' },
      orderBy: { startDate: 'desc' },
    });
  });

  it('считает работу текущей если дата окончания не указана', () => {
    expect(service.isCurrent({ endDate: null } as Experience)).toBe(true);
    expect(service.isCurrent({ endDate: new Date() } as Experience)).toBe(
      false,
    );
  });
});
