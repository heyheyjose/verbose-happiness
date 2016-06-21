#### Flickr Test

A simple page that pulls photos from Flickr using their API and displays them in a pin-board style. The purpose of this exercise was to practice TDD.

![](https://github.com/heyheyjose/verbose-happiness/raw/master/screenshots/page.png)

##### Running the tests

Clone the repo, then run `npm i`.

You will need to have Mocha already installed `npm i mocha -g` (this assumes you have [Node/NPM](https://nodejs.org/en/) as well).

Then the following command will run any files that are suffixed as "-spec":
```
mocha --reporter=nyan ./*-spec.js
```

_Note: you will have to supply your own Flickr API key_
