---
sidebar_position: 4
---

# 레이아웃

리액트 모델을 사용하면 [페이지](./pages.md)를 일련의 컴포넌트로 분해할 수 있습니다. 이러한 컴포넌트 중 많은 부분이 페이지 간에 재사용되는 경우가 많습니다.

예를 들어 모든 페이지에 동일한 내비게이션과 바닥글이 있을 수 있습니다.

```jsx title="components/layout.js"
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## 예시

### 사용자 정의 앱에서의 단일 공유 레이아웃

전체 앱에 하나의 레이아웃만 있는 경우 [커스텀 앱](https://nextjs.org/docs/advanced-features/custom-app)을 만들고 앱을 레이아웃으로 래핑할 수 있습니다. `<Layout />` 컴포넌트는 페이지를 변경할 때 재사용되기 때문에 입력 값과 같은 컴포넌트의 상태가 유지됩니다.

```jsx title="pages/_app.js"
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 페이지별 레이아웃

복수의 레이아웃이 필요한 경우, 페이지에 `getLayout` 프로퍼티를 추가하여 레이아웃에 대한 리액트 컴포넌트를 반환할 수 있습니다. 이를 통해 페이지별로 레이아웃을 정의할 수 있습니다. 함수를 반환하기 때문에 원하는 경우 복잡한 중첩 레이아웃을 가질 수 있습니다.

```jsx title="pages/index.js"
import Layout from '../components/layout';
import NestedLayout from '../components/nested-layout';

export default function Page() {
  return {
    /** 콘텐츠 */
  };
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
```

```jsx title="pages/_app.js"
export default function MyApp({ Component, pageProps }) {
  // 페이지 수준의 레이아웃이 존재한다면 사용합니다.
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

페이지 사이를 탐색할 때 단일 페이지 앱(SPA) 경험에 대한 페이지 상태(입력 값, 스크롤 위치 등)를 유지하려고 합니다.

이 레이아웃 패턴은 페이지 전환 사이에 리액트 컴포넌트 트리가 유지되기 때문에 상태가 지속되게 합니다. 컴포넌트 트리를 사용하여 리액트는 상태를 유지하기 위해 변경된 요소를 알 수 있습니다.

:::note 참고

이 프로세스를 [재조정](https://ko.reactjs.org/docs/reconciliation.html)이라고 부르며, 이는 리액트가 변경된 요소를 이해하는 방법입니다.

:::

### 타입스크립트 사용하기

타입스크립트를 사용할 때는 먼저 `getLayout` 함수가 포함된 페이지에 대한 새 타입을 만들어야 합니다. 그런 다음 이전에 만든 타입을 사용하도록 `Component` 프로퍼티를 재정의하는 새 `AppProps` 타입을 생성해야 합니다.

```tsx title="pages/index.tsx"
import type { ReactElement } from 'react';
import Layout from '../components/layout';
import NestedLayout from '../components/nested-layout';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export default Page;
```

```tsx title="pages/_app.tsx"
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 페이지 수준의 레이아웃이 존재한다면 사용합니다.
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

### 데이터 가져오기

레이아웃 내부에서는 `useEffect`나 [SWR](https://swr.vercel.app/)과 같은 라이브러리를 사용하여 클라이언트 측에서 데이터를 가져올 수 있습니다. 이 파일은 [페이지](./pages.md)가 아니므로 현재는 `getStaticProps`나 `getServerSideProps`를 사용할 수 없습니다.

```jsx title="components/layout.js"
import useSWR from 'swr';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/navigation', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```
