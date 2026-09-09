import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlExceptionFilter } from './common/graphql-exception.filter.js';
import { join } from 'node:path';
import { ExperienceModule } from './experience/experience.module.js';
import { LinkModule } from './link/link.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { ProjectModule } from './project/project.module.js';
import { SkillModule } from './skill/skill.module.js';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        process.env.NODE_ENV === 'production'
          ? true
          : join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: false,
      graphiql: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    ProfileModule,
    LinkModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: GraphqlExceptionFilter }],
})
export class AppModule {}
