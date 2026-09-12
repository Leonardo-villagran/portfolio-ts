@echo off
title Portfolio Dev
REM Corre en su propia terminal (fuera del VS Code).
REM Mata servidor anterior, arranca dev con recarga automatica y abre el navegador.
cd /d "%~dp0"
echo Cerrando servidor anterior en :4173...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":4173" ^| findstr "LISTENING"') do taskkill /F /PID %%p >nul 2>&1
echo Arrancando servidor en nueva ventana...
start "Portfolio Dev - http://localhost:4173" cmd /k "npm run dev"
timeout /t 7 /nobreak >nul
start http://localhost:4173
exit
