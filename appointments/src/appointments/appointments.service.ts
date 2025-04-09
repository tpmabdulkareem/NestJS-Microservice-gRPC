import {
  Injectable,
  NotFoundException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { AppointmentRepository } from './repositories/appointment.repository';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { AppointmentWithUser } from './interfaces/appointment.interface'; // Keep this if needed elsewhere
import { Appointment } from './entities/appointment.entity'; // Import the entity instead

interface UserService {
  getUser(data: { id: string }): Observable<User>;
}

@Injectable()
export class AppointmentsService implements OnModuleInit {
  private userService: UserService;

  constructor(
    private appointmentRepository: AppointmentRepository,
    @Inject('USERS_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }
  async create(
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    // Use the Appointment entity type here
    return this.appointmentRepository.create(createAppointmentInput);
  }

  async findAll(): Promise<AppointmentWithUser[]> {
    const appointments = await this.appointmentRepository.findAll();
    return Promise.all(
      appointments.map(async (appointment: Appointment) => {
        const user = await firstValueFrom(
          this.userService.getUser({ id: appointment?.userId }),
        );
        return { ...appointment, user };
      }),
    );
  }

  async findOne(id: string): Promise<AppointmentWithUser> {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    const user = await firstValueFrom(
      this.userService.getUser({ id: appointment.userId }),
    );
    return { ...appointment, user };
  }
}
