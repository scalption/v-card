import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module.js';
import { LinkModule } from '../link/link.module.js';
import { ProjectModule } from '../project/project.module.js';
import { SkillModule } from '../skill/skill.module.js';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';

@Module({
  imports: [LinkModule, SkillModule, ExperienceModule, ProjectModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
