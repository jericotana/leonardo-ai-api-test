## Project setup
- Run npm install
- Copy and paste`.env_template` then rename it to `.env` 
- Add DATABASE_URL value. This should be a postgres database url value
- Run `npx prisma migrate dev`. This will apply all the migrations to the database

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

