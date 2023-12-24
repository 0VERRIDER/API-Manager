import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity'; // 👈 import entity

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}});
  }

  create(createUserDto: CreateUserDto): Promise<User> { 
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save({id, ...updateUserDto});
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
}
}