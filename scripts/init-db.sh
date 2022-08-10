docker stop better-climbing-db || true && docker rm better-climbing-db || true
docker build -t better-climbing-db:latest ./
docker run --name better-climbing-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d better-climbing-db