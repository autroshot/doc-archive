---
sidebar_position: 2
---

# 자격 증명

## 방법

자격 증명 제공자를 사용하면 사용자 이름과 비밀번호, 이중 인증(2FA), 하드웨어 장치(예: YubiKey U2F / FIDO)와 같은 임의 자격 증명으로 로그인을 처리할 수 있습니다.

사용자를 인증해야 하는 기존 시스템이 있는 경우를 지원합니다.

```js title="pages/api/auth/[...nextauth].js"
import CredentialsProvider from "next-auth/providers/credentials"
...
providers: [
  CredentialsProvider({
    // 로그인 양식에 표시할 이름 (예: '...로 로그인')
    name: 'Credentials',
    // 자격 증명은 로그인 페이지에서 적절한 양식을 생성하는 데 사용됩니다.
    // 제출할 것으로 예상되는 필드를 지정할 수 있습니다.
    // 예: 도메인, 사용자 이름, 비밀번호, 2FA 토큰 등
    // 객체를 통해 HTML 속성을 <input> 태그로 전달할 수 있습니다.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // 제출된 자격 증명을 사용해 사용자를 나타내는 객체를 반환하거나
      // 자격 증명이 유효하지 않다면 false/null 값을 반환하는
      // 자체 논리를 이곳에 작성해야 합니다.
      // 예시: `return { id: '1', name: 'J Smith', email: 'jsmith@example.com' }`
      // req 객체를 사용해 추가 매개변수를 얻을 수도 있습니다.
      // 예시: 요청 IP 주소
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // 오류가 없고 사용자 데이터가 있으면 user를 반환합니다.
      if (res.ok && user) {
        return user
      }
      // 사용자 데이터가 검색되지 않으면 null을 반환합니다.
      return null
    }
  })
]
...
```

자세한 내용은 [자격 증명 제공자 문서](../providers/credentials.mdx)을 참조하세요.

:::note 참고

자격 증명 제공자는 세션에 대해 JSON 웹 토큰이 활성화된 경우에만 사용할 수 있습니다. 자격 증명 제공자로 인증된 사용자는 데이터베이스에 저장되지 않습니다.

:::

## 옵션

| 이름 | 설명 | 타입 | 필수 |
| ----------- | ------------------------------------------------- | ------------------------------------- | -------- |
| id | 제공자의 고유 ID | `string` | 예 |
| name | 제공자를 설명하는 이름 | `string` | 예 |
| type | 제공자의 유형으로 이 경우에는 `credentials` | `"credentials"` | 예 |
| credentials | 로그인할 자격 증명 | `Object` | 예 |
| authorize | 사용자에게 권한이 부여되면 실행할 콜백 | `(credentials, req) => Promise<User>` | 예 |