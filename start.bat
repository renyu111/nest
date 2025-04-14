@echo off
echo Starting ngrok...
start cmd /k "ngrok http 3001"

echo Waiting for ngrok to start...
timeout /t 5

echo Getting ngrok URL...
for /f "tokens=2" %%a in ('curl -s http://localhost:4040/api/tunnels ^| findstr "public_url"') do (
    set NGROK_URL=%%a
    set NGROK_URL=!NGROK_URL:"=!
    set NGROK_URL=!NGROK_URL:,=!
)

echo Setting environment variables...
set REACT_APP_API_URL=%NGROK_URL%

echo Starting React development server...
set PORT=3031
npm start

pause 