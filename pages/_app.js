import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import App, { Container } from 'next/app'
import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

addLocaleData([...en, ...es]);

export default class FacturacionElectronica extends App {
  render () {
    const { Component, pageProps } = this.props
    const now = Date.now()

    return (
      <Container>
        <IntlProvider locale='es-GT' initialNow={now}>
          <Component {...pageProps} />
        </IntlProvider>
      </Container>
    )
  }
}
