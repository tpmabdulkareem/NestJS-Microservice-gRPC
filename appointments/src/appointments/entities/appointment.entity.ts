// export class Appointment {}

import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { appointmentType } from '@prisma/client';
import { User } from './user.entity';

registerEnumType(appointmentType, {
  name: 'appointmentType',
});

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: string;

  @Field(() => appointmentType)
  type: appointmentType;

  @Field()
  userId: string;

  @Field(() => User)
  user?: User;

  @Field()
  appointmentTime: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
