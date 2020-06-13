# TechnoServs Dashboard

The TechnoServs Dashboard

Available in `SPA` (Single Page Application) and `Mobile App` on `Android` and `iOS`.

## Informations about the project

### Docker Compose for local development

2 services (docker containers) :

- web : Runs the web interface server on port 8080 in development mode with live reload
- test : Runs the test web interface on port 4000

### Base project setup

- Package manager : `Yarn`
- Linter : `ESLint`
- ESLint preset : `Prettier`
- Testing framework : `Jest`
- CSS preprocessor : `Sass with SCSS Syntax`

Others informations :

- Cordova app id : `fr.technoservs.dashboard.app`
- Quasar import strategy : `Auto-import in-use Quasar components & directive`

### Version informations

- NPM version : `6.9.0 (LTS)` => `dc run --rm web npm --version`
- Node version : `v10.16.3 (LTS)` => `dc run --rm web node --version`
- Yarn version : `1.17.3` => `dc run --rm web yarn --version`

## Instructions

```
/!\ WARNING : You need to run this service with the dev stack !

The api and auth server is not started on this micro-service.
You need to start the API and Authentication micro-service first.
```


### Installing the project locally (the first time)

```bash
docker-compose build
docker-compose run --rm web yarn install
```

### Starting the project locally

Start the project in development mode (hot-code reloading, error reporting, etc.)

```bash
docker-compose up
```

### Development commands

#### Yarn

##### Install the dependencies

```bash
docker-compose run --rm web yarn install
```

#### Lint with ESLint and Prettier

##### Lint the files

```bash
docker-compose run --rm web yarn run lint
```

##### Lint and fix files

```bash
docker-compose run --rm web yarn run lint:fix
```

#### Unit tests and coverage with JEST

##### Execute unit tests with coverage

```bash
docker-compose run --rm test yarn run test:unit
```

##### Execute only coverage

```bash
docker-compose run --rm test yarn run test:unit:coverage
```

##### Live execute unit tests on files modified

```bash
docker-compose run --rm test yarn run test:unit:watch
```

##### Live execute unit tests on all files

```bash
docker-compose run --rm test yarn run test:unit:watchAll
```

#### Quasar

##### Get informations from Quasar current setup

```bash
docker-compose run --rm web quasar info
```

##### Upgrade Quasar packages

Check for upgradable packages :
```bash
docker-compose run --rm web quasar upgrade
```

Do the actual upgrade :
```bash
docker-compose run --rm web quasar upgrade --install
```

## Documentation links

- [Quasar documentation](https://quasar.dev/introduction-to-quasar)
- [VueJS documentation](https://vuejs.org/v2/guide/)
- [Jest documentation](https://jestjs.io/en/)
