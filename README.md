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


## Note on the implementation

The Ruby repository this module is based on subclasses the `Array` class for collections.  [It is not trivial to subclass the Array class in JavaScript](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/). To keep complexity low, normal inheritance was used for Collections, and the list of entities is accessed explicitly using the `list` property.


## Note on circular dependencies

The Ruby repository this module is based on contains circular references. This is happening when we pass the reference to the `PopoloJSON` class to all the collection constructors in the top level. For example, when you call the property `.areas`, you get the instance of areas that contains a reference to `PopoloJSON` that contains the areas, etc. If you do `.areas.popolo.areas`, you get the same instance, if you do `.areas.popolo.areas.popolo.areas` you get the same instance, etc.

This was done so that there was no collection instantiation code in multiple places, so that if the interface of `Collection` changes you don't have to change it in multiple places.

Circular references seem to only really be a problem when you come to garbage collect, if and only if, you have a reference counting garbage collector that doesn’t do anything to detect orphaned circular references. A quick peruse makes it look like Ruby avoids this, and JavaScript garbage collector [should manage this properly as well](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Cycles_are_not_a_problem_anymore).
