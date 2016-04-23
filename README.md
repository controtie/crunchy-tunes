# Simon-sings
A music playlist sharing project built on top of crunchy-tunes.


## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)

## Team

Josh Wentworth
Sofia Berlin
Wilson Yu
Dylan Tran

## Usage

To set up database:
run python /server/db.py

To run server:
npm run dev-start 
node server/server.js

 if this doesn't work,
 run node server.js inside the server directory.

## Stack

React
Express
SQLite3
Node

### Installing Dependencies

From within the root directory:

```sh
npm install
npm install -g webpack
npm install -g karma-cli
npm install -g jasmine 

## Server your files on a webpack server:

'npm run dev-start'

This script uses web pack to bundle your js and jsx files (with source maps), watches the files for changes to trigger a new bundle, and starts your node server on localhost:8080.

Navigate your browser to localhost: 8080 to view the app.

'webpack --watch'


```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
