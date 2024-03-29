---
sidebar_position: 4
---

# 증분형 정적 재생성

넥스트를 사용하면 사이트를 구축한 후 정적 페이지를 만들거나 갱신할 수 있습니다. ISR(Incremental Static Regeneration)을 사용하면 전체 사이트를 다시 빌드할 필요 없이 페이지별로 정적 생성을 사용할 수 있습니다. ISR을 사용하면 수많은 페이지로 확장하면서 정적 생성의 이점을 유지할 수 있습니다.

ISR을 사용하려면 `getStaticProps`에 `revalidate` 프롭을 추가합니다.

```jsx
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 이 함수는 서버 측에서 빌드 타임에 호출됩니다.
// 재검증이 활성화되고 새 요청이 들어오면 서버리스 함수로 다시 호출될 수 있습니다.
export async function getStaticProps() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // 넥스트는 다음 경우에 페이지 재생성을 시도할 것입니다.
    // - 요청이 들어왔을 때
    // - 최대 10초에 한 번
    revalidate: 10, // 초 단위
  };
}

// 이 함수는 서버 측에서 빌드 타임에 호출됩니다.
// 경로가 생성되지 않았다면 서버리스 함수로 다시 호출될 수 있습니다.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // posts에 기반해 미리 렌더링하고 싶은 paths를 얻습니다.
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // 빌드 타임에 이 paths만 미리 렌더링할 것입니다.
  // { fallback: blocking }이라는 경로가 존재하지 않으면
  // 페이지를 서버 측에서 주문형으로 렌더링합니다.
  return { paths, fallback: 'blocking' };
}

export default Blog;
```

빌드 타임에 사전 렌더링된 페이지에 대한 요청이 이루어지면 처음에는 캐시된 페이지가 표시됩니다.

- 초기 요청 후 10초 이전에 페이지에 대한 모든 요청은 캐시되고 즉각적입니다.
- 10초 후의 다음 요청은 여전히 캐시된(오래된) 페이지를 표시합니다.
- 넥스트는 뒤에서 페이지 재생성을 트리거합니다.
- 페이지가 성공적으로 생성되면 넥스트는 캐시를 무효화하고 갱신된 페이지를 표시합니다. 백그라운드 재생성이 실패하면 이전 페이지는 변경되지 않습니다.

생성되지 않은 경로에 대한 요청이 만들어지면 넥스트는 첫 번째 요청에서 페이지를 서버에서 렌더링합니다. 이후의 요청은 캐시에서 정적 파일을 제공합니다. 베르셀의 ISR은 [캐시를 전역적으로 유지하고 롤백을 처리합니다](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration).

:::note 참고

업스트림 데이터 제공자가 기본적으로 캐싱을 활성화했는지 확인할 필요가 있습니다. `useCdn: false`와 같이 비활성화해야 할 수도 있습니다. 그러지 않으면 재검증에서 ISR 캐시를 갱신하기 위해 새로운 데이터를 가져올 수 없습니다. 캐싱은 `Cache-Control` 헤더를 반환할 때 CDN(요청 중인 엔드포인트의 경우)에서 발생할 수 있습니다.

:::

## 주문형 재검증

`revalidate` 시간을 `60`으로 설정하면 모든 방문자는 1분 동안 동일한 버전의 사이트를 보게 됩니다. 캐시를 무효화하는 유일한 방법은 1분이 지난 후에 누군가가 해당 페이지를 방문하는 것입니다.

`v12.2.0`부터 넥스트는 주문형 ISR을 지원하여 특정 페이지에 대한 넥스트 캐시를 수동으로 제거할 수 있습니다. 이렇게 하면 다음 경우에 사이트를 더 쉽게 갱신할 수 있습니다.

- 헤드리스 CMS의 콘텐츠가 생성되거나 갱신됨
- 전자상거래 메타데이터가 변경됨 (가격, 설명, 카테고리, 리뷰 등)

`getStaticProps` 내부에서는, 주문형 재검증을 사용하기 위해 `revalidate`를 명시할 필요는 없습니다. `revalidate`를 생략하면 넥스트는 기본값인 `false`(재검증 없음)를 사용하고 `revalidate()`가 호출될 때만 요청형으로 페이지를 재검증합니다.

:::note 참고

주문형 ISR 요청에 대해서는 [미들웨어](https://nextjs.org/docs/advanced-features/middleware)가 실행되지 않습니다. 대신 재검증을 원하는 특정 경로에 대해 `revalidate()`을 호출합니다.

예를 들어 `pages/blog/[slug].js`가 있고 `/post-1`을 `/blog/post-1`로 재작성했다면 `res.revalidate('/blog/post-1')`을 호출해야 합니다.

:::

### 주문형 재검증 사용하기

먼저 넥스트 앱에서만 알려진 암호 토큰을 만듭니다. 이 암호는 재검증 API 경로에 대한 무단 액세스를 방지하는 데 사용됩니다.

다음과 같은 URL 구조를 사용하여(수동으로 또는 웹훅을 사용하여) 경로에 접근할 수 있습니다.

```
https://<your-site.com>/api/revalidate?secret=<token>
```

그런 다음 암호를 앱에 [환경 변수](../environment-variables.md)로 추가합니다.

마지막으로 다음과 같이 재검증 API 경로를 생성합니다.

```jsx title="pages/api/revalidate.js"
export default async function handler(req, res) {
  // 암호를 확인해서 요청이 유효한지 확인합니다.
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // 재작성된 경로가 아닌 실제 경로여야 합니다.
    // 예를 들어 '/blog/[slug]'는 '/blog/post-1'여야 합니다.
    await res.revalidate('/path-to-revalidate');
    return res.json({ revalidated: true });
  } catch (err) {
    // 오류가 있으면 넥스트는 마지막으로 생성된 페이지를 계속 표시합니다.
    return res.status(500).send('Error revalidating');
  }
}
```

참고로 주문형 재검증을 아직 생성되지 않은 경로에 실행하면 `404` 오류가 발생합니다.

### 개발 중에 주문형 ISR 테스트하기

`next dev`를 사용하여 로컬에서 실행할 때, `getStaticProps`는 모든 요청마다 호출됩니다. 주문형 ISR 설정이 올바른지 확인하려면 [프로덕션 빌드](https://nextjs.org/docs/api-reference/cli#build)를 만들고 [프로덕션 서버](https://nextjs.org/docs/api-reference/cli#production)를 시작해야 합니다.

```bash
$ next build
$ next start
```

그런 다음 정적 페이지가 성공적으로 재검증되었음을 확인할 수 있습니다.

## 오류 처리와 재검증

백그라운드 재생성을 처리할 때 `getStaticProps` 내부에 오류가 있거나 수동으로 오류가 발생하면, 가장 최근에 성공적으로 생성된 페이지가 계속 표시됩니다. 다음 후속 요청에서 넥스트는 `getStaticProps` 호출을 재시도합니다.

```jsx
export async function getStaticProps() {
  // 이 요청이 오류를 던지면 넥스트는 현재 표시된 페이지를
  // 무효화하고 다음 요청에서 getStaticProps을 재시도합니다.
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  if (!res.ok) {
    // 서버 오류가 있으면 반환 대신 오류를 발생시켜
    // 다음 요청이 성공할 때까지 캐시가 갱신되지 않게 합니다.
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  // 요청이 성공하면 posts를 반환하고 10초마다 재검증을 합니다.
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
```
