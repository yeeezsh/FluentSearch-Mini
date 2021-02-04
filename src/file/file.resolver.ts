import { Resolver } from '@nestjs/graphql';
import { ImageFileWithInsight } from './models/image-file-w-insight.model';

@Resolver(() => ImageFileWithInsight)
export class FileResolver {}
