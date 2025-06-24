<<<<<<< HEAD
# SocialNetworkCorr - Red Social con Microservicios

Una red social moderna construida con arquitectura de microservicios usando Node.js, React y PostgreSQL.

## 🚀 Características

- **Backend**: Microservicios con Nest.js y TypeScript
- **Frontend**: React con TypeScript y Zustand para manejo de estado
- **Base de datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT
- **Documentación**: Swagger
- **Contenedores**: Docker y Docker Compose
- **Pruebas**: Unitarias con Jest

## 📁 Estructura del Proyecto

```
SocialNetworkCorr/
├── backend/
│   ├── auth/           # Microservicio de autenticación
│   ├── posts/          # Microservicio de publicaciones
│   ├── profile/        # Microservicio de perfiles
│   └── shared/         # Código compartido entre microservicios
├── frontend/           # Aplicación React
├── database/           # Scripts de base de datos
└── docs/              # Documentación
```

## 🛠️ Instalación

### Prerrequisitos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)

### Inicio Rápido

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd SocialNetworkCorr
```

2. **Levantar con Docker Compose**
```bash
docker-compose up -d
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api-docs

## 🔧 Desarrollo Local

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📚 Documentación

- [Guía de Instalación](./docs/instalacion.pdf)
- [API Documentation](http://localhost:3001/api-docs)

## 🧪 Pruebas

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📝 Licencia

MIT 
=======
# socialnetworkcorr
network social mediam
>>>>>>> 74a67bd1b301b00eeae725807e2d27d28242c0d0
