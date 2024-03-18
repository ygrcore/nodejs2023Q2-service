import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User
  })
  @ApiResponse({
    status: 400,
    description: 'UserId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'Created user',
  })
  @ApiResponse({
    status: 400,
    description: 'Required fields are missed',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({
    status: 200,
    description: 'Updated password',
  })
  @ApiResponse({
    status: 400,
    description: 'UserId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'Deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'UserId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
