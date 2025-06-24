-- Script para migrar la estructura de la base de datos a Supabase
-- Ejecutar este script en tu base de datos de Supabase

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    alias VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "birthDate" DATE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de publicaciones
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    "likesCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "authorId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Crear tabla de likes
CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "postId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE("userId", "postId")
);

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_alias ON users(alias);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts("authorId");
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts("createdAt");
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes("postId");
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes("userId");

-- Crear función para actualizar updatedAt automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 