import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryImageWithInsightArgs } from './@dtos/args/query-image-w-insight.args';
import { ImageFileWithInsight } from './models/image-file-w-insight.model';

@Resolver(() => ImageFileWithInsight)
export class FileResolver {
  @Query(() => [ImageFileWithInsight])
  async getFilesWithInsight(@Args() args: QueryImageWithInsightArgs) {
    return;
  }
}
