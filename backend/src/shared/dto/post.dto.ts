import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '¡Hola mundo! Esta es mi primera publicación.' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class PostResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  author: {
    id: string;
    firstName: string;
    lastName: string;
    alias: string;
  };
}

export class LikePostDto {
  @ApiProperty()
  postId: string;
} 