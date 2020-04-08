<p align="center">🚲 🚲 🚲</p>
<h1 align="center">FixMyBerlin - A Mobility Platform for Berlin</h1>

[![Build Status](https://semaphoreci.com/api/v1/hekele/fixmy-frontend/branches/dependabot-npm_and_yarn-develop-fetch-mock-8-3-2/badge.svg)](https://semaphoreci.com/hekele/fixmy-frontend)

You can check out the live version [here](https://fixmyberlin.de/).

![fixmy screenshot](/fixmy-screenshot.png)

## Contributing

Did you encounter an issue that you would like to tell us about? Would you like
to add to this project yourself? Go ahead and check the
[contribution guide](CONTRIBUTING.md).

## Installation

```sh
$ npm install
```

## Configuration

Configuration options for the app are set through environment variables. You can
set these by creating a file `/.env` in this directory. Look at the file
`.env.defaults` to see how `.env` needs to be formatted. Default configuration
options are also loaded from `.env.defaults`.

## Development

Builds the application and starts a webserver with hot loading.
Runs on [localhost:8080](http://localhost:8080/)

```sh
$ npm start
```

## Testing

Runs unit tests.

```sh
$ npm run test
```

## Build

Builds a minified version of the application in the build folder.

```sh
$ npm run build
```

## Deployment

Each branch gets automatically deployed on netlify:

- https://fixmyberlin-app.netlify.com/ [master]
- https://develop--fixmyberlin-app.netlify.com/ [develop]

### Build environment variables

- `NF_API_URL` Configures API proxying through `/api/v1/`. Trailing backslash required.
- `NF_API_HOST` Configures the host header sent for proxied API requests.

### Embed Mode

You can test the embed mode by adding a query parameter to the url: `http://localhost:8080/planungen?embed=1`.
There is also a deployed production version: https://embed.fixmyberlin.de/.

## Run Tests

### Unit tests

Run unit tests using `npm run test`.

### End-To-End Tests

End-To-End tests are implemented using [Cypress](https://www.cypress.io/).
There are a couple of options to run e2e tests. You can

- start the dev server AND run tests
  [headlessly](https://blog.logrocket.com/introduction-to-headless-browser-testing-44b82310b27c/)
  in a single run `npm run test:e2e-dev-server`.
  This stops the dev server after all tests have been run.
- run e2e tests _headlessly_ against an already running development server using `npm run test:e2e`.
- open the Cypress GUI and run tests in Chrome from there using `npm run cypress`

When you are working on e2e-tests for this app please also refer to the
collection of notes from development of the end-to-end-test-suite in
[cypress/README.MD](cypress/README.MD).
