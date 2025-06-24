# Guía de Migración a Supabase

## 🚀 Migrar tu base de datos PostgreSQL a Supabase

### Paso 1: Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Conecta tu cuenta de GitHub
4. Crea un nuevo proyecto:
   - **Name**: `socialnetwork-prod`
   - **Database Password**: Genera una contraseña segura
   - **Region**: Elige la más cercana a tus usuarios

### Paso 2: Obtener credenciales de conexión

1. En tu proyecto de Supabase, ve a **Settings** > **Database**
2. Copia las siguientes credenciales:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: La que configuraste al crear el proyecto

### Paso 3: Configurar la estructura de la base de datos

1. Ve a **SQL Editor** en Supabase
2. Ejecuta el script `database/migrate-to-supabase.sql`
3. Verifica que las tablas se crearon correctamente

### Paso 4: Actualizar variables de entorno

Crea un archivo `.env` en el backend con las credenciales de Supabase:

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_de_supabase
DB_NAME=postgres
JWT_SECRET=tu-secreto-super-seguro-cambiar-en-produccion
FRONTEND_URL=https://tu-dominio.com
```

### Paso 5: Migrar datos existentes (opcional)

Si tienes datos en tu base de datos local:

```bash
# Exportar datos locales
pg_dump -U postgres -h localhost socialnetwork > backup.sql

# Importar a Supabase (desde SQL Editor)
# Copia y pega el contenido de backup.sql
```

### Paso 6: Probar la conexión

```bash
# En tu backend
npm run start:dev

# Verificar que se conecta correctamente
curl http://localhost:3001/health
```

## 🔧 Configuración de Seguridad

### 1. Configurar RLS (Row Level Security)

En Supabase, ejecuta:

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can view all users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para posts
CREATE POLICY "Anyone can view posts" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para likes
CREATE POLICY "Anyone can view likes" ON likes
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create likes" ON likes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 2. Configurar SSL

Supabase requiere SSL. Asegúrate de que tu aplicación use SSL:

```typescript
// En tu configuración de TypeORM
{
  ssl: {
    rejectUnauthorized: false
  }
}
```

## 📊 Monitoreo

### 1. Dashboard de Supabase

- **Database**: Monitorea queries y performance
- **Logs**: Revisa logs de la aplicación
- **API**: Monitorea llamadas a la API

### 2. Métricas importantes

- **Connections**: Número de conexiones activas
- **Query Performance**: Tiempo de respuesta de queries
- **Storage**: Uso de almacenamiento
- **Bandwidth**: Transferencia de datos

## 🔄 Backup y Restore

### Backup automático

Supabase hace backups automáticos cada día. Para backup manual:

```sql
-- En SQL Editor
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes;
```

### Restore

```sql
-- Restaurar desde backup
INSERT INTO users (...) VALUES (...);
INSERT INTO posts (...) VALUES (...);
INSERT INTO likes (...) VALUES (...);
```

## 💰 Costos

### Plan Gratuito
- **Storage**: 500MB
- **Bandwidth**: 2GB/mes
- **Database**: 500MB
- **API calls**: 50,000/mes

### Plan Pro ($25/mes)
- **Storage**: 100GB
- **Bandwidth**: 250GB/mes
- **Database**: 8GB
- **API calls**: 2M/mes

## 🚨 Consideraciones importantes

### 1. Rate Limiting
- Plan gratuito: 50,000 requests/mes
- Plan pro: 2M requests/mes

### 2. Connection Limits
- Máximo 100 conexiones simultáneas
- Timeout de 10 minutos por conexión

### 3. Query Limits
- Máximo 60 segundos por query
- Límite de 100MB por query

## 🔍 Troubleshooting

### Error de conexión SSL
```bash
# Agregar en TypeORM config
ssl: {
  rejectUnauthorized: false
}
```

### Error de timeout
```bash
# Aumentar timeout en queries
const queryRunner = connection.createQueryRunner();
queryRunner.query('SET statement_timeout = 60000');
```

### Error de conexiones
```bash
# Usar connection pooling
{
  extra: {
    max: 20,
    min: 5,
    idle: 10000
  }
}
```

## 📞 Soporte

- **Documentación**: [supabase.com/docs](https://supabase.com/docs)
- **Discord**: [discord.gg/supabase](https://discord.gg/supabase)
- **GitHub**: [github.com/supabase/supabase](https://github.com/supabase/supabase) 