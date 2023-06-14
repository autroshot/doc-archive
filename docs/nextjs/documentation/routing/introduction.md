---
sidebar_position: 1
sidebar_label: 소개
---

# 라우팅

넥스트에는 [페이지 개념](../basic-features/pages.md)을 기반으로 구축된 파일 시스템 기반 라우터가 있습니다.

`pages` 디렉터리에 파일이 추가되면 자동으로 경로로 사용할 수 있습니다. `pages` 디렉터리 내의 파일은 가장 일반적인 패턴을 정의하는 데 사용할 수 있습니다.

#### 색인 경로

라우터는 이름이 `index`인 파일을 디렉터리의 루트로 자동으로 라우팅합니다.

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`

#### 중첩 경로

라우터는 중첩 파일을 지원합니다. 중첩된 폴더 구조를 생성하면 파일이 동일한 방식으로 자동으로 라우팅됩니다.

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

#### 동적 경로 세그먼트

동적 세그먼트를 일치시키기 위해 대괄호 구문을 사용할 수 있습니다. 이렇게 하면 명명된 매개변수를 일치시킬 수 있습니다.

- `pages/blog/[slug].js` → `/blog/:slug`(`/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings`(`/foo/settings`)
- `pages/post/[...all].js` → `/post/*`(`/post/2020/id/title`)

## 페이지 간 연결하기

넥스트 라우터를 사용하면 SPA과 유사하게 페이지 간에 클라이언트 측 경로 전환을 수행할 수 있습니다.

이러한 클라이언트 측 경로 전환을 수행하기 위해 `Link`라는 리액트 컴포넌트가 제공됩니다.

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

위의 예시에서는 복수의 링크를 사용합니다. 각 링크에는 다음 페이지로 향하는 경로(`href`)가 매핑됩니다.

- `/` → `pages/index.js`
- `/about` → `pages/about.js`
- `/blog/hello-world` → `pages/blog/[slug].js`

뷰포트의 모든 `<Link />`(초기 또는 스크롤로 인한)는 기본적으로 [정적 생성](../basic-features/data-fetching/get-static-props.md)을 사용하는 페이지와 해당 데이터를 미리 가져옵니다. 반면 [서버 렌더링](../basic-features/data-fetching/get-server-side-props.md) 경로의 데이터는 미리 가져오지 않습니다.

### 동적 경로에 연결하기

보간법(interpolation)을 사용하여 경로를 생성할 수 있는데 이는 [동적 경로 세그먼트](#동적-경로-세그먼트)에 유용합니다.

예를 들어 컴포넌트에 프롭으로 전달된 게시물 목록을 표시하려면 다음과 같이 코드를 작성할 수 있습니다.

```jsx
import Link from 'next/link';

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```

:::note 참고

경로의 utf-8 호환성을 위해 [`encodeURIComponent`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)가 사용되었습니다.

:::

또는 URL 객체를 사용하면 다음과 같습니다.

```jsx
import Link from 'next/link';

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```

`href`에서 경로 생성을 위해 보간법을 사용하는 대신 URL 객체를 사용했습니다.

- `pathname`은 `pages` 디렉터리에 있는 페이지의 이름입니다. 이 예시에서는 `/blog/[slug]`입니다.
- `query`는 동적 세그먼트가 있는 객체입니다. 이 예시에서는 `slug`입니다.

## 라우터 주입하기

리액트 컴포넌트에서 [`router` 객체](https://nextjs.org/docs/api-reference/next/router#router-object)에 접근하려면 [`useRouter`](https://nextjs.org/docs/api-reference/next/router#userouter) 또는 [`withRouter`](https://nextjs.org/docs/api-reference/next/router#withrouter)를 사용할 수 있습니다.

일반적으로 `useRouter`를 사용하는 것이 좋습니다.
