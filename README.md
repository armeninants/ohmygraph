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

## How to Install

``` bash
git clone https://github.com/armeninants/semantic-browser.git
cd semantic-browser/
chmod gu+x ./*.sh
npm run update
```

## Run
``` bash
./run.sh
```
Open http://localhost:8031 in your browser.

## Run in development mode
``` bash
./run.sh dev
```


