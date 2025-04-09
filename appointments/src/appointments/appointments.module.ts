import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: 'src/protos/users.proto',
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [
    AppointmentsResolver,
    AppointmentsService,
    AppointmentRepository,
    PrismaService,
  ],
})
export class AppointmentsModule {}
