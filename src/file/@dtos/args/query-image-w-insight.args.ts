import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class QueryImageWithInsightArgs {
  @Min(0)
  @Field(() => Int, { nullable: true })
  skip = 0;

  @Max(1000)
  @Field(() => Int, { nullable: true })
  limit = 1000;

  @Field()
  userId: string;
}
