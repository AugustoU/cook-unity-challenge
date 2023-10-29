# cook-unity-challenge

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine
- [Docker](https://www.docker.com/) installed (for Docker containers)

## Installing & running

### Engine Configuration
1. Go to ./env_files
2. Configure and move de .engine.env.example file into ./cook-unity-engine/ folder.

### Engine Run Dev Mode 
```bash
# install dependencies and serve at localhost:3000
npm install && npm run start:dev
```
You can use docker-compose to (make sure that .env file is set up for development)

### Run with docker 📦

Use the container name of postgres in POSTGRES_HOST env variable.

```bash
docker-compose build 
docker-compose run 
```

If you only want to run the engine service
```bash
docker-compose build engine_servie
docker-compose run engine_service
```

## Folder structure 📁📝

The solution is structured into modules, where each module has its presentation layer, services, entities, and DTOs.

- **auth:** Module to handle system authentication and authorization.
- **common**: Shared code, in this case, includes some DTOs for pagination purposes.
- **database**: Module to connect to PostgreSQL using TypeORM.
- **meal-ratings**: Module to manage meal ratings.
- **meals**: Module to manage meals.
- **users**: Module to manage users.
