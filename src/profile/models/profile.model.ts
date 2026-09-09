import { Field, ObjectType } from '@nestjs/graphql';
import { Experience } from '../../experience/models/experience.model.js';
import { Link } from '../../link/models/link.model.js';
import { Project } from '../../project/models/project.model.js';
import { Skill } from '../../skill/models/skill.model.js';

@ObjectType({ description: 'Профиль специалиста' })
export class Profile {
  @Field()
  id: string;

  @Field({ description: 'Читаемый идентификатор профиля' })
  slug: string;

  @Field()
  name: string;

  @Field({ description: 'Например "Backend-разработчик"' })
  headline: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  location: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => [Link])
  links: Link[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experiences: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
