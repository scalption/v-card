import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceService } from './experience.service.js';
import { Experience } from './models/experience.model.js';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @ResolveField(() => Boolean, {
    description: 'Работаю ли здесь по настоящее время',
  })
  isCurrent(@Parent() experience: Experience): boolean {
    return this.experienceService.isCurrent(experience);
  }
}
