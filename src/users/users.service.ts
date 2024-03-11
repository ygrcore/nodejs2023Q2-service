import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { IUser, CreateUserDto, UpdatePasswordDto } from 'src/dto/user';
import { DbService } from 'src/db/db.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  getAllUsers(): IUser[] {
    return this.dbService.db.users
  }

  getUserById(id: string): IUser {
    const user = this.dbService.db.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): IUser {
    const newUser: IUser = {
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };
    this.dbService.db.users.push(newUser);
    return newUser;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): IUser {
    const user = this.getUserById(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return user;
  }

  deleteUser(id: string): void {
    const index = this.dbService.db.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.dbService.db.users.splice(index, 1);
  }
}
