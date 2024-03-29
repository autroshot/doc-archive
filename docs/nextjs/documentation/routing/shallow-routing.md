---
sidebar_position: 4
---

# 얕은 라우팅

얕은 라우팅을 사용하면 [`getServerSideProps`](../basic-features/data-fetching/get-server-side-props.md), [`getStaticProps`](../basic-features/data-fetching/get-static-props.md), [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)와 같은 데이터 가져오기 메서드를 다시 실행하지 않고 URL을 변경할 수 있습니다.

갱신된 `pathname`과 `query`를 [`router` 객체](https://nextjs.org/docs/api-reference/next/router#router-object)([`useRouter`](https://nextjs.org/docs/api-reference/next/router#userouter) 또는 [`withRouter`](https://nextjs.org/docs/api-reference/next/router#withrouter)로 추가됨)를 통해 상태를 잃지 않고 받게 됩니다.

얕은 라우팅을 활성화하려면 `shallow` 옵션을 `true`로 설정해야 합니다.

예시:

```jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 현재 URL은 '/'입니다.
function Page() {
  const router = useRouter();

  useEffect(() => {
    // 항상 첫 렌더링 후에 내비게이션을 수행합니다.
    router.push('/?counter=10', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // 카운터가 변경됩니다.
  }, [router.query.counter]);
}

export default Page;
```

URL이 `/?counter=10`로 갱신됩니다. 페이지는 교체되지 않으며 경로의 상태만 변경됩니다.

다음과 같이 [`componentDidUpdate`](https://ko.reactjs.org/docs/react-component.html#componentdidupdate)로도 URL의 변화를 확인할 수 있습니다.

```jsx
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // 무한 루프를 피하기 위해 props가 변경되었는지 확인합니다.
  if (query.counter !== prevProps.router.query.counter) {
    // 새 질의를 기반으로 데이터 가져오기
  }
}
```

## 주의 사항

얕은 라우팅은 현재 페이지의 URL 변경에서만 작동합니다.

예를 들어 `pages/about.js`라는 다른 페이지가 있으며 다음을 실행한다고 가정해 보겠습니다.

```jsx
router.push('/?counter=10', '/about?counter=10', { shallow: true });
```

`pages/about.js`는 새 페이지이므로 현재 페이지를 언로드하고 새 페이지를 로드하며, 얕은 라우팅을 요청했음에도 데이터 가져오기를 기다립니다.

미들웨어와 함께 얕은 라우팅을 사용하면 새 페이지가 현재 페이지와 일치하는지 확인할 수 없습니다. 이는 미들웨어가 페이지를 동적으로 재작성할 수 있으며, 얕은 라우팅을 건너뛰는 데이터 가져오기인지 클라이언트 측에서 확인할 수 없기 때문입니다. 따라서 얕은 경로 변경은 항상 얕게 처리되어야 합니다.
