import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseFileMetaSchema,
  FileTypeEnum,
  FileWithInsightDto,
  ImageMeta as ImageMetaType,
  InsightSchema,
  LanguageEnum,
  ModelEnum,
  ZoneEnum,
} from 'fluentsearch-types';
import { ImageMeta } from './image-meta.model';
import { Insight } from './insight.model';

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
  @Field()
  _id: string;

  @Field(() => ImageMeta)
  meta: BaseFileMetaSchema<ImageMetaType>;

  @Field()
  owner: string;

  @Field(() => ZoneEnum)
  zone: ZoneEnum;
  @Field()
  label: string;

  @Field()
  type: FileTypeEnum.Image;

  @Field()
  createAt: Date;

  @Field()
  updateAt: Date;

  @Field()
  uri: string;

  @Field(() => [Insight], { nullable: true })
  insight?: InsightSchema[] | undefined;
}
