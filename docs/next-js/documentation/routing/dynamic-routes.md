---
sidebar_position: 2
---

# 동적 경로

미리 정의된 경로만을 사용하는 것은 복잡한 앱에 충분하지 않습니다. 넥스트에서는 페이지에 대괄호를 추가하여(`[param]`) 동적 경로(URL 슬러그, 예쁜 URL 등으로도 불림)를 생성할 수 있습니다.

다음은 `pages/post/[pid].js` 페이지에 대한 예시입니다.

```jsx
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};

export default Post;
```

`/post/1`, `/post/abc`와 같은 모든 경로는 `pages/post/[pid].js`와 일치할 것입니다. 일치하는 경로 매개변수는 페이지에 쿼리 매개변수로 전송되고 다른 쿼리 매개변수와 병합됩니다.

예를 들어 경로 `/post/abc`는 다음과 같은 `query` 객체를 가집니다.

```json
{ "pid": "abc" }
```

마찬가지로 경로 `/post/abc?foo=bar`는 다음의 `query` 객체를 가집니다.

```json
{ "foo": "bar", "pid": "abc" }
```

그러나 경로 매개변수는 동일한 이름을 가진 쿼리 매개변수를 재정의합니다. 예를 들어 경로 `/post/abc?pid=123`는 다음의 `query` 객체를 가집니다.

```json
{ "pid": "abc" }
```

복수의 동적 경로 세그먼트는 동일한 방식으로 작동합니다. 페이지 `pages/post/[pid]/[comment].js`는 `/post/abc/a-comment` 경로와 일치하고 `query` 객체는 다음과 같습니다.

```json
{ "pid": "abc", "comment": "a-comment" }
```

동적 경로로의 클라이언트 측 내비게이션은 [`next/link`](https://nextjs.org/docs/api-reference/next/link)에서 처리됩니다. 위에서 사용된 경로에 대한 링크를 작성하면 다음과 같습니다.

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/post/abc">
          <a>Go to pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href="/post/abc?foo=bar">
          <a>Also goes to pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href="/post/abc/a-comment">
          <a>Go to pages/post/[pid]/[comment].js</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

자세한 내용은 [페이지 간 연결하기](./introduction.md#페이지-간-연결하기)에서 확인하세요.

### 모든 경로 잡기

대괄호 안에 점 세 개(`...`)를 추가해 동적 경로를 확장하여 모든 경로를 잡을 수 있습니다.

예를 들어 `pages/post/[...slug].js`는 `/post/a`뿐만 아니라 `/post/a/b`, `/post/a/b/c` 등을 일치시킵니다.

:::note 참고

`slug` 대신 `[...param]`와 같은 다른 이름을 사용할 수 있습니다.

:::

일치하는 매개변수는 페이지에 쿼리 매개변수(예시에서는 `slug`)로 전송되며, 항상 배열이므로 경로 `/post/a`의 `query` 객체는 다음과 같습니다.

```json
{ "slug": ["a"] }
```

그리고 `/post/a/b`와 같은 경로에는 다음과 같이 새 매개변수가 배열에 추가됩니다.

```json
{ "slug": ["a", "b"] }
```

### 선택적으로 모든 경로 잡기

'모든 경로 잡기'는 이중 대괄호에 매개변수를 넣어서(`[[...slug]]`) 선택적으로 만들 수 있습니다.

예를 들어 `pages/post/[[...slug]].js`는 `/post`, `/post/a`, `/post/a/b`를 일치시킵니다.

'선택적으로 모든 경로 잡기'의 주요 차이점은 매개변수가 없는 경로도 일치한다는 점입니다. `/post`가 그 예입니다.

`query` 객체는 다음과 같습니다.

```json
{ } // '/post'를 얻습니다. (빈 객체)
{ "slug": ["a"] } // '/post/a'를 얻습니다. (단일 요소를 가진 배열)
{ "slug": ["a", "b"] } // '/post/a/b'를 얻습니다. (여러 요소를 가진 배열)
```

## 주의 사항

- 미리 정의된 경로는 동적 경로보다 우선하며 동적 경로는 모든 경로를 잡습니다.

  예시:

  - `pages/post/create.js`는 `/post/create`를 일치시킴
  - `pages/post/[pid].js`는 `/post/1`, `/post/abc`를 일치시킴. `/post/create`는 일치시키지 않음
  - `pages/post/[...slug].js`는 `/post/1/2`, `/post/a/b/c`를 일치시킴. `/post/create`, `/post/abc`는 일치시키지 않음

- [자동 정적 최적화](https://nextjs.org/docs/advanced-features/automatic-static-optimization)에 의해 정적으로 최적화된 페이지는 경로 매개변수를 제공하지 않고 수화됩니다. 즉 `query`는 빈 객체(`{}`)가 됩니다.

  수화 이후에 넥스트는 `query` 객체의 경로 매개변수를 제공하기 위해 앱에 대한 갱신을 트리거합니다.
