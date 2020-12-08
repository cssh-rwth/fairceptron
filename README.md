# FairCeptron

> Frontend and server for measuring perceptions of algorithmic fairness

## Deploy with Docker

First, create secret credentials in `.env` (see `.env.example`).
Then, setup the Nuxt.js webserver including the Express.js backend and the MongoDB database with
```bash
$ docker-compose up --build -d
```
Make sure to populate the database with questions after deploying for the first time.

## Nuxt.js Build Setup

To start only the Nuxt.js server with an external database, configure the database connection in `.env`.
Then run
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```
Check out [Nuxt.js docs](https://nuxtjs.org) for more information on Nuxt.js.
