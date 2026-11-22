@echo off
setlocal
set "CAREERCRAFT_API_BASE=https://api.deepseek.com"
set "CAREERCRAFT_MODEL=deepseek-flash"
set "CAREERCRAFT_API_KEY=********"
if "%CAREERCRAFT_API_KEY%"=="********" (
  echo Copy this script to "Start CareerCraft DeepSeek.local.cmd" and set CAREERCRAFT_API_KEY.
  pause
  exit /b 1
)
call "%~dp0Start CareerCraft.cmd"
exit /b %errorlevel%
