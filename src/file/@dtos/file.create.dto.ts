import { ApiProperty } from '@nestjs/swagger';
import { FileInfoDto } from './file.info.dto';
export class CreateFileDto {
  @ApiProperty()
  owner: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  files: FileInfoDto[];
}
