import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { Model } from 'mongoose';
import { FileNotExistsException } from '../common/exceptions/file-error.exception';
import { CreateFileDto } from './@dtos/file.create.dto';
import { HTTPFile } from './@interfaces/http-file.interface';
import { FileStoreService } from './file-store.service';
import { FILE_MODEL } from './file.providers';
import { FileService } from './file.service';
import { AllFileDoc } from './schema/file.schema';

@Controller('file')
export class FileController {
  constructor(
    private fileStore: FileStoreService,
    private fileService: FileService,
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
    return this.fileService.createFiles(files, body);
  }

  @Get('/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileStore.findInfo(id);
    const filestream = await this.fileStore.readStream(id);
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
    const file = await this.fileStore.findInfo(id);
    const filestream = await this.fileStore.readStream(id);

    if (!filestream) {
      throw new FileNotExistsException();
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Delete('/:id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.fileStore.findInfo(id);
    const filestream = await this.fileStore.deleteFile(id);
    if (!filestream) {
      throw new FileNotExistsException();
    }
  }
}
