import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return this.mapToUserResponse(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => this.mapToUserResponse(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(+id);
    return this.mapToUserResponse(user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>): Promise<UserResponseDto> {
    const user = await this.usersService.update(+id, updateUserDto);
    return this.mapToUserResponse(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  // 用户注册
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.register(registerUserDto);
    return this.mapToUserResponse(user);
  }

  // 用户登录
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ user: UserResponseDto; token: string }> {
    const { user, token } = await this.usersService.login(loginUserDto);
    return { user: this.mapToUserResponse(user), token };
  }

  // 将 User 实体映射到 UserResponseDto
  private mapToUserResponse(user: User): UserResponseDto {
    const result = new UserResponseDto();
    result.id = user.id;
    result.username = user.username;
    result.createdAt = user.createdAt;
    result.updatedAt = user.updatedAt;
    return result;
  }
}
