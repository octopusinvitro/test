[![Build Status](https://travis-ci.org/octopusinvitro/everypolitician-popolo-npm.svg?branch=master)](https://travis-ci.org/octopusinvitro/everypolitician-popolo-npm)
[![build status](https://gitlab.com/octopusinvitro/everypolitician-popolo-npm/badges/master/build.svg)](https://gitlab.com/octopusinvitro/everypolitician-popolo-npm/commits/master)


# Readme

[EveryPolitician](http://everypolitician.org/) provides its data in [Popolo](http://www.popoloproject.com/) format.
If you want to interact with this data from Node then this module makes that task simpler.


## About

This project uses [Jasmine](http://jasmine.github.io/) for JavaScript tests.

There is an ESlint configuration file to check the JS syntax.

Also, CI files have been added to be used with Travis and GitLab.


## Installing

### Requirements

You need [Node and npm](https://docs.npmjs.com/getting-started/installing-node).
Before you install node, you may want to install a node version manager like [nvm](https://github.com/creationix/nvm)

This is a work in progress.


### To install dependencies:

```js
npm install
```



## Usage

You can download a Popolo file manually from [EveryPolitician](http://everypolitician.org/). The following example uses [Åland Lagting](https://github.com/everypolitician/everypolitician-data/raw/master/data/Aland/Lagting/ep-popolo-v1.0.json) (which is the legislature of the Åland islands,
available as JSON data from the
[EveryPolitician page for Åland](http://everypolitician.org/aland/)).

First you'll need to require the library and read in a file from disk.

```js
var Popolo = require('everypolitician-popolo');
var popolo = Popolo.read('ep-popolo-v1.0.json');
```


## Tests

### To run all the tests:

The test command will run both Jasmine and ESLint.

```js
npm test
```

### To run a single test file:

This won't run the linter. To run just a file called `filename`:

```js
npm run-script jasmine spec/filename.js
```
