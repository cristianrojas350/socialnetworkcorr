export interface User {
  id: string;
  firstName: string;
  lastName: string;
  alias: string;
  email: string;
  birthDate?: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  message: string;
  likesCount: number;
  createdAt: string;
  authorId: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    alias: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  alias: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreatePostData {
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
} 