import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BBoxResponseAPI as BBoxResponseApiType } from 'fluentsearch-types';

@ObjectType()
export class BBoxResponseApi implements BBoxResponseApiType {
  @Field(() => Int)
  xmax: number;

  @Field(() => Int)
  ymax: number;

  @Field(() => Int)
  ymin: number;

  @Field(() => Int)
  xmin: number;
}
