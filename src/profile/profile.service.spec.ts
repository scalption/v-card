import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  const prismaMock = {
    profile: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
  };

  let service: ProfileService;

  beforeEach(async () => {
    vi.resetAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(ProfileService);
  });

  it('ищет профиль по slug когда он передан', async () => {
    const profile = { id: 'p1', slug: 'ogol-vladimir' };
    prismaMock.profile.findUnique.mockResolvedValue(profile);

    await expect(service.findOne('ogol-vladimir')).resolves.toBe(profile);
    expect(prismaMock.profile.findUnique).toHaveBeenCalledWith({
      where: { slug: 'ogol-vladimir' },
    });
    expect(prismaMock.profile.findFirst).not.toHaveBeenCalled();
  });

  it('без slug возвращает единственный профиль', async () => {
    const profile = { id: 'p1', slug: 'ogol-vladimir' };
    prismaMock.profile.findFirst.mockResolvedValue(profile);

    await expect(service.findOne()).resolves.toBe(profile);
    expect(prismaMock.profile.findFirst).toHaveBeenCalled();
  });

  it('бросает NotFoundException если профиля нет', async () => {
    prismaMock.profile.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
