import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '../shared/entities/user.entity';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let jwtService: any;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Test',
        lastName: 'User',
        alias: 'testuser',
      };

      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        alias: 'testuser',
      });
      expect(result.password).toBeUndefined();
    });

    it('should return null when user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('correctpassword', 10),
      };

      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data when login is successful', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Test',
        lastName: 'User',
        alias: 'testuser',
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        access_token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          alias: 'testuser',
        },
      });
    });
  });
}); 