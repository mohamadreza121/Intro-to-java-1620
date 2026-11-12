@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is missing. Install Node.js LTS, then reopen this file.
  pause
  exit /b 1
)
echo Starting 1620 Java Lab from %cd%
echo Open http://127.0.0.1:1620 in your browser.
echo Keep this window open while using the lab. Ctrl+C stops it.
node server.mjs
pause
