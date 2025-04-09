import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { CreateAppointmentInput } from '../dto/create-appointment.input';

@Injectable()
export class AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createAppointmentDto: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Appointment[] | []> {
    return this.prisma.appointment.findMany({});
  }

  async findOne(id: string): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({
      where: { id },
    });
  }
}
