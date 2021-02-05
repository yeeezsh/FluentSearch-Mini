import { Inject, Injectable } from '@nestjs/common';
import { FileTypeEnum, InsightInfoDto, ZoneEnum } from 'fluentsearch-types';
import { Model } from 'mongoose';
import filePathJoin from 'src/common/utils/file-path-join';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';
import { INSIGHT_MODEL } from 'src/insight/insight.providers';
import { InsightDoc } from 'src/insight/schema/insight.schema';
import { CreateFileDto } from './@dtos/file.create.dto';
import { HTTPFile } from './@interfaces/http-file.interface';
import { FileStoreService } from './file-store.service';
import { FILE_MODEL } from './file.providers';
import { ImageFileWithInsight } from './models/image-file-w-insight.model';
import { AllFile, AllFileDoc } from './schema/file.schema';

@Injectable()
export class FileService {
  constructor(
    private filesStoreService: FileStoreService,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
    @Inject(FILE_MODEL) private readonly fileModel: Model<AllFileDoc>,
    @Inject(INSIGHT_MODEL) private readonly insightModel: Model<InsightDoc>,
  ) {}

  async getFilesWithInsight(
    userId: string,
    skip = 0,
    limit = 100,
  ): Promise<ImageFileWithInsight[]> {
    const files = ((await this.fileModel
      .find({ owner: userId })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit)) as unknown) as AllFile[];

    const mappedQuery = files.map(async (file: AllFile) => {
      const insights = ((await this.insightModel.find({
        fileId: file._id,
      })) as unknown) as InsightInfoDto[];

      console.log(insights, file._id);
      return {
        _id: file._id,
        label: file.label,
        owner: file.owner,
        meta: {
          size: file.meta.size,
          filename: file.label,
          extension: file.meta.extension,
          contentType: file.meta.contentType,
          width: file.meta.width,
          height: file.meta.height,
          dpi: 72,
        },
        zone: file.zone,
        type: FileTypeEnum.Image,
        insight: insights,

        createAt: file.createAt,
        updateAt: file.updateAt,
        uri: filePathJoin(
          this.appConfig.hostname,
          file._id,
          this.appConfig.port,
        ),
      } as ImageFileWithInsight;
    });

    const mapped = (await Promise.all(mappedQuery)) as ImageFileWithInsight[];

    return mapped;
  }

  async createFiles(files: HTTPFile[], body: CreateFileDto): Promise<void> {
    for (const file of files) {
      const { width, height } = await this.filesStoreService.getImageResolution(
        file.id,
      );
      const parse: AllFile = {
        _id: file.id,
        owner: body.owner,
        meta: {
          size: file.size,
          filename: file.filename,
          extension: (file.filename.split('.').pop() as any) || '',
          contentType: file.contentType,
          width,
          height,
          dpi: 72,
        },
        zone: ZoneEnum.TH,
        label: file.filename,
        type: FileTypeEnum.Image,
        createAt: new Date(),
        updateAt: new Date(),
      };

      await this.fileModel.create(parse);
    }
  }
}
