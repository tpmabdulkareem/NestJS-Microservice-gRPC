import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './entities/appointment.entity';
import { AppointmentWithUser } from './interfaces/appointment.interface';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  async appointments(): Promise<AppointmentWithUser[]> {
    const appointments = await this.appointmentsService.findAll();
    return appointments;
  }

  @Query(() => Appointment)
  async appointment(@Args('id') id: string): Promise<AppointmentWithUser> {
    return this.appointmentsService.findOne(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentInput);
  }
}
