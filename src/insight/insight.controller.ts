import { Body, Controller, Post } from '@nestjs/common';
import { PostInsightDto } from './dtos/post-insight.dto';
import { InsightService } from './insight.service';

@Controller('insight')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Post('/')
  async predict(@Body() { ids }: PostInsightDto) {
    return this.insightService.predict(ids);
  }
}
