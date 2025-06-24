# Backend - SocialNetworkCorr

Backend de la red social construido con Nest.js, TypeScript y PostgreSQL.

## 🏗️ Arquitectura

El backend está organizado en microservicios:

- **Auth**: Autenticación y autorización con JWT
- **Posts**: Gestión de publicaciones y likes
- **Profile**: Gestión de perfiles de usuario
- **Shared**: Código compartido entre microservicios

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# Desde la raíz del proyecto
docker-compose up backend

# O solo el backend
cd backend
docker build -t socialnetwork-backend .
docker run -p 3001:3001 socialnetwork-backend
```

### Desarrollo Local

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar pruebas
npm test
```

## 📋 Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registrar usuario |

### Publicaciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts` | Obtener todas las publicaciones |
| POST | `/posts` | Crear publicación (requiere auth) |
| POST | `/posts/:id/like` | Dar like (requiere auth) |

### Perfil

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/profile` | Obtener perfil del usuario (requiere auth) |

## 🔧 Configuración

### Variables de Entorno

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=socialnetwork
JWT_SECRET=tu-secreto-super-seguro-cambiar-en-produccion
PORT=3001
```

### Base de Datos

La aplicación usa PostgreSQL con TypeORM. Las tablas se crean automáticamente con `synchronize: true` en desarrollo.

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con coverage
npm run test:coverage
```

## 📚 Documentación

La documentación de la API está disponible en Swagger:

- **URL**: http://localhost:3001/api-docs
- **Descripción**: Interfaz interactiva para probar los endpoints

## 🔒 Seguridad

- **JWT**: Autenticación basada en tokens
- **bcrypt**: Hash seguro de contraseñas
- **CORS**: Configurado para el frontend
- **Validación**: DTOs con class-validator

## 📁 Estructura

```
src/
├── auth/                 # Microservicio de autenticación
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── posts/               # Microservicio de publicaciones
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── profile/             # Microservicio de perfiles
│   ├── profile.controller.ts
│   ├── profile.service.ts
│   └── profile.module.ts
├── shared/              # Código compartido
│   ├── entities/        # Entidades de TypeORM
│   ├── dto/            # Data Transfer Objects
│   └── seeder/         # Seeder de datos
├── app.module.ts        # Módulo principal
└── main.ts             # Punto de entrada
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos

```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps postgres

# Ver logs
docker-compose logs postgres
```

### Error de dependencias

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de compilación TypeScript

```bash
# Verificar configuración
npx tsc --noEmit

# Limpiar dist
rm -rf dist
npm run build
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Agrega pruebas
5. Ejecuta las pruebas: `npm test`
6. Crea un Pull Request

## 📄 Licencia

MIT 