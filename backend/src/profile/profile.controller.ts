import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileService } from './profile.service';

@ApiTags('Perfil')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil del usuario',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        alias: { type: 'string' },
        birthDate: { type: 'string', format: 'date' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getProfile(@Request() req) {
    return this.profileService.findProfile(req.user.userId);
  }
} 