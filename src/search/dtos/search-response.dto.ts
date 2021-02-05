import { Field, ObjectType } from '@nestjs/graphql';
import { ImageFileWithInsight } from 'src/file/models/image-file-w-insight.model';

@ObjectType()
export class SearchReponseDto {
  @Field(() => [ImageFileWithInsight])
  result: ImageFileWithInsight[];

  @Field(() => [String])
  autocomplete: string[];
}
