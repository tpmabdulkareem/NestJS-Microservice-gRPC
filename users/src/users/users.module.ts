import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UsersResolver, UsersService, UserRepository, PrismaService],
})
export class UsersModule {}
