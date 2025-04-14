import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 使用 crypto 模块加密密码
  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // 验证密码
  private verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // 注册新用户
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      // 检查用户名是否已存在
      const existingUser = await this.usersRepository.findOne({
        where: { username: registerUserDto.username }
      });

      if (existingUser) {
        throw new ConflictException(`用户名 "${registerUserDto.username}" 已被注册，请选择其他用户名`);
      }

      // 创建新用户
      const hashedPassword = this.hashPassword(registerUserDto.password);
      const newUser = this.usersRepository.create({
        ...registerUserDto,
        password: hashedPassword
      });

      // 保存用户并获取生成的 ID
      const savedUser = await this.usersRepository.save(newUser);
      console.log(`新用户注册成功，ID: ${savedUser.id}`);
      
      return savedUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`注册失败: ${error.message}`);
    }
  }

  // 用户登录
  async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: string }> {
    try {
      // 查找用户
      const user = await this.usersRepository.findOne({
        where: { username: loginUserDto.username }
      });

      if (!user) {
        throw new UnauthorizedException('用户名或密码不正确');
      }

      // 验证密码
      const isPasswordValid = this.verifyPassword(loginUserDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('用户名或密码不正确');
      }

      // 生成 token
      const payload = { username: user.username, sub: user.id };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new Error(`登录失败: ${error.message}`);
    }
  }
}
