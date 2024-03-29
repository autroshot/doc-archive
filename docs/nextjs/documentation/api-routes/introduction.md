---
sidebar_position: 1
sidebar_label: 소개
---

# API 경로

API 경로는 넥스트로 API를 만들기 위한 솔루션을 제공합니다.

`pages/api` 폴더 내의 모든 파일은 `/api/*`에 매핑되며 `page` 대신 API 엔드포인트로 처리됩니다. 이는 서버 측 번들로 클라이언트 측 번들 크기를 늘리지 않습니다.

예를 들어 다음 `pages/api/user.js` API 경로는 `200` 상태 코드와 `json` 응답을 반환합니다.

```js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
```

:::note 참고

API 경로는 `next.config.js`의 [`pageExtensions`설정](../../api-reference/next-config-js/custom-page-extensions.md)의 영향을 받습니다.

:::

API 경로가 작동하려면 함수를 `default`로 내보내서 **요청 처리기**로 만들어야 합니다. 그러면 처리기는 다음 매개변수를 받습니다.

- `req` - [http.IncomingMessage](https://nodejs.org/api/http.html#class-httpincomingmessage) 인스턴스와 미리 빌드된 [미들웨어](https://nextjs.org/docs/api-routes/api-middlewares)
- `res` - [http.ServerResponse](https://nodejs.org/api/http.html#class-httpserverresponse) 인스턴스와 [도우미 함수](../api-routes/response-helpers.md)

API 경로에서 다른 HTTP 메서드를 처리하기 위해 다음과 같이 요청 처리기에서 `req.method`를 사용할 수 있습니다.

```js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // POST 요청을 처리합니다.
  } else {
    // 다른 HTTP 메서드를 처리합니다.
  }
}
```

## 사용 사례

새 프로젝트의 경우에는 API 경로를 사용하여 전체 API를 만들 수 있습니다. 기존 API가 있는 경우에는 API 경로를 통해 API에 호출을 전달할 필요가 없습니다.

기타 사용 사례는 다음과 같습니다.

- 외부 서비스의 URL 마스킹하기(예시: `/api/secret` 대신 `https://company.com/secret-url`)
- 서버에서 [환경 변수](../basic-features/environment-variables.md)를 사용하여 외부 서비스에 안전하게 접근하기

## 주의 사항

- API 경로는 [CORS 헤더를 지정하지 않습니다](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS). 즉 기본값이 `same-origin only`입니다. 요청 처리기를 [CORS 미들웨어](https://nextjs.org/docs/api-routes/api-middlewares#connectexpress-middleware-support)로 래핑하여 이 작동을 사용자 정의하는 것이 가능합니다.
- API 경로는 [`next export`](https://nextjs.org/docs/advanced-features/static-html-export)와 함께 사용할 수 없습니다.
