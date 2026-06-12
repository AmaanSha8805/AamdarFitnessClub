@echo off
REM Resolves NODE_DIR (folder containing node.exe) and prepends it to PATH for this session.
set "NODE_DIR="

REM 1) Already on PATH (ignore Cursor-bundled ripgrep paths)
where node >nul 2>nul
if not errorlevel 1 (
    for /f "delims=" %%F in ('where node 2^>nul') do (
        echo %%F | findstr /i "cursor\\resources" >nul
        if errorlevel 1 (
            set "NODE_DIR=%%~dpF"
            goto :apply_path
        )
    )
)

REM 2) Standard installers
for %%P in (
    "C:\Program Files\nodejs"
    "%ProgramFiles%\nodejs"
    "%LOCALAPPDATA%\Programs\node"
    "%ProgramFiles(x86)%\nodejs"
    "%USERPROFILE%\scoop\apps\nodejs\current"
    "%USERPROFILE%\scoop\shims"
) do (
    if exist "%%~P\node.exe" (
        set "NODE_DIR=%%~P"
        goto :apply_path
    )
)

REM 3) NVM for Windows
if exist "%APPDATA%\nvm\nvm.exe" (
    set "NVM_VERSION="
    if exist "%APPDATA%\nvm\settings.txt" (
        for /f "usebackq tokens=1,* delims==" %%A in ("%APPDATA%\nvm\settings.txt") do (
            if /i "%%A"=="path" set "NVM_VERSION=%%B"
        )
    )
    if defined NVM_VERSION if exist "%APPDATA%\nvm\%NVM_VERSION%\node.exe" (
        set "NODE_DIR=%APPDATA%\nvm\%NVM_VERSION%"
        goto :apply_path
    )
    for /f "delims=" %%V in ('dir /b /ad /o-n "%APPDATA%\nvm" 2^>nul ^| findstr /r "^[0-9]"') do (
        if exist "%APPDATA%\nvm\%%V\node.exe" (
            set "NODE_DIR=%APPDATA%\nvm\%%V"
            goto :apply_path
        )
    )
)

REM 4) fnm (Fast Node Manager)
if exist "%LOCALAPPDATA%\fnm_multishells" (
    for /f "delims=" %%D in ('dir /b /ad /o-d "%LOCALAPPDATA%\fnm_multishells" 2^>nul') do (
        if exist "%LOCALAPPDATA%\fnm_multishells\%%D\node.exe" (
            set "NODE_DIR=%LOCALAPPDATA%\fnm_multishells\%%D"
            goto :apply_path
        )
    )
)
if exist "%USERPROFILE%\.fnm\node-versions" (
    for /f "delims=" %%V in ('dir /b /ad /o-n "%USERPROFILE%\.fnm\node-versions" 2^>nul') do (
        if exist "%USERPROFILE%\.fnm\node-versions\%%V\installation\node.exe" (
            set "NODE_DIR=%USERPROFILE%\.fnm\node-versions\%%V\installation"
            goto :apply_path
        )
    )
)

REM 5) Volta
if exist "%LOCALAPPDATA%\Volta\tools\image\node" (
    for /f "delims=" %%V in ('dir /b /ad /o-n "%LOCALAPPDATA%\Volta\tools\image\node" 2^>nul') do (
        if exist "%LOCALAPPDATA%\Volta\tools\image\node\%%V\node.exe" (
            set "NODE_DIR=%LOCALAPPDATA%\Volta\tools\image\node\%%V"
            goto :apply_path
        )
    )
)

exit /b 1

:apply_path
if "%NODE_DIR:~-1%"=="\" set "NODE_DIR=%NODE_DIR:~0,-1%"
echo.;%PATH% | find /i "%NODE_DIR%;" >nul 2>nul
if errorlevel 1 set "PATH=%NODE_DIR%;%PATH%"
exit /b 0
