import { ApiProperty } from '@nestjs/swagger';

export class PostInsightDto {
  @ApiProperty()
  ids: string[];
}
