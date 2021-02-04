import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';

@Injectable()
export class InsightService {
  constructor(private readonly fileService: FileService) {}
}
