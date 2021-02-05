import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  InsightSchema as InsightSchemaType,
  LanguageEnum,
  ModelEnum,
} from 'fluentsearch-types';
import { BBoxResponseApi } from './bbox.model';

registerEnumType(ModelEnum, {
  name: 'ModelEnum',
});

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
});

@ObjectType()
export class Insight implements InsightSchemaType {
  @Field()
  _id: string;

  @Field()
  fileId: string;

  @Field()
  label: string;

  @Field()
  result: string;

  @Field(() => ModelEnum)
  model: ModelEnum;

  @Field(() => BBoxResponseApi)
  bbox?: BBoxResponseApi | undefined;

  @Field(() => Int)
  prob: number;

  @Field(() => LanguageEnum)
  lang: LanguageEnum;

  @Field()
  createAt: Date;

  @Field()
  updateAt: Date;
}
