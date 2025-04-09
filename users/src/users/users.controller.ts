import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { UserRepository } from './repositories/user.repository';

// interface GetUserRequest {
//   id: string;
// }

// interface GetUserResponse {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

@Controller()
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: { id: string }) {
    const user = await this.userRepository.findOne(data?.id);
    // Check if the user object exists and has an id properties
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }
}
