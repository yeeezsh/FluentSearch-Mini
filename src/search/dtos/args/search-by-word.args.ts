import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchByWordArgs {
  @Field()
  word: string;

  @Field()
  userId: string;
}
