---
sidebar_position: 5
---

# 인증

인증(authentication)은 사용자가 누구인지 확인하는 반면 인가(authorization)는 사용자가 접근할 수 있는 항목을 제어합니다. 넥스트는 각각 다른 사용 사례를 위해 설계된 여러 인증 패턴을 지원합니다.

## 인증 패턴

필요한 인증 패턴을 식별하는 첫 번째 단계는 원하는 데이터 가져오기 전략을 파악하는 것입니다. 그런 다음 이 전략을 지원하는 인증 제공자를 결정할 수 있습니다.

두 가지 주요 패턴이 있습니다.

- [정적 생성](./basic-features/pages.md#정적-생성)을 사용하여 로딩 상태를 서버에서 렌더링한 다음 클라이언트 측에서 사용자 데이터를 가져옵니다.
- 인증되지 않은 콘텐츠의 깜빡임를 제거하기 위해 [서버 측](./basic-features/pages.md#ssr)에서 사용자 데이터를 가져옵니다.

### 정적으로 생성된 페이지에서 인증하기

넥스트는 차단 데이터 요구 사항이 없는 경우 페이지가 정적인지 자동으로 결정합니다. 이것은 페이지에 `getServerSideProps`와 `getInitialProps`가 없음을 의미합니다. 대신 페이지가 서버에서 로드 상태를 렌더링한 다음 클라이언트 측에서 사용자 데이터를 가져올 수 있습니다.

이 패턴의 장점 중 하나는 전역 CDN에서 페이지를 제공하고 `next/link`를 사용하여 미리 로드할 수 있다는 것입니다. 실제로 이 방식은 더 빠른 TTI([Time to Interactive](https://web.dev/interactive/))를 가집니다.

프로필 페이지 예시를 살펴보겠습니다. 이 페이지는 처음에 로딩 스켈레톤을 렌더링합니다. 사용자 요청이 완료되면 사용자 이름이 표시됩니다.

```jsx title="pages/profile.js"
import useUser from '../lib/useUser';
import Layout from '../components/Layout';

const Profile = () => {
  // 클라이언트 측에서 사용자를 가져옵니다.
  const { user } = useUser({ redirectTo: '/login' });

  // 서버 측에서 로딩 상태를 렌더링합니다.
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  // 사용자 요청이 완료되면 사용자를 표시합니다.
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

export default Profile;
```

실제 작동하는 [예시](https://iron-session-example.vercel.app/)를 확인하세요.

### 서버 렌더링 페이지에서 인증하기

페이지에서 `getServerSideProps` `async` 함수를 내보내는 경우, 넥스트는 `getServerSideProps`에서 반환된 데이터를 사용하여 각 요청에서 해당 페이지를 미리 렌더링합니다.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {}, // 페이지 컴포넌트에 프롭으로 전달될 것입니다.
  };
}
```

서버 측 렌더링을 사용하도록 프로필 예시를 바꿔 보겠습니다. 세션이 있는 경우, 페이지의 `Profile` 컴포넌트에 `user`를 `props`로 반환합니다. 이 예시에는 로딩 스켈레톤이 없습니다.

```jsx title="pages/profile.js"
import withSession from '../lib/session';
import Layout from '../components/Layout';

export const getServerSideProps = withSession(async function ({ req, res }) {
  const { user } = req.session;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});

const Profile = ({ user }) => {
  // 사용자를 표시합니다. 로딩 상태는 필요하지 않습니다.
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

export default Profile;
```

이 패턴의 장점은 리디렉션하기 전에 인증되지 않은 콘텐츠의 깜빡임를 방지한다는 것입니다. `getServerSideProps`의 사용자 데이터 가져오기가 인증 제공자에 대한 요청이 이행될 때까지 렌더링을 막는다는 것을 주목해야 합니다. 병목 현상을 방지하고 TTFB([Time to First Byte](https://web.dev/time-to-first-byte/))를 늘리려면 인증 조회가 빠른지 확인해야 합니다. 그러지 않으면 앞의 [정적 생성](#정적으로-생성된-페이지에서-인증하기)을 고려해야 합니다.

## 인증 제공자

이제 제공자에 따라 넥스트와 함께 사용하는 방식을 살펴보겠습니다.

### 나만의 데이터베이스 사용하기

사용자 데이터가 있는 기존 데이터베이스가 있는 경우 제공자에 구애받지 않는 오픈 소스 솔루션을 활용하고 싶을 것입니다.

- 낮은 수준의 암호화된 상태 비저장 세션 유틸리티를 원하는 경우 [`iron-session`](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)을 사용
- 내장 제공자(구글, 페이스북, 깃허브...), JWT, JWE, 이메일/비밀번호, 매직 링크 등을 포함하는 완전한 기능의 인증 시스템을 원하면 [`next-auth`](https://github.com/nextauthjs/next-auth-example)을 사용

이 두 라이브러리 모두 인증 패턴을 지원합니다. [패스포트](http://www.passportjs.org/)에 관심이 있다면 안전하고 암호화된 쿠키를 사용하는 예시도 있습니다.

- [with-passport](https://github.com/vercel/next.js/tree/canary/examples/with-passport)
- [with-passport-and-next-connect](https://github.com/vercel/next.js/tree/canary/examples/with-passport-and-next-connect)

### 다른 제공자

다른 인증 제공자 예시는 다음과 같습니다.

- [Auth0](https://github.com/vercel/next.js/tree/canary/examples/auth0)
- [Clerk](https://github.com/vercel/next.js/tree/canary/examples/with-clerk)
- [Firebase](https://github.com/vercel/next.js/tree/canary/examples/with-firebase-authentication)
- [Magic](https://github.com/vercel/next.js/tree/canary/examples/with-magic)
- [Nhost](https://github.com/vercel/next.js/tree/canary/examples/with-nhost-auth-realtime-graphql)
- [Ory](https://github.com/vercel/examples/tree/main/solutions/auth-with-ory)
- [Supabase](https://github.com/vercel/next.js/tree/canary/examples/with-supabase-auth-realtime-db)
- [Supertokens](https://github.com/vercel/next.js/tree/canary/examples/with-supertokens)
- [Userbase](https://github.com/vercel/next.js/tree/canary/examples/with-userbase)
