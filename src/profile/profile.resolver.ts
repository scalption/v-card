import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceService } from '../experience/experience.service.js';
import { Experience } from '../experience/models/experience.model.js';
import { SkillCategory } from '../generated/prisma/enums.js';
import { LinkService } from '../link/link.service.js';
import { Link } from '../link/models/link.model.js';
import { Project } from '../project/models/project.model.js';
import { ProjectService } from '../project/project.service.js';
import { Skill } from '../skill/models/skill.model.js';
import { SkillService } from '../skill/skill.service.js';
import { Profile } from './models/profile.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly linkService: LinkService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => Profile, {
    description: 'Без аргумента возвращает единственный профиль в базе',
  })
  profile(
    @Args('slug', { nullable: true, description: 'Идентификатор профиля' })
    slug?: string,
  ): Promise<Profile> {
    return this.profileService.findOne(slug) as Promise<Profile>;
  }

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile): Promise<Link[]> {
    return this.linkService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Skill])
  skills(
    @Parent() profile: Profile,
    @Args('category', { type: () => SkillCategory, nullable: true })
    category?: SkillCategory,
  ): Promise<Skill[]> {
    return this.skillService.findByProfileId(profile.id, category);
  }

  @ResolveField(() => [Experience])
  experiences(@Parent() profile: Profile): Promise<Experience[]> {
    return this.experienceService.findByProfileId(profile.id);
  }

  @ResolveField(() => [Project])
  projects(
    @Parent() profile: Profile,
    @Args('featuredOnly', { nullable: true, defaultValue: false })
    featuredOnly?: boolean,
  ): Promise<Project[]> {
    return this.projectService.findByProfileId(profile.id, featuredOnly);
  }
}
