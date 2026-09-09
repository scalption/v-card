import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { SkillCategory } from '../../generated/prisma/enums.js';

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
  description: 'Категория навыка',
});

@ObjectType({ description: 'Профессиональный навык' })
export class Skill {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => SkillCategory)
  category: SkillCategory;

  @Field(() => Int, {
    nullable: true,
    description: 'Уровень владения от 1 до 5 или Null если оценка неприменима',
  })
  level: number | null;
}
