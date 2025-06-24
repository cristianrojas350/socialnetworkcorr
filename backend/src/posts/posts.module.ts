import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from '../shared/entities/post.entity';
import { Like } from '../shared/entities/like.entity';
import { User } from '../shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like, User])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {} 