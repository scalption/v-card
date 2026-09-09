import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Проект из портфолио' })
export class Project {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на репозиторий',
  })
  repoUrl: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на демо',
  })
  liveUrl: string | null;

  @Field(() => [String], { description: 'Использованные технологии' })
  stack: string[];

  @Field({ description: 'Закреплён ли проект в начале списка' })
  featured: boolean;

  @Field(() => Int, { nullable: true, description: 'Год реализации' })
  year: number | null;
}
