import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  hidePasswordResponse(obj: User) {
    const copyObj = { ...obj };
    const { password, ...rest } = copyObj;
    return rest;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => this.hidePasswordResponse(user));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) throw new NotFoundException('User not found');

    return this.hidePasswordResponse(user);
  }

  async create(createUserDto: CreateUserDto) {
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

    await this.usersRepository.save(newUser)

    return this.hidePasswordResponse(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const foundUser = await this.usersRepository.findOneBy({id});

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

  async remove(id: string) {
    const foundIndex = await this.usersRepository.findOneBy({id});

    if (foundIndex) {
      await this.usersRepository.remove(foundIndex);
      return;
    } else {
      throw new NotFoundException(`User with ${id} not Found`);
    }
  }
}
