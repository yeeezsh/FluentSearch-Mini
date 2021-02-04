import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseFileMetaSchema,
  BBoxResponseApi as BBoxResponseApiType,
  FileTypeEnum,
  FileWithInsightDto,
  ImageMeta as ImageMetaType,
  LanguageEnum,
  ModelEnum,
  ZoneEnum,
} from 'fluentsearch-types';
import { BBoxResponseApi } from './bbox.model';
import { ImageMeta } from './image-meta.model';

registerEnumType(FileTypeEnum, {
  name: 'FileTypeEnum',
});

registerEnumType(ModelEnum, {
  name: 'ModelEnum',
});

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
});
registerEnumType(ZoneEnum, {
  name: 'ZoneEnum',
});

@ObjectType()
export class ImageFileWithInsight
  implements FileWithInsightDto<FileTypeEnum.Image, ImageMetaType> {
  @Field(() => String)
  _id: string;

  @Field(() => ImageMeta)
  meta: BaseFileMetaSchema<ImageMetaType>;

  @Field(() => String)
  owner: string;

  @Field(() => ZoneEnum)
  zone: ZoneEnum;

  @Field(() => String)
  label: string;

  @Field(() => FileTypeEnum)
  type: FileTypeEnum.Image;

  @Field(() => String)
  createAt: Date;

  @Field(() => String)
  updateAt: Date;

  @Field(() => String)
  result: string;

  @Field(() => ModelEnum)
  model: ModelEnum;

  @Field(() => BBoxResponseApi, { nullable: true })
  bbox?: BBoxResponseApiType | undefined;

  @Field(() => Int)
  prob: number;

  @Field(() => LanguageEnum)
  lang: LanguageEnum;

  @Field(() => String)
  uri: string;
}
