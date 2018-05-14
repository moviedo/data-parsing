# Data parsing app

Script used to parse data and POST to server.

## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [yarn](https://yarnpkg.com/en/docs): `npm -g yarn`
* Run:
    * `yarn start` — runs app to digest data and post to server.

## Technical Specification

In order to deal with the intermittent request failures we do the following:

1) Setup an Queue system like AWS SQS for which we add the ingested data.
1) Rewrite current script to add items to the queue instead of POSTing directly to service.
1) Create a AWS Lambda function to process items off our queue. If in the process of POSTing an item there is intermittent request failures, then add data back to the queue. Lambda function will continue to cycle through queue until it is empty.

This will insure that all items are POSTed to the service while handling intermittment request failures.
