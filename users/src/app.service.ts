import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getUser(id: string) {
    return {
      id,
      name: 'John Doe',
      email: 'john@mail.com',
      phone: '0123456789',
    };
  }
}
