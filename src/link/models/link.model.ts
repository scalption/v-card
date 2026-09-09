import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { LinkType } from '../../generated/prisma/enums.js';

registerEnumType(LinkType, {
  name: 'LinkType',
  description: 'Тип внешнего ресурса',
});

@ObjectType({ description: 'Ссылка на внешний ресурс' })
export class Link {
  @Field()
  id: string;

  @Field({ description: 'Подпись для отображения' })
  label: string;

  @Field()
  url: string;

  @Field(() => LinkType)
  type: LinkType;

  @Field(() => Int, { description: 'Порядок вывода в списке' })
  order: number;
}
