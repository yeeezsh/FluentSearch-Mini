import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BBoxResponseAPI as BBoxResponseApiType } from 'fluentsearch-types';

@ObjectType()
export class BBoxResponseApi implements BBoxResponseApiType {
  @Field(() => Float)
  xmax: number;

  @Field(() => Float)
  ymax: number;

  @Field(() => Float)
  ymin: number;

  @Field(() => Float)
  xmin: number;
}
