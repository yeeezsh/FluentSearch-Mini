import { Inject, Injectable } from '@nestjs/common';
import { FileTypeEnum, ZoneEnum } from 'fluentsearch-types';
import { Model } from 'mongoose';
import { CreateFileDto } from './@dtos/file.create.dto';
import { HTTPFile } from './@interfaces/http-file.interface';
import { FileStoreService } from './file-store.service';
import { FILE_MODEL } from './file.providers';
import { AllFile, AllFileDoc } from './schema/file.schema';

@Injectable()
export class FileService {
  constructor(
    private filesService: FileStoreService,
    @Inject(FILE_MODEL) private readonly fileModel: Model<AllFileDoc>,
  ) {}

  async createFiles(files: HTTPFile[], body: CreateFileDto): Promise<void> {
    for (const file of files) {
      const { width, height } = await this.filesService.getImageResolution(
        file.id,
      );
      const parse: Omit<AllFile, '_id'> = {
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
