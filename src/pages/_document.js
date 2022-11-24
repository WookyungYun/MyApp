//SSR에 관여하는 로직 혹은 정적인 페이지를 로드하는데 사용되는 로직을 추가하는데 사용한다.

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Home from '.';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
