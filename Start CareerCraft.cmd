@echo off
setlocal
cd /d "%~dp0"
where node.exe >nul 2>&1
if errorlevel 1 goto missing
where npm.cmd >nul 2>&1
if errorlevel 1 goto missing
if exist "node_modules\pdfjs-dist\build\pdf.min.mjs" if exist "node_modules\tesseract.js\dist\worker.min.js" if exist "node_modules\@tesseract.js-data\chi_sim\4.0.0_best_int\chi_sim.traineddata.gz" if exist "node_modules\@tesseract.js-data\eng\4.0.0_best_int\eng.traineddata.gz" goto run
call npm.cmd ci --ignore-scripts --no-fund --no-audit
if errorlevel 1 goto failed
:run
node server.mjs --open
if errorlevel 1 goto failed
exit /b 0
:missing
echo CareerCraft requires Node.js 22.13 or later and npm.
:failed
pause
exit /b 1
