# Semantic Browser

> A free tool to browse and query any SPARQL endpoint.

## Demo

Semantic Browser is the source code of [SemanticWeb.rocks](http://semanticweb.rocks).

![SemanticWeb.rock Demo](https://raw.githubusercontent.com/armeninants/semantic-browser/master/client/src/assets/screencast1.gif)

## Prerequisites

Make sure you have [Node](https://nodejs.org/en/download/) and NPM installed.
Then run `npm install -g forever` to install `forever` globally.

If you are going to run the application in development mode, then install `webpack-dev-server` as well:

``` bash
npm install -g webpack-dev-server
```

## Installation

``` bash
git clone https://github.com/armeninants/ai-semantic-browser.git
cd ai-semantic-browser/
chmod gu+x ./*.sh
npm run update
```

## How to run
To choose between development and production modes, set the SB_ENV environment variable in the `/.env` file to a respective value.

Run `npm run start` to start.
The application is accessible now at [http://localhost:8031](http://localhost:8031).
You can change the port by setting the SB_PORT environment variable.

To stop, run `npm run stop`.

## Pulling updates from the repo

``` bash
npm run update
npm run start
```


