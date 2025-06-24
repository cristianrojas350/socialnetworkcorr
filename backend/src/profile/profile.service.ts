import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../shared/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findProfile(userId: string) {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      select: ['id', 'firstName', 'lastName', 'alias', 'birthDate', 'createdAt']
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      alias: user.alias,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
    };
  }
} 