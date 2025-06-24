import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../shared/entities/post.entity';
import { Like } from '../shared/entities/like.entity';
import { User } from '../shared/entities/user.entity';
import { CreatePostDto, PostResponseDto } from '../shared/dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });

    return posts.map(post => ({
      id: post.id,
      message: post.message,
      likesCount: post.likesCount,
      createdAt: post.createdAt,
      authorId: post.authorId,
      author: {
        id: post.author.id,
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        alias: post.author.alias,
      },
    }));
  }

  async create(createPostDto: CreatePostDto, userId: string): Promise<PostResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = this.postRepository.create({
      ...createPostDto,
      authorId: userId,
    });

    const savedPost = await this.postRepository.save(post);
    
    return {
      id: savedPost.id,
      message: savedPost.message,
      likesCount: savedPost.likesCount,
      createdAt: savedPost.createdAt,
      authorId: savedPost.authorId,
      author: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
      },
    };
  }

  async likePost(postId: string, userId: string): Promise<{ message: string }> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const existingLike = await this.likeRepository.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      throw new ForbiddenException('Ya has dado like a esta publicación');
    }

    const like = this.likeRepository.create({
      postId,
      userId,
    });

    await this.likeRepository.save(like);

    // Actualizar contador de likes
    post.likesCount += 1;
    await this.postRepository.save(post);

    return { message: 'Like agregado exitosamente' };
  }
} 