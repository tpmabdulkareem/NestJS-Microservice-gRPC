import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  phone?: string;
}
