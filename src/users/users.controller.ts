import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { USER_STRINGS } from '../configs/string.constants';
import { ErrorDataType, ResponseDataType } from '../types/response.type';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDataType<User>> {
    const createdUser = await this.usersService.create(createUserDto);

    if (createdUser) {
      return {
        message: USER_STRINGS.USER_CREATED,
        data: createdUser
      };
    } else {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.USER_CREATED_ERROR,
        status: 'error'
      };

      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ResponseDataType<User[]>> {
    const users = await this.usersService.findAll();

    if (users.length > 0) {
      return {
        message: USER_STRINGS.NO_USERS_FOUND,
        data: users
      };
    } else {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.NO_USERS_FOUND,
        status: 'error'
      };

      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() params: UserIdDto): Promise<ResponseDataType<User>> {
    const id = params.id;
    const user = await this.usersService.findOne(id);

    if (user) {
      return {
        message: USER_STRINGS.USER_FOUND_ID(id),
        data: user
      };
    } else {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.NO_USER_ID_FOUND(id),
        status: 'error'
      };

      throw error;
    }
  }

  @Patch(':id')
  async update(@Param() params: UserIdDto, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDataType<User>> {
    const id = params.id;
    const userExists = await this.usersService.findOne(id);

    if (!userExists) {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.NO_USER_ID_FOUND(id),
        status: 'error'
      };

      throw error;
    }

    const updatedUser = await this.usersService.update(id, updateUserDto);

    if (updatedUser) {
      return {
        message: USER_STRINGS.USER_UPDATED,
        data: updatedUser
      };
    } else {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.USER_UPDATED_ERROR,
        status: 'error'
      };

      throw error;
    }
  }


  @Delete(':id')
  async remove(@Param() params: UserIdDto): Promise<ResponseDataType<string>> {
    const id = params.id;
    const deletedUser = await this.usersService.remove(id);

    if (deletedUser) {
      if (deletedUser.affected > 0) {
        return {
          message: USER_STRINGS.USER_DELTED_ID(id),
          data: id
        }
      } else {
        const error: ErrorDataType = {
          statusCode: 404,
          message: USER_STRINGS.USER_DELTED_ERROR_ID(id),
          status: 'error'
        };

        throw error;
      }
    }

  }
}
