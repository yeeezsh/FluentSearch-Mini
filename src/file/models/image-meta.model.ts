import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseFileMetaSchema,
  FileExtensionEnum,
  ImageMeta as ImageMetaType,
} from 'fluentsearch-types';

registerEnumType(FileExtensionEnum, {
  name: 'FileExtensionEnum',
});

@ObjectType()
export class ImageMeta implements BaseFileMetaSchema<ImageMetaType> {
  @Field(() => Int)
  size: number;

  @Field()
  filename: string;

  @Field(() => FileExtensionEnum)
  extension: FileExtensionEnum;

  @Field()
  contentType: string;

  @Field(() => String, { nullable: true })
  sha1?: string | undefined;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  dpi: number;
}
