'use strict';

require('dotenv').config()

const express = require('express');
const next = require('next');
const session = require('express-session');
const cookie = require('cookie-parser');
const ms = require('milliseconds');
const RedisStore = require('connect-redis')(session);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app
  .prepare()
  .then(() => {
    server.set('trust proxy', true);

    server.use(cookie(process.env.COOKIE_SECRET));
    server.use(session({
      name: 'SESSION-ID',
      saveUninitialized: false,
      resave: true,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        prefix: 'facturacion-electronica.session.',
        logErrors: true
      }),
      secret: process.env.COOKIE_SECRET,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.COOKIE_SECURE,
        sameSite: false,
        maxAge: ms.days(1)
      }
    }));

    server.use((req, res, next) => {
      // console.log(' Request headers: ', req.headers);
      // console.log(' Session identifier: ', req.session.id);

      return handle(req, res, req.url);
    });

    server.listen(3000, err => {
      if (err) throw err
        console.log('> Ready on http://localhost:3000')
    });
  });
