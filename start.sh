#!/bin/bash

echo "🚀 Iniciando SocialNetworkCorr..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero."
    exit 1
fi

# Detener contenedores existentes si los hay
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Construir y levantar los servicios
echo "🔨 Construyendo y levantando servicios..."
docker-compose up -d --build

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 30

# Verificar el estado de los servicios
echo "📊 Estado de los servicios:"
docker-compose ps

echo ""
echo "✅ ¡SocialNetworkCorr está listo!"
echo ""
echo "🌐 Accede a la aplicación:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   Documentación Swagger: http://localhost:3001/api-docs"
echo ""
echo "👤 Usuarios de prueba:"
echo "   Email: juan@ejemplo.com, Contraseña: password123"
echo "   Email: maria@ejemplo.com, Contraseña: password123"
echo "   Email: carlos@ejemplo.com, Contraseña: password123"
echo "   Email: ana@ejemplo.com, Contraseña: password123"
echo "   Email: luis@ejemplo.com, Contraseña: password123"
echo ""
echo "📝 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Detener: docker-compose down"
echo "   Reiniciar: docker-compose restart" 