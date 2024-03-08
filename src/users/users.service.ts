import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { User, CreateUserDto, UpdatePasswordDto } from 'src/dto/user';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
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
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}
