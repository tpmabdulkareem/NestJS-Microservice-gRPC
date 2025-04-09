// export class CreateAppointmentInput {}
import { InputType, Field } from '@nestjs/graphql';
import { appointmentType } from '@prisma/client';

@InputType()
export class CreateAppointmentInput {
  @Field()
  userId: string;

  @Field()
  type: appointmentType;

  @Field()
  appointmentTime: Date;
}
