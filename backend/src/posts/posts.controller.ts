import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto, PostResponseDto } from '../shared/dto/post.dto';

@ApiTags('Publicaciones')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de publicaciones',
    type: [PostResponseDto],
  })
  async findAll(): Promise<PostResponseDto[]> {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({ 
    status: 201, 
    description: 'Publicación creada exitosamente',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dar like a una publicación' })
  @ApiResponse({ 
    status: 200, 
    description: 'Like agregado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @ApiResponse({ status: 403, description: 'Ya has dado like a esta publicación' })
  async likePost(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ message: string }> {
    return this.postsService.likePost(id, req.user.userId);
  }
} 