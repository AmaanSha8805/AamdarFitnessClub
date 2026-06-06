@echo off
title AAMDAR Fitness Club - Dev Server
cd /d "%~dp0"

echo.
echo  ========================================
echo   AAMDAR Fitness Club - Starting...
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo Download it from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Installing dependencies... This may take a few minutes.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo.
)

if not exist ".env.local" (
    if exist ".env.example" (
        echo Creating .env.local from .env.example...
        copy /Y ".env.example" ".env.local" >nul
        echo Add your API keys to .env.local when ready.
        echo.
    )
)

echo Starting dev server at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

start "" "http://localhost:3000"
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Dev server stopped with an error.
    pause
)
