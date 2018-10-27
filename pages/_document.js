import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class Documento extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href='/static/images/favicon.ico' />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
