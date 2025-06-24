import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ProfileModule } from './profile/profile.module';
import { User } from './shared/entities/user.entity';
import { Post } from './shared/entities/post.entity';
import { Like } from './shared/entities/like.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'socialnetwork',
      entities: [User, Post, Like],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    PostsModule,
    ProfileModule,
  ],
})
export class AppModule {} 