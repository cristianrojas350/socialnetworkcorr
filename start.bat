@echo off
echo 🚀 Iniciando SocialNetworkCorr...

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está instalado. Por favor, instala Docker primero.
    pause
    exit /b 1
)

REM Verificar si Docker Compose está instalado
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero.
    pause
    exit /b 1
)

REM Detener contenedores existentes si los hay
echo 🛑 Deteniendo contenedores existentes...
docker-compose down

REM Construir y levantar los servicios
echo 🔨 Construyendo y levantando servicios...
docker-compose up -d --build

REM Esperar a que los servicios estén listos
echo ⏳ Esperando a que los servicios estén listos...
timeout /t 30 /nobreak >nul

REM Verificar el estado de los servicios
echo 📊 Estado de los servicios:
docker-compose ps

echo.
echo ✅ ¡SocialNetworkCorr está listo!
echo.
echo 🌐 Accede a la aplicación:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:3001
echo    Documentación Swagger: http://localhost:3001/api-docs
echo.
echo 👤 Usuarios de prueba:
echo    Email: juan@ejemplo.com, Contraseña: password123
echo    Email: maria@ejemplo.com, Contraseña: password123
echo    Email: carlos@ejemplo.com, Contraseña: password123
echo    Email: ana@ejemplo.com, Contraseña: password123
echo    Email: luis@ejemplo.com, Contraseña: password123
echo.
echo 📝 Comandos útiles:
echo    Ver logs: docker-compose logs -f
echo    Detener: docker-compose down
echo    Reiniciar: docker-compose restart
echo.
pause 