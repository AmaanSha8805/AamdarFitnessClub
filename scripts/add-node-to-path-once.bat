@echo off
title Add Node.js to PATH (run once as Administrator)
echo.
echo This adds C:\Program Files\nodejs to your user PATH so run.bat works from Explorer.
echo.
set "NODE_DIR=C:\Program Files\nodejs"
if not exist "%NODE_DIR%\node.exe" (
    echo Node.js not found at %NODE_DIR%
    echo Install Node.js first: install-node.bat
    pause
    exit /b 1
)
for /f "tokens=2*" %%A in ('reg query "HKCU\Environment" /v Path 2^>nul') do set "USER_PATH=%%B"
echo.;%USER_PATH% | find /i "%NODE_DIR%" >nul 2>nul
if not errorlevel 1 (
    echo Node.js is already on your user PATH.
    pause
    exit /b 0
)
setx PATH "%USER_PATH%;%NODE_DIR%"
echo.
echo Done. Close ALL terminals and run run.bat again.
pause
