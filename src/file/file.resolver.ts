import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryImageWithInsightArgs } from './@dtos/args/query-image-w-insight.args';
import { FileService } from './file.service';
import { ImageFileWithInsight } from './models/image-file-w-insight.model';

@Resolver(() => ImageFileWithInsight)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [ImageFileWithInsight])
  async getFilesWithInsight(
    @Args() args: QueryImageWithInsightArgs,
  ): Promise<ImageFileWithInsight[]> {
    const { userId, skip, limit } = args;
    return this.fileService.getFilesWithInsight(userId, skip, limit);
  }
}
