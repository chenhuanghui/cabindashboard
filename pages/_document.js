import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="cabinfood dashboard - shortcut to success furture" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/7453021.js"></script>
            {/* GA-init */}
            {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168839658-1"></script> */}
          
          
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument