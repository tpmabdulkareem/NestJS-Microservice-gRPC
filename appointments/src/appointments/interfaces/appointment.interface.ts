export interface Appointment {
  id: string;
  appointmentTime: Date;
  type: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentWithUser extends Appointment {
  user: User;
}

import { User } from './user.interface';
