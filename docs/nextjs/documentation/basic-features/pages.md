---
sidebar_position: 1
---

# 페이지

넥스트에서 **페이지**는 `pages` 디렉터리의 `.js`, `.jsx`, `.ts`, `.tsx` 파일에서 내보낸 리액트 컴포넌트입니다. 각 페이지는 파일 이름을 기반으로 하는 경로와 연결됩니다.

예시로 다음와 같이 리액트 컴포넌트를 내보내는 `pages/about.js`을 생성하면 `/about`에서 접근이 가능해집니다.

```jsx
function About() {
  return <div>About</div>;
}

export default About;
```

### 동적 경로가 있는 페이지

넥스트는 동적 경로가 있는 페이지를 지원합니다.

예를 들어 `pages/posts/[id].js`라는 파일을 생성하면 `posts/1`, `posts/2`에서 접근이 가능해집니다.

:::note 참고

동적 라우팅에 대해 자세히 알아보려면 [동적 라우팅 문서](../routing/dynamic-routes.md)를 확인하세요.

:::

## 사전 렌더링

기본적으로 넥스트는 모든 페이지를 **미리 렌더링합니다**. 넥스트는 클라이언트 측 자바스크립트에서 모든 작업을 수행하는 대신 각 페이지에 대해 미리 HTML을 생성합니다. 사전 렌더링은 더 나은 성능과 SEO를 가집니다.

생성된 각 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결됩니다. 브라우저에서 페이지를 로드하면 해당 자바스크립트 코드가 실행되어 페이지를 완전한 대화형으로 만듭니다. 이 과정을 **수화(hydration)**라고 부릅니다.

### 두 가지 방식의 사전 렌더링

넥스트에는 **정적 생성**과 **SSR**이라는 두 가지 방식의 사전 렌더링이 있습니다. 둘의 차이점은 페이지에 대한 **HTML을 생성하는 시기**입니다.

- 정적 생성(권장) - **빌드 타임**에서 HTML이 생성되며 각 요청에서 재사용됨
- SSR - **각 요청**마다 HTML이 생성됨

넥스트를 사용하면 각 페이지에 사용할 사전 렌더링 방식을 선택할 수 있습니다. 대부분의 페이지에는 정적 생성을 사용하고 일부 페이지에는 SSR을 사용하여 하이브리드 넥스트 앱을 만들 수 있습니다.

성능상의 이유로 SSR보다 **정적 생성**을 사용하는 것이 좋습니다. 정적으로 생성된 페이지는 성능 향상을 위한 추가 설정 없이 CDN에서 캐시가 가능합니다. 그러나 경우에 따라 SSR이 유일한 옵션일 수 있습니다.

CSR을 정적 생성, SSR과 함께 사용하는 것도 가능합니다. 페이지의 일부는 클라이언트 측 자바스크립트로 완전히 렌더링될 수 있습니다. 자세한 내용은 [데이터 가져오기](./data-fetching/client-side.md) 문서를 참조하세요.

## 정적 생성

페이지가 정적 생성을 사용하는 경우에는 페이지의 HTML이 빌드 타임에 생성됩니다. 즉, 프로덕션에서 `next build`를 실행할 때 페이지 HTML이 생성됩니다. 이 HTML은 각 요청에서 재사용되며 CDN에 의해 캐시될 수 있습니다.

넥스트에서는 데이터가 있는 페이지나 없는 페이지를 정적으로 생성할 수 있습니다. 각각의 경우를 살펴보겠습니다.

### 데이터가 없는 정적 생성

기본적으로 넥스트는 데이터를 가져오지 않는 정적 생성을 사용하여 페이지를 미리 렌더링합니다.

예시:

```jsx
function About() {
  return <div>About</div>;
}

export default About;
```

이 페이지는 미리 렌더링할 외부 데이터를 가져올 필요가 없습니다. 이와 같은 경우, 넥스트는 빌드 타임에 페이지당 하나의 HTML 파일을 생성합니다.

### 데이터가 있는 정적 생성

일부 페이지는 사전 렌더링을 위해 외부 데이터를 가져와야 합니다. 두 가지 시나리오가 있으며 하나만 적용하거나 둘 다 적용할 수 있습니다. 각각의 경우에 넥스트가 제공하는 다음 기능을 사용할 수 있습니다.

1. 페이지 **콘텐츠**가 외부 데이터에 의존 - `getStaticProps`을 사용
2. 페이지 **경로**가 외부 데이터에 의존 - `getStaticPaths`을 사용(보통 `getStaticProps`에 추가로 사용)

#### 시나리오 1: 페이지 콘텐츠가 외부 데이터에 의존

예시로 블로그 페이지는 CMS(콘텐츠 관리 시스템)에서 블로그 게시물 목록을 가져와야 할 수 있습니다.

```jsx
// TODO: 이 페이지를 사전 렌더링하려면 먼저 어떤 API 엔드포인트를 호출해서
// posts을 가져와야 합니다.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export default Blog;
```

사전 렌더링에서 해당 데이터를 가져오기 위해, 넥스트는 동일한 파일에서 `getStaticProps`라는 `async` 함수를 `export`하는 것을 허용합니다. 이 함수는 빌드 타임에 호출되며 가져온 데이터를 사전 렌더링 시 페이지의 `props`에 전달합니다.

```jsx
function Blog({ posts }) {
  // posts를 렌더링합니다...
}

// 이 함수는 빌드 타임에 호출됩니다.
export async function getStaticProps() {
  // posts를 가져오기 위해 외부 API 엔드포인트를 호출합니다.
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // { props: { posts } }를 반환하면
  // Blog 컴포넌트는 빌드 타임에 posts를 프롭으로 받습니다.
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

`getStaticProps`의 작동 방식에 대해 자세히 알아보려면 [데이터 가져오기 문서](./data-fetching/get-static-props.md)를 확인하세요.

#### 시나리오 2: 페이지 경로가 외부 데이터에 의존

넥스트를 사용하면 **동적 경로**를 가진 페이지를 만들 수 있습니다. 예를 들어 `id`에 기반한 단일 블로그 게시물을 표시하기 위해 `pages/posts/[id].js`라는 파일을 생성할 수 있습니다. 이렇게 하면 `posts/1`에 접근할 때 블로그 포스트를 `id: 1`로 표시할 수 있습니다.

그러나 빌드 타임에 어떤 `id`를 사전 렌더링할지가 외부 데이터에 의존하는 경우가 있을 수 있습니다.

##### 예시

데이터베이스에 하나의 블로그 게시물(`id: 1`)만 추가했다고 가정해 보겠습니다. 이 경우에는 빌드 타임에 `posts/1`만 사전 렌더링하기를 원할 것입니다.

나중에 두 번째 게시물을 `id: 2`로 추가할 수 있습니다. 그러면 `posts/2`도 사전 렌더링하기를 원할 것입니다.

따라서 사전 렌더링되는 페이지 경로는 외부 데이터에 따라 달라집니다. 넥스트에서는 이를 처리하기 위해, 동적 페이지(`pages/posts/[id].js`)에서 `getStaticPaths`라는 `async` 함수를 `export`할 수 있습니다. 이 함수는 빌드 타임에 호출되며 사전 렌더링할 경로를 지정할 수 있습니다.

```jsx
// 이 함수는 빌드 타임에 호출됩니다.
export async function getStaticPaths() {
  // posts를 가져오기 위해 외부 API 엔드포인트를 호출합니다.
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // 게시물에 기반해 사전 렌더링하고 싶은 경로를 구합니다.
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // 빌드 타임에 이 경로를 사전 렌더링합니다.
  // { fallback: false }는 paths 이외의 경로가 404가 된다는 것을 의미합니다.
  return { paths, fallback: false };
}
```

또한 `pages/posts/[id].js`에서는 해당 `id`로 포스트의 데이터를 가져와 페이지를 사전 렌더링할 수 있도록 `getStaticProps`를 내보내야 합니다.

```jsx
function Post({ post }) {
  // post를 렌더링합니다...
}

export async function getStaticPaths() {
  // ...
}

// 이 함수는 빌드 타임에 호출됩니다.
export async function getStaticProps({ params }) {
  // params에는 포스트의 id가 들어 있습니다.
  // 경로가 '/posts/1'과 같다면 arams.id는 1입니다.
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // post 데이터를 페이지에 프롭으로 전달합니다.
  return { props: { post } };
}

export default Post;
```

`getStaticPaths`의 작동 방식에 대해 자세히 알아보려면 [데이터 가져오기 문서](./data-fetching/get-static-paths.md)를 확인하세요.

:::note 참고

정적 생성을 언제 사용해야 할지 궁금하다면 [사전 렌더링과 데이터 가져오기](../basic-concepts/pre-rendering-and-data-fetching.mdx#정적-생성과-ssr은-언제-사용해야-하나요)를 확인하세요.

:::

## SSR

동적 렌더링으로도 부릅니다.

페이지가 SSR을 사용하는 경우에는 페이지 HTML이 **각 요청**마다 생성됩니다.

페이지에 SSR을 사용하려면 `getServerSideProps`라는 `async` 함수를 `export`해야 합니다. 이 함수는 매 요청마다 서버에서 호출됩니다.

예를 들어 페이지에서 자주 갱신되는 데이터(외부 API에서 가져옴)를 미리 렌더링해야 한다고 가정해 보겠습니다. 해당 데이터를 가져와 `Page`에게 전달하는 `getServerSideProps`을 다음과 같이 작성할 수 있습니다.

```jsx
function Page({ data }) {
  // data를 렌더링합니다...
}

// 이 함수는 매 요청마다 호출됩니다.
export async function getServerSideProps() {
  // 외부 API에서 data를 가져옵니다.
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // data를 페이지에 프롭으로 전달합니다.
  return { props: { data } };
}

export default Page;
```

보시다시피 `getServerSideProps`는 `getStaticProps`와 유사합니다. 둘의 차이점은 `getServerSideProps`가 빌드 타임이 아니라 모든 요청마다 실행된다는 점입니다.

`getServerSideProps`의 작동 방식에 대해 자세히 알아보려면 [데이터 가져오기 문서](./data-fetching/get-server-side-props.md)를 확인하세요.

## 요약

넥스트의 두 가지 사전 렌더링에 대해 알아보았습니다.

- 정적 생성(권장) - HTML은 **빌드 타임**에 생성되며 각 요청에서 재사용됩니다. 페이지에서 정적 생성을 사용하려면 페이지 컴포넌트를 내보내거나 `getStaticProps`(필요한 경우 `getStaticPaths`도)를 내보내면 됩니다. 이 방식은 사용자의 요청에 앞서 미리 렌더링할 수 있는 페이지에 적합합니다. CSR과 함께 사용하여 추가 데이터를 가져오는 것도 가능합니다.
- SSR - HTML은 **각 요청**마다 생성됩니다. 페이지에서 SSR을 사용하려면 `getServerSideProps`을 내보냅니다. SSR은 정적 생성보다 성능이 떨어지므로 반드시 필요한 경우에만 사용합니다.
