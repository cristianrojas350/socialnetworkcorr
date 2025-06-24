import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async seed() {
    console.log('🌱 Iniciando seeder...');

    // Crear usuarios de prueba
    const users = await this.createUsers();
    
    // Crear publicaciones de prueba
    await this.createPosts(users);

    console.log('✅ Seeder completado exitosamente');
  }

  private async createUsers(): Promise<User[]> {
    const usersData = [
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        alias: 'juanperez',
        email: 'juan@ejemplo.com',
        password: 'password123',
        birthDate: new Date('1990-01-15'),
      },
      {
        firstName: 'María',
        lastName: 'García',
        alias: 'mariagarcia',
        email: 'maria@ejemplo.com',
        password: 'password123',
        birthDate: new Date('1992-05-20'),
      },
      {
        firstName: 'Carlos',
        lastName: 'López',
        alias: 'carloslopez',
        email: 'carlos@ejemplo.com',
        password: 'password123',
        birthDate: new Date('1988-12-10'),
      },
      {
        firstName: 'Ana',
        lastName: 'Martínez',
        alias: 'anamartinez',
        email: 'ana@ejemplo.com',
        password: 'password123',
        birthDate: new Date('1995-08-03'),
      },
      {
        firstName: 'Luis',
        lastName: 'Rodríguez',
        alias: 'luisrodriguez',
        email: 'luis@ejemplo.com',
        password: 'password123',
        birthDate: new Date('1991-03-25'),
      },
    ];

    const users: User[] = [];

    for (const userData of usersData) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.userRepository.create({
          ...userData,
          password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        users.push(savedUser);
        console.log(`👤 Usuario creado: ${userData.email}`);
      } else {
        users.push(existingUser);
      }
    }

    return users;
  }

  private async createPosts(users: User[]) {
    const postsData = [
      '¡Hola mundo! Esta es mi primera publicación en la red social.',
      'Hoy es un día increíble para compartir momentos especiales.',
      'Acabo de descubrir esta nueva red social y me encanta.',
      'Compartiendo mis pensamientos del día con todos ustedes.',
      'La tecnología nos conecta de maneras increíbles.',
      '¡Qué bueno estar aquí compartiendo con amigos!',
      'Cada día es una nueva oportunidad para conectar.',
      'Las redes sociales han cambiado la forma en que nos comunicamos.',
      'Me encanta poder expresarme libremente aquí.',
      'Gracias por crear esta increíble plataforma.',
    ];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const postMessage = postsData[i % postsData.length];
      
      const existingPost = await this.postRepository.findOne({
        where: { authorId: user.id, message: postMessage },
      });

      if (!existingPost) {
        const post = this.postRepository.create({
          message: postMessage,
          authorId: user.id,
        });
        await this.postRepository.save(post);
        console.log(`📝 Publicación creada para: ${user.email}`);
      }
    }
  }
} 