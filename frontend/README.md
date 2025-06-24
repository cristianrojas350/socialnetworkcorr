# Frontend - SocialNetworkCorr

Frontend de la red social construido con React, TypeScript y Tailwind CSS.

## 🎨 Características

- **React 18** con TypeScript
- **Zustand** para manejo de estado global
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Axios** para consumo de APIs
- **React Hot Toast** para notificaciones
- **Heroicons** para iconos

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# Desde la raíz del proyecto
docker-compose up frontend

# O solo el frontend
cd frontend
docker build -t socialnetwork-frontend .
docker run -p 3000:80 socialnetwork-frontend
```

### Desarrollo Local

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar pruebas
npm test
```

## 📱 Páginas

### Login
- Formulario de inicio de sesión
- Validación de campos
- Redirección automática después del login
- Enlace para registro

### Publicaciones
- Lista de todas las publicaciones
- Formulario para crear nuevas publicaciones
- Funcionalidad de likes
- Navegación al perfil
- Cerrar sesión

### Perfil
- Información del usuario autenticado
- Datos personales
- Fecha de registro
- Navegación a publicaciones

## 🔧 Configuración

### Variables de Entorno

```env
REACT_APP_API_URL=http://localhost:3001
```

### Tailwind CSS

La aplicación usa Tailwind CSS para estilos. La configuración está en `tailwind.config.js`.

## 📁 Estructura

```
src/
├── components/           # Componentes React
│   ├── Login.tsx
│   ├── Posts.tsx
│   └── Profile.tsx
├── services/            # Servicios de API
│   ├── api.ts
│   ├── authService.ts
│   └── postsService.ts
├── store/               # Estado global (Zustand)
│   └── authStore.ts
├── types/               # Tipos TypeScript
│   └── index.ts
├── App.tsx              # Componente principal
├── index.tsx            # Punto de entrada
└── index.css            # Estilos globales
```

## 🎯 Funcionalidades

### Autenticación
- Login con email y contraseña
- Almacenamiento persistente del token JWT
- Protección de rutas privadas
- Logout automático en errores 401

### Publicaciones
- Lista paginada de publicaciones
- Crear nuevas publicaciones
- Sistema de likes
- Información del autor
- Fechas formateadas

### Estado Global
- Gestión de usuario autenticado
- Token de acceso
- Estado de autenticación
- Persistencia en localStorage

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm test -- --watch

# Ejecutar pruebas con coverage
npm test -- --coverage
```

## 🎨 Estilos

### Tailwind CSS
- Sistema de diseño consistente
- Componentes reutilizables
- Responsive design
- Modo oscuro (preparado)

### Componentes
- Diseño moderno y limpio
- Interacciones suaves
- Estados de carga
- Mensajes de error/éxito

## 🔒 Seguridad

- **HTTPS**: Configurado para producción
- **CORS**: Configurado en el backend
- **JWT**: Tokens seguros
- **Validación**: Formularios validados

## 🚀 Despliegue

### Producción

```bash
# Construir la aplicación
npm run build

# Los archivos se generan en /build
# Servir con nginx o similar
```

### Docker

```bash
# Construir imagen
docker build -t socialnetwork-frontend .

# Ejecutar contenedor
docker run -p 3000:80 socialnetwork-frontend
```

## 🐛 Solución de Problemas

### Error de dependencias

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de compilación

```bash
# Verificar configuración TypeScript
npx tsc --noEmit

# Limpiar cache
npm run build -- --reset-cache
```

### Error de conexión con API

```bash
# Verificar que el backend esté ejecutándose
curl http://localhost:3001/health

# Verificar variables de entorno
echo $REACT_APP_API_URL
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎯 Performance

- **Code Splitting**: React.lazy para componentes
- **Bundle Optimization**: Webpack optimizado
- **Image Optimization**: Lazy loading
- **Caching**: Headers de cache configurados

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Agrega pruebas si es necesario
5. Ejecuta las pruebas: `npm test`
6. Crea un Pull Request

## 📄 Licencia

MIT 