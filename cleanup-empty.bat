@echo off
setlocal enabledelayedexpansion

echo Cleaning up empty files and directories...

REM Delete empty app\page.tsx
if exist "app\page.tsx" (
    for /f %%A in ('find /c /v "" ^< "app\page.tsx"') do (
        if %%A equ 0 (
            del /q "app\page.tsx"
            echo Deleted: app\page.tsx
        )
    )
)

REM Delete empty directories
for /f "delims=" %%d in ('dir /ad /b /s') do (
    dir /b "%%d" >nul 2>&1
    if errorlevel 1 (
        rd "%%d" 2>nul
        if not errorlevel 1 (
            echo Deleted: %%d
        )
    )
)

echo.
echo Cleanup complete!
pause
