import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DbService } from '../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  hidePasswordResponse(obj: User) {
    const copyObj = { ...obj };
    const { password, ...rest } = copyObj;
    return rest;
  }

  findAll() {
    return this.db.users.map((user) => this.hidePasswordResponse(user));
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return this.hidePasswordResponse(user);
  }

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const currentTimestamp = Date.now();
    const newUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    this.db.users.push(newUser);

    return this.hidePasswordResponse(newUser);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const foundUser = this.db.users.find((user) => user.id === id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (foundUser.password === oldPassword) {
      if (oldPassword === newPassword) {
        throw new UnauthorizedException('New password must be different from the old one');
      }
      foundUser.password = newPassword;
      foundUser.updatedAt = Date.now();
      foundUser.version += 1;
      return this.hidePasswordResponse(foundUser);
    } else {
      throw new ForbiddenException('Old password is wrong');
    }
  }

  remove(id: string) {
    const foundIndex = this.db.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      this.db.users.splice(foundIndex, 1);
      return;
    } else {
      throw new NotFoundException(`User with ${id} not Found`);
    }
  }
}
