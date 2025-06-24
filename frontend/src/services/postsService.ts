import api from './api';
import { Post, CreatePostData } from '../types';

export const postsService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  async likePost(postId: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/posts/${postId}/like`);
    return response.data;
  },
}; 