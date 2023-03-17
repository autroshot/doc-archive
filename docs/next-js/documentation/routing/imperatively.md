---
sidebar_position: 3
---

# 직접 명령하기

[`next/link`](https://nextjs.org/docs/api-reference/next/link)는 대부분의 라우팅을 처리할 수 있지만 원한다면 다른 방법을 사용해 클라이언트 측 내비게이션을 수행할 수 있습니다. [`next/router` 문서](https://nextjs.org/docs/api-reference/next/router)에서 관련 내용을 확인하세요.

다음 예시는 [`useRouter`](https://nextjs.org/docs/api-reference/next/router#userouter)를 사용하여 기본적인 페이지 내비게이션을 수행하는 방법을 보여줍니다.

```jsx
import { useRouter } from 'next/router';

export default function ReadMore() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/about')}>
      Click here to read more
    </button>
  );
}
```
