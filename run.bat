@echo off
echo Running Docker Container...
docker run -p 80:80 --name react-mines react-mines
echo Container is running on port 80