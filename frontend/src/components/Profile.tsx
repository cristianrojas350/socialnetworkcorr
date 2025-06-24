import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { User } from '../types';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authService.getProfile();
      setProfile(data);
    } catch (error: any) {
      toast.error('Error al cargar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando perfil...</div>
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
              <button
                onClick={() => navigate('/posts')}
                className="text-primary-600 hover:text-primary-500"
              >
                Publicaciones
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
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {profile?.firstName?.[0]}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-gray-600">@{profile?.alias}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {profile?.firstName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {profile?.lastName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alias
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  @{profile?.alias}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {profile?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {profile?.birthDate 
                    ? new Date(profile.birthDate).toLocaleDateString('es-ES')
                    : 'No especificada'
                  }
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Miembro desde
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {profile?.createdAt 
                    ? new Date(profile.createdAt).toLocaleDateString('es-ES')
                    : 'No disponible'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 