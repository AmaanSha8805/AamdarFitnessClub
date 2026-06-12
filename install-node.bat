@echo off
setlocal EnableExtensions
title AAMDAR Fitness Club - Install Node.js
cd /d "%~dp0"

echo.
echo  ========================================
echo   Install Node.js (required)
echo  ========================================
echo.
echo  This project needs Node.js 20 LTS or newer.
echo.

where winget >nul 2>nul
if not errorlevel 1 (
    echo Installing Node.js LTS via winget...
    echo.
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    if not errorlevel 1 (
        echo.
        echo [OK] Node.js installed successfully.
        echo Close this window, open a NEW Command Prompt, then run run.bat.
        echo.
        pause
        exit /b 0
    )
    echo.
    echo [WARN] winget install did not complete. Try manual install below.
    echo.
)

echo Manual install steps:
echo   1. Open https://nodejs.org/en/download
echo   2. Download the Windows LTS installer ^(.msi^)
echo   3. Run the installer and keep "Add to PATH" enabled
echo   4. Close ALL open terminals
echo   5. Double-click run.bat again
echo.
echo Optional command ^(if winget is available^):
echo   winget install OpenJS.NodeJS.LTS
echo.
pause
exit /b 1
