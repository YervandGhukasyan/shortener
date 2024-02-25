

## Installation

```bash
$ npm install
```



## Pre requirements

```bash
# You must have PostgreSQL installed
# Easiest way is to run from docker
https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/

# You must change .env, src/app.module.ts and config/config.json by your credentials
#After that you must run
npx sequelize-cli db:migrate 
# to migrate tables

```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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

