---
sidebar_position: 6
---

# 글꼴 최적화

버전 10.2부터 넥스트에는 웹 글꼴 최적화가 내장되어 있습니다.

기본적으로 넥스트는 빌드 타임에 글꼴 CSS를 자동으로 인라인하여 글꼴 선언을 가져오기 위한 추가 왕복을 제거합니다. 이를 통해 [FCP(First Contentful Paint)](https://web.dev/fcp/)과 [LCP(Large Contentful Paint](https://vercel.com/blog/core-web-vitals#largest-contentful-paint))가 개선됩니다.

예시:

```jsx
// 이전
<link
  href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
  rel="stylesheet"
/>

// 이후
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<style data-href="https://fonts.googleapis.com/css2?family=Inter&display=optional">
  @font-face{font-family:'Inter';font-style:normal...
</style>
```

## 사용법

넥스트 앱에 웹 글꼴을 추가하려면 [커스텀 `Document`](https://nextjs.org/docs/advanced-features/custom-document)에 글꼴을 추가합니다.

```jsx
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

`next/head`에 글꼴을 추가하는 것은 특정 페이지에만 적용되고 스트리밍 아키텍처에서는 작동하지 않기 때문에 권장하지 않습니다.

자동 웹 글꼴 최적화는 현재 구글 글꼴과 Typekit을 지원하며 곧 다른 글꼴 제공자도 지원할 예정입니다. 또한 [로딩 전략](https://github.com/vercel/next.js/issues/21555)과 `font-display` 값에 대한 제어 기능을 추가할 계획입니다.

자세한 내용은 [Google 글꼴 표시](https://nextjs.org/docs/messages/google-font-display)를 참조합니다.

:::note 참고

글꼴 최적화는 현재 자체 호스팅 글꼴을 지원하지 않습니다.

:::

## 최적화 비활성화하기

넥스트가 글꼴을 최적화하는 것을 원하지 않으면 비활성화할 수 있습니다.

```js title="next.config.js"
module.exports = {
  optimizeFonts: false,
};
```
