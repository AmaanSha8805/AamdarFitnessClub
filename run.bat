@echo off
setlocal EnableExtensions
title AAMDAR Fitness Club - Dev Server
cd /d "%~dp0"
call "%~dp0scripts\check-drive.cmd"

echo.
echo  ========================================
echo   AAMDAR Fitness Club - Starting...
echo  ========================================
echo.

REM Locate Node.js on PATH or in common install locations
call "%~dp0scripts\find-node.cmd"
if errorlevel 1 (
    echo [ERROR] Node.js was not found on this system.
    echo.
    echo  Node.js is required but was not detected in:
    echo    - System PATH
    echo    - %%ProgramFiles%%\nodejs
    echo    - %%LOCALAPPDATA%%\Programs\node
    echo    - NVM / fnm / Volta / Scoop installs
    echo.
    echo  Install Node.js 20 LTS or newer, then restart this window:
    echo    1. Download: https://nodejs.org/en/download
    echo    2. Or run:   install-node.bat
    echo    3. Or run:   winget install OpenJS.NodeJS.LTS
    echo.
    echo  After installing, close ALL terminal windows and run run.bat again.
    echo.
    pause
    exit /b 1
)

REM Verify node, npm, and npx
echo Checking Node.js toolchain...
node --version >nul 2>nul
if errorlevel 1 (
    echo [ERROR] node.exe was found but failed to run.
    echo Try reinstalling Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "delims=" %%V in ('node --version 2^>nul') do echo   Node.js: %%V

npm --version >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm is missing. Reinstall Node.js and include npm.
    echo.
    pause
    exit /b 1
)
for /f "delims=" %%V in ('npm --version 2^>nul') do echo   npm:     %%V

npx --version >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npx is missing. Reinstall Node.js and include npm.
    echo.
    pause
    exit /b 1
)
for /f "delims=" %%V in ('npx --version 2^>nul') do echo   npx:     %%V
echo.

if not exist "node_modules\" (
    echo Installing dependencies... This may take a few minutes.
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] npm install failed.
        echo Check your internet connection and try again.
        echo.
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

echo Checking Prisma client...
call npx prisma generate >nul 2>nul
if errorlevel 1 (
    echo [WARN] Prisma generate failed. Ensure PostgreSQL DATABASE_URL is set in .env.local
    echo.
)

echo.
echo  Starting dev server at http://localhost:3000
echo  ----------------------------------------
echo  FIRST START may take 2-3 minutes. Wait until you see "Ready" below,
echo  then open http://localhost:3000 in your browser manually.
echo.
echo  NOTE: Projects on FAT32 drives ^(like some E: drives^) run slowly.
echo        For best results, move the project to C: ^(NTFS^).
echo.
echo  Press Ctrl+C to stop.
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo [ERROR] Dev server stopped with an error.
    echo.
    pause
)

endlocal
