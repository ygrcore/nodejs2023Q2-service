import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { IUser, CreateUserDto, UpdatePasswordDto } from 'src/dto/user';
import { DbService } from 'src/db/db.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  getAllUsers(): IUser[] {
    return this.dbService.getAllUsers();
  }

  getUserById(id: string): IUser {
    return this.dbService.getUserById(id);
  }

  createUser(createUserDto: CreateUserDto): IUser {
    const newUser: IUser = {
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    this.dbService.addUser(newUser);
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
    this.dbService.deleteUser(id);
  }
}
