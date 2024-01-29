@echo off
echo Checking if the Docker image is already built...
docker image inspect react-mines >nul 2>&1

if %errorlevel% neq 0 (
    echo Image not found. Building Docker Image...
    docker build -t react-mines .
    echo Build Complete!
) else (
    echo Image found. Skipping build.
)

echo Running Docker Container...
docker run -p 80:80 -d --name react-mines react-mines
echo Container is running on port 80