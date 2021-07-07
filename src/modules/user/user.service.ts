import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { UserRepository } from '../../shared/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository (User) private readonly userRepository: UserRepository
  ){}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
