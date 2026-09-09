import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('Profile', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 30_000);

  afterAll(async () => {
    await app?.close();
  });

  const gql = (query: string) =>
    request(app.getHttpServer()).post('/graphql').send({ query }).expect(200);

  it('возвращает профиль со всеми вложенными данными', async () => {
    const response = await gql(`
      {
        profile {
          name
          description
          links { label url type }
          skills { name category }
          experiences { company position isCurrent achievements }
          projects { name stack }
        }
      }
    `);

    const { profile } = response.body.data;

    expect(profile.name).toBeTruthy();
    expect(profile.description).toBeTruthy();
    expect(profile.links.length).toBeGreaterThan(0);
    expect(profile.skills.length).toBeGreaterThan(0);
    expect(profile.experiences.length).toBeGreaterThan(0);
    expect(profile.projects.length).toBeGreaterThan(0);

    expect(profile.experiences[0].achievements.length).toBeGreaterThan(0);
    expect(typeof profile.experiences[0].isCurrent).toBe('boolean');
  });

  it('фильтрует навыки по категории', async () => {
    const response = await gql(
      '{ profile { skills(category: DATABASE) { category } } }',
    );
    const { skills } = response.body.data.profile;

    expect(skills.length).toBeGreaterThan(0);
    expect(
      skills.every(
        (skill: { category: string }) => skill.category === 'DATABASE',
      ),
    ).toBe(true);
  });

  it('отдаёт NOT_FOUND для несуществующего профиля', async () => {
    const response = await gql('{ profile(slug: "does-not-exist") { name } }');

    expect(response.body.data).toBeNull();
    expect(response.body.errors[0].extensions.code).toBe('NOT_FOUND');
  });
});
