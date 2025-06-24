import api from './api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/profile');
    return response.data;
  },
}; 