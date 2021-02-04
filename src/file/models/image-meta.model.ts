import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageMeta as ImageMetaType } from 'fluentsearch-types';

@ObjectType()
export class ImageMeta implements ImageMetaType {
  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  dpi: number;
}
