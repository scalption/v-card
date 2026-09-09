import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Место работы' })
export class Experience {
  @Field()
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => GraphQLISODateTime, { description: 'Начало работы' })
  startDate: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Окончание работы',
  })
  endDate: Date | null;

  @Field(() => String, {
    nullable: true,
    description: 'Краткое описание зоны ответственности',
  })
  summary: string | null;

  @Field(() => [String], { description: 'Достижения на этой позиции' })
  achievements: string[];
}
