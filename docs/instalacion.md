# Guía de Instalación - SocialNetworkCorr

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)
- **Node.js** (versión 18 o superior) - Solo para desarrollo local

## Instalación con Docker (Recomendado)

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd SocialNetworkCorr
```

### 2. Levantar la aplicación

```bash
# Construir y levantar todos los servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### 3. Verificar que todo esté funcionando

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentación Swagger**: http://localhost:3001/api-docs
- **Base de datos**: localhost:5432

### 4. Datos de prueba

La aplicación incluye un seeder automático que crea 5 usuarios de prueba:

| Email | Contraseña | Nombre |
|-------|------------|--------|
| juan@ejemplo.com | password123 | Juan Pérez |
| maria@ejemplo.com | password123 | María García |
| carlos@ejemplo.com | password123 | Carlos López |
| ana@ejemplo.com | password123 | Ana Martínez |
| luis@ejemplo.com | password123 | Luis Rodríguez |

## Desarrollo Local

### Backend

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

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

## Variables de Entorno

### Backend (.env)

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

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001
```

## Comandos Útiles

### Docker

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Ejecutar comandos en un contenedor
docker-compose exec backend npm test
docker-compose exec postgres psql -U postgres -d socialnetwork
```

### Base de Datos

```bash
# Conectar a PostgreSQL
docker-compose exec postgres psql -U postgres -d socialnetwork

# Ver logs de la base de datos
docker-compose logs postgres

# Hacer backup
docker-compose exec postgres pg_dump -U postgres socialnetwork > backup.sql
```

## Estructura del Proyecto

```
SocialNetworkCorr/
├── backend/                 # API con Nest.js
│   ├── src/
│   │   ├── auth/           # Microservicio de autenticación
│   │   ├── posts/          # Microservicio de publicaciones
│   │   ├── profile/        # Microservicio de perfiles
│   │   └── shared/         # Código compartido
│   ├── Dockerfile
│   └── package.json
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios de API
│   │   ├── store/          # Estado global (Zustand)
│   │   └── types/          # Tipos TypeScript
│   ├── Dockerfile
│   └── package.json
├── database/               # Scripts de base de datos
│   └── init.sql
├── docs/                   # Documentación
├── docker-compose.yml      # Orquestación de contenedores
└── README.md
```

## API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

### Publicaciones
- `GET /posts` - Obtener todas las publicaciones
- `POST /posts` - Crear publicación (requiere autenticación)
- `POST /posts/:id/like` - Dar like (requiere autenticación)

### Perfil
- `GET /profile` - Obtener perfil del usuario (requiere autenticación)

## Solución de Problemas

### Error de conexión a la base de datos

```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps

# Reiniciar el servicio de base de datos
docker-compose restart postgres

# Ver logs de errores
docker-compose logs postgres
```

### Error de permisos en Docker

```bash
# En Linux/Mac, agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión o ejecutar
newgrp docker
```

### Puerto ya en uso

```bash
# Ver qué está usando el puerto
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Cambiar puertos en docker-compose.yml si es necesario
```

### Problemas de memoria

```bash
# Aumentar memoria disponible para Docker
# En Docker Desktop: Settings > Resources > Memory
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles. 