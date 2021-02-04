import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { FileTypeEnum, ZoneEnum } from 'fluentsearch-types';
import { Model } from 'mongoose';
import { FileNotExistsException } from '../common/Exception/file-error.exception';
import { CreateFileDto } from './@dtos/file.create.dto';
import { HTTPFile } from './@interfaces/http-file.interface';
import { FileStoreService } from './file-store.service';
import { FILE_MODEL } from './file.providers';
import { AllFile, AllFileDoc } from './schema/file.schema';

@Controller('file')
export class FileController {
  constructor(
    private filesService: FileStoreService,
    @Inject(FILE_MODEL) private readonly fileModel: Model<AllFileDoc>,
  ) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFileDto,
  })
  async upload(
    @UploadedFile('files') files: HTTPFile[],
    @Body() body: CreateFileDto,
  ) {
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
      const doc = await this.fileModel.create(parse);
      Logger.log(doc);
    }
    return;
  }

  @Get('/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new FileNotExistsException();
    }
    res.header('Content-Type', file.contentType);
    res.header(
      'Content-Disposition',
      `name=${file.filename}; filename=${file.filename}`,
    );
    return filestream.pipe(res);
  }

  @Get('/download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);

    if (!filestream) {
      throw new FileNotExistsException();
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Delete('/:id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.filesService.findInfo(id);
    const filestream = await this.filesService.deleteFile(id);
    if (!filestream) {
      throw new FileNotExistsException();
    }
  }
}
