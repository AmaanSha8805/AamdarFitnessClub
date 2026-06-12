@echo off
REM Warn if project is on FAT32/exFAT (Next.js builds fail or run very slowly)
for /f "tokens=4*" %%A in ('fsutil fsinfo volumeinfo "%~d0\" 2^>nul ^| findstr /i "File System Name"') do set "FS_TYPE=%%A %%B"
echo %FS_TYPE% | findstr /i "FAT32 exFAT FAT " >nul 2>nul
if not errorlevel 1 (
    echo.
    echo  [WARNING] This project is on %FS_TYPE%
    echo  Next.js runs VERY slowly here and "npm run build" may FAIL.
    echo  RECOMMENDED: Move the project to C:\ on NTFS for reliable performance.
    echo.
)
