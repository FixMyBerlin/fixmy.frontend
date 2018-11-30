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

* https://fixmyberlin-app.netlify.com/ [master]
* https://develop--fixmyberlin-app.netlify.com/ [develop]


## Embed Mode

If you want to test the embed mode, you just need to add a query paramter to the url: `http://localhost:8080/planungen?embed=1`.
There is also a deployed production version: https://embed.fixmyberlin.de/.


The project is based on [wbkd/react-starter](https://github.com/wbkd/react-starter).
