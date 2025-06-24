import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { postsService } from '../services/postsService';
import { Post } from '../types';
import toast from 'react-hot-toast';
import { HeartIcon } from '@heroicons/react/24/outline';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postsService.getPosts();
      setPosts(data);
    } catch (error: any) {
      toast.error('Error al cargar las publicaciones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsCreating(true);
    try {
      const createdPost = await postsService.createPost({ message: newPost });
      setPosts([createdPost, ...posts]);
      setNewPost('');
      toast.success('Publicación creada exitosamente');
    } catch (error: any) {
      toast.error('Error al crear la publicación');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await postsService.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likesCount: post.likesCount + 1 }
          : post
      ));
      toast.success('Like agregado');
    } catch (error: any) {
      toast.error('Error al dar like');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando publicaciones...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">SocialNetworkCorr</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user?.firstName}</span>
              <button
                onClick={() => navigate('/profile')}
                className="text-primary-600 hover:text-primary-500"
              >
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crear publicación */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué estás pensando?"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {newPost.length}/500 caracteres
              </span>
              <button
                type="submit"
                disabled={isCreating || !newPost.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isCreating ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de publicaciones */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.firstName[0]}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">
                    {post.author.firstName} {post.author.lastName}
                  </p>
                  <p className="text-sm text-gray-500">@{post.author.alias}</p>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">{post.message}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                >
                  <HeartIcon className="w-5 h-5" />
                  <span>{post.likesCount} likes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts; 