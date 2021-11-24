<p align="center">🚲 🚲 🚲</p>
<h1 align="center">FixMyBerlin - A Mobility Platform for Berlin</h1>

![Node.js CI](https://github.com/FixMyBerlin/fixmy.frontend/workflows/Node.js%20CI/badge.svg?branch=develop)

You can check out the live version [at fixmyberlin.de](https://fixmyberlin.de/).

![fixmy screenshot](/fixmy-screenshot.png)

## Contributing

Did you encounter an issue that you would like to tell us about? Would you like
to add to this project yourself? Go ahead and check the
[contribution guide](CONTRIBUTING.md).

## Installation

We recommend using [nvm](https://github.com/nvm-sh/nvm) to run this project with the Node version specified in `.nvmrc`.

```sh
$ npm install
```

## Configuration

Configuration options for the app are set through environment variables. You can
set these by creating a file `/.env` in this directory. Look at the file
`.env.defaults` to see how `.env` needs to be formatted. Default configuration
options are also loaded from `.env.defaults`.

**Production builds should always have `BACKEND=production` set in order to
configure the correct API endpoint.**

## Development

Builds the application and starts a webserver with hot loading.
Runs on [localhost:8080](http://localhost:8080/)

```sh
npm start
```

## Testing

Runs unit tests.

```sh
npm run test
```

## Build

Builds a minified version of the application in the build folder.

```sh
npm run build
```

## Deployment

Each branch gets automatically deployed on netlify:

- https://fixmyberlin-app.netlify.app/ [master]
- https://develop--fixmyberlin-app.netlify.app/ [develop]

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

## Internationalization

The platform has localization capabilities via [format.js](https://formatjs.io/).
This means that language, formatting and other options can be customized based
on the localization of the current user. When strings are created using the
format specific to format.js, translations can be made by extracting, translating
and compiling the relevant text contents. Please refer to the format.js documentation
for information on how to create React components that are suitable for translation.

Please note that IDs for translation strings are not automatically generated, as
recommended by format.js documentation, but namespaced to the app or page the
content is relevant for. Text for generic components is namespaced to `components`.

Each locale has a language code. This app currently supports:

- German (`de` language code, default language)
- English (`en` language code)
- Spanish (`es` language code)

### Extracting

Extract text content for translation from the source code by running the command

```
npm run extract
```

This will update the file containing the German language default text contents
in the file [`src/lang/translations/de.json`](https://github.com/FixMyBerlin/fixmy.frontend/blob/develop/src/lang/translations/de.json).

### Translating

In order to create translations for the entries generated in the previous step,
the relevant file at `/src/lang/translations/[language code].json` is updated
with the new entries.

### Compiling

Run the command

```
npm run compile
```

to make available all new translations in an optimized format.
