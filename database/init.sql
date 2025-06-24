-- Script de inicialización de la base de datos
-- Este script se ejecuta automáticamente al crear el contenedor de PostgreSQL

-- Crear la base de datos si no existe
SELECT 'CREATE DATABASE socialnetwork'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'socialnetwork')\gexec

-- Conectar a la base de datos
\c socialnetwork;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Comentario sobre las tablas
-- Las tablas se crearán automáticamente por TypeORM con synchronize: true
-- Este script es principalmente para configuración inicial

-- Crear índices adicionales si es necesario
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_users_alias ON users(alias);
-- CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
-- CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
-- CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
-- CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id); 