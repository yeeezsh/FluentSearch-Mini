import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class QueryImageWithInsightArgs {
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  skip: number;

  @Max(1000)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit: number;

  @Field()
  userId: string;
}
