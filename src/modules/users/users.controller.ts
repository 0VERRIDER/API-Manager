import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { USER_STRINGS } from '../../resources/string.constants';
import { ErrorDataType, ResponseDataType } from '../../common/types/response.type';
import { User } from './entities/user.entity';
import { encryptPassword } from '../../common/functions/password/encrypt-password.function';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/role.guard';

@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt-access-token'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  @Roles('admin', 'support')
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDataType<User>> {
    // Encrypt password
    createUserDto.password = await encryptPassword(createUserDto.password);

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
  @Roles('admin', 'support')
  async findAll(): Promise<ResponseDataType<User[]>> {
    const users = await this.usersService.findAll();

    if (users.length > 0) {
      return {
        message: USER_STRINGS.USERS_FOUND,
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
  @Roles('admin', 'support')
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

  @Get('email/:email')
  @Roles('admin', 'support')
  async findOneByEmail(@Param('email') email: string): Promise<ResponseDataType<User>> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      return {
        message: USER_STRINGS.USER_EMAIL_FOUND(email),
        data: user
      };
    } else {
      const error: ErrorDataType = {
        statusCode: 404,
        message: USER_STRINGS.USER_EMAIL_NOT_EXISTS(email),
        status: 'error'
      };

      throw error;
    }
  }

  @Patch(':id')
  @Roles('admin')
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
  @Roles('admin')
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