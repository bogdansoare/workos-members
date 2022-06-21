import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@/lib/stitches.config'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/CabinetGrotesk-Variable.woff2"
            crossOrigin="anonymous"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
