import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'juanperez' })
  @IsString()
  alias: string;

  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  birthDate: string;
}

export class JwtPayload {
  sub: string;
  email: string;
  alias: string;
} 