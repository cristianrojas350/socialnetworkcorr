import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../shared/entities/user.entity';
import { LoginDto, RegisterDto, JwtPayload } from '../shared/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      alias: user.alias,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: registerDto.email },
        { alias: registerDto.alias },
      ],
    });

    if (existingUser) {
      throw new UnauthorizedException('El email o alias ya existe');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      birthDate: new Date(registerDto.birthDate),
    });

    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;

    return result;
  }
} 