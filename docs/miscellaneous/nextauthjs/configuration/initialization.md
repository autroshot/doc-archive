---
sidebar_position: 1
---

# 초기화

넥스트에서 특정 경로로 시작하는 모든 요청을 잡는 API 경로를 정의할 수 있습니다. 편의상 이를 [모든 API 경로 잡기](../../../next-js/documentation/api-routes/dynamic-api-routes.md#모든-api-경로-잡기)라고 부릅니다.

`/pages/api/auth/[...nextauth]` JS/TS 파일을 정의하면, 넥스트는 `/api/auth/*`로 시작하는 모든 API 요청을 `[...nextauth]` 파일에 작성된 코드로 처리합니다.

유스 케이스에 따라 다음 두 가지 방법으로 넥스트인증을 초기화할 수 있습니다.

## 간단한 초기화

대부분의 경우 `NextAuth.js`이 어떤 일을 하는지 신경 쓸 필요가 없습니다. 다음 초기화만 수행하면 됩니다.

```ts title="/pages/api/auth/[...nextauth].js"
import NextAuth from "next-auth"

export default NextAuth({
  ...
})
```

여기서는 `NextAuth`에 [옵션](https://next-auth.js.org/configuration/options)만 건네주면 나머지는 `NextAuth`가 처리합니다.

이는 코드를 단순화하고 인증 흐름에서 잠재적인 오류를 줄이기 때문에 튜토리얼이나 문서의 다른 부분에서 선호되는 초기화입니다.

## 고급 초기화

특정 유스 케이스가 있고 넥스트인증의 설계 의도와 약간 다른 작업을 수행하고 싶다면 고급 초기화를 사용합니다. `[...nextauth].js` 설정 파일은 결국 **일반적인 [API 경로](../../../next-js/documentation/api-routes/introduction.md)**에 불과하다는 점을 명심하세요.

`NextAuth.js`를 다음과 같이 초기화할 수 있습니다.

```ts title="/pages/api/auth/[...nextauth].ts"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // 요청이 NextAuth로 전달되기 전에 여기에서 원하는 작업을 수행합니다.
  return await NextAuth(req, res, {
    ...
  })
}
```

`...` 부분은 여전히 [옵션](https://next-auth.js.org/configuration/options)입니다. 하지만 이제 요청의 어떤 것을 실행하거나 수정할 수 있습니다.

예를 들어 요청을 기록하거나, 헤더를 추가하거나, `query`나 `body` 매개변수 읽는 작업 같이 API 경로에서 수행할만한 작업을 작성할 수 있습니다.

:::tip

이곳은 포괄 경로이므로 어떤 종류의 넥스트인증 작업이 실행되고 있는지 확인해야 합니다. REST API를 `req.query.nextauth` 매개변수와 비교하세요.

예를 들어 요청이 POST 메서드일 때 콜백 작업에서 무언가를 실행하려면 `req.query.nextauth.includes("callback") && req.method === "POST"`로 확인할 수 있습니다.

:::

:::note 참고

`NextAuth`는 `res.end`, `res.send` 등을 호출해 암시적으로 응답을 닫습니다. 따라서 함수 본문에서 `NextAuth` **이후**에 코드를 실행해서는 안 됩니다. `return NextAuth`를 사용하면 잊지 않을 것입니다.

:::

이 방법으로 만든 변수는 같은 스코프에 있으므로 `NextAuth` 옵션에서도 사용할 수 있습니다.

```ts title="/pages/api/auth/[...nextauth].ts"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }

  // 요청에서 사용자 정의 쿠키 값을 가져옵니다.
  const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, {
    ...
    callbacks: {
      session({ session, token }) {
        // 세션의 일부로 쿠키 값을 반환합니다.
        // `req.query.nextauth.includes("session") && req.method === "GET"`일 때 이 부분이 실행됩니다.
        session.someCookie = someCookie
        return session
      }
    }
  })
}
```

실용적인 예는 기본 로그인 페이지에 특정 제공자를 표시하지 않지만 여전히 해당 제공자로 로그인이 가능하게 만드는 것입니다. 발상은 [이 토론](https://github.com/nextauthjs/next-auth/discussions/3133)에서 나왔습니다.

```js title="/pages/api/auth/[...nextauth].js"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider(...),
    GoogleProvider(...),
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // '/api/auth/signin'을 방문할 때 GoogleProvider를 숨깁니다.
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    ...
  })
}
```

사용 가능한 모든 작업과 지원 메서드에 대한 자세한 내용은 [REST API 문서](../basic/rest-api.md)나 [소스 코드](https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/index.ts)의 해당 부분을 확인하세요.

`NextAuth`를 초기화하는 이 방법은 매우 강력하지만 필요할 때만 사용해야 합니다.

:::danger

[기본 쿠키](https://next-auth.js.org/configuration/options#cookies)를 건드리는 것과 같이 `NextAuth`에 필수적인 요청의 일부를 변경하면 예기치 않은 결과와 보안 취약점이 발생할 수 있습니다. 결과를 이해한 경우에만 변경하세요.

:::