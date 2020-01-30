<p align="center">🚲 🚲 🚲</p>
<h1 align="center">FixMyBerlin - A Mobility Platform for Berlin</h1>

You can check out the live version [here](https://fixmyberlin.de/).

![fixmy screenshot](/fixmy-screenshot.jpg)

## Installation

```sh
$ npm install
```

## Development

Builds the application and starts a webserver with hot loading.
Runs on [localhost:8080](http://localhost:8080/)

```sh
$ npm start
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

## Embed Mode

If you want to test the embed mode, you just need to add a query paramter to the url: `http://localhost:8080/planungen?embed=1`.
There is also a deployed production version: https://embed.fixmyberlin.de/.

The project is based on [wbkd/react-starter](https://github.com/wbkd/react-starter).

## Kataster Standalone

In order to create the standalone version we are using the env variables `BASE_NAME`, `ENTRY_POINT` and `KATASTER_PATH`.

- `BASE_PATH`: used in the webpack config and the router history. If you want to deploy the standalone version somewhere other than root you need to set this variable.
- `ENTRY_POINT`: needs to be set in order to use the kataster app as an entry point
- `KATASTER_PATH`: base url of the kataster app. Should be empty for the standalone version

The variables are already configured when you are using the following tasks:

**Development:**

```sh
$ npm run start:strassencheck
```

**Build:**

```sh
$ npm run build:strassencheck
```

## Run Tests

We are gradually adding tests

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
