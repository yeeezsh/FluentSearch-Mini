import { Inject, Injectable } from '@nestjs/common';
import { FileTypeEnum, ZoneEnum } from 'fluentsearch-types';
import { Model } from 'mongoose';
import filePathJoin from 'src/common/utils/file-path-join';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';
import { CreateFileDto } from './@dtos/file.create.dto';
import { HTTPFile } from './@interfaces/http-file.interface';
import { FileStoreService } from './file-store.service';
import { FILE_MODEL } from './file.providers';
import { ImageFileWithInsight } from './models/image-file-w-insight.model';
import { AllFile, AllFileDoc } from './schema/file.schema';

@Injectable()
export class FileService {
  constructor(
    private filesService: FileStoreService,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
    @Inject(FILE_MODEL) private readonly fileModel: Model<AllFileDoc>,
  ) {}

  async getFilesWithInsight(
    userId: string,
    limit = 100,
    skip = 0,
  ): Promise<ImageFileWithInsight[]> {
    const files = await this.fileModel
      .find({ owner: userId })
      .skip(skip)
      .limit(limit);
    const mapped: ImageFileWithInsight[] = files.map((file: AllFile) => {
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
        insight: [],

        createAt: file.createAt,
        updateAt: file.updateAt,
        uri: filePathJoin(
          this.appConfig.hostname,
          file._id,
          this.appConfig.port,
        ),
      };
    });

    return mapped;
  }

  async createFiles(files: HTTPFile[], body: CreateFileDto): Promise<void> {
    for (const file of files) {
      const { width, height } = await this.filesService.getImageResolution(
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
