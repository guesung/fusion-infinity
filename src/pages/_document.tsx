import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='https://fonts.cdnfonts.com/css/sf-pro-display'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link rel='icon' href='/svg/main-logo.svg' sizes='any' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
