<p align="center">🚲 🚲 🚲</p>
# FixMyBerlin - A Mobility Platform for Berlin [![Build Status](https://semaphoreci.com/api/v1/hekele/fixmy-frontend/branches/develop/badge.svg)](https://semaphoreci.com/hekele/fixmy-frontend)

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
