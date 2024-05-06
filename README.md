<p align="center">
  <a href="http://touraxis.com/" target="blank"><img src="https://assets-global.website-files.com/64f709f1309acba2b5ccaa48/65086cff3f18fbe84ee4a16f_TourAxis_Colour.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://dl.circleci.com/status-badge/redirect/circleci/KWfnK6dwhHt5bTD2oTbL3A/N8yufgdxD6rc3ZiCh8zVUg/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/KWfnK6dwhHt5bTD2oTbL3A/N8yufgdxD6rc3ZiCh8zVUg/tree/main.svg?style=shield" alt="CircleCI" /></a>
<a href="https://github.com/BenjaminOsmers/touraxis-test/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true" target="_blank"><img src="https://github.com/BenjaminOsmers/touraxis-test/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true" alt="Coverage" /></a>
</p>

## Description

A simple API to manage users and tasks for those users.

## Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![TypeORM](https://img.shields.io/badge/typeorm-%23316192.svg?style=for-the-badge&logo=typeorm&logoColor=white)

## Database Setup

```bash
# Create and populate .env file
$ docker compose up
```

## Installation

```bash
$ npm install
```

## Running the app

### Development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Production

```bash
# build
$ npm run build

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

### Base URL

```
http://localhost:4001/api
```

### Documentation

```
http://localhost:4001/api/docs
```

### Routes

#### Create User

```sh
curl -i -H "Content-Type: application/json" -X POST -d '{"username":"jsmith","first_name" : "John", "last_name" : "Smith"}' http://localhost:4001/api/users
```

#### Update user

```sh
curl -i -H "Content-Type: application/json" -X PUT -d '{"first_name" : "John", "last_name" : "Doe"}' http://localhost:4001/api/users/{id}
```

#### List all users

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/api/users
```

#### Get User info

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{id}
```

#### Create Task

```sh
curl -i -H "Content-Type: application/json" -X POST -d '{"name":"My task","description" : "Description of task", "date_time" : "2016-05-25 14:25:00"}' http://localhost:4001/api/users/{user_id}/tasks
```

#### Update Task

```sh
curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"My updated task"}' http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### Delete Task

```sh
curl -i -H "Content-Type: application/json" -X DELETE http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### Get Task Info

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{user_id}/tasks/{task_id}
```

#### List all tasks for a user

```sh
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4001/api/users/{user_id}/tasks
```

## License

This project is [MIT licensed](LICENSE).
