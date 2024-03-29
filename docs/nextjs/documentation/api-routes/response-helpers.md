---
sidebar_position: 4
---

# 응답 도우미

[서버 응답 객체](https://nodejs.org/api/http.html#http_class_http_serverresponse)(보통 `res`로 줄여서 부름)에는 개발자 경험을 향상시키고 API 엔드포인트 개발 속도를 높이는, 익스프레스와 유사한 도우미 메서드가 포함되어 있습니다.

내장된 도우미는 다음과 같습니다.

- `res.status(code)` - 상태 코드를 설정합니다. `code`는 유효한 [HTTP 상태 코드](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)여야 합니다.
- `res.json(body)` - JSON 응답을 보냅니다. `body`는 [직렬화 가능한 객체](https://developer.mozilla.org/en-US/docs/Glossary/Serialization)여야 합니다.
- `res.send(body)` - HTTP 응답을 보냅니다. `body`는 `string`, `object`, `Buffer`가 가능합니다.
- `res.redirect([status,] path)` - 지정된 경로나 URL로 리디렉션합니다. `status`는 유효한 [HTTP 상태 코드](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)여야 합니다. 지정하지 않으면 `status` 기본값은 '307'로 '임시 리디렉션'입니다.
- `res.revalidate(urlPath)` - `getStaticProps`을 사용하는 [주문형 페이지 재검증](../basic-features/data-fetching/incremental-static-regeneration.md#주문형-재검증)입니다. `urlPath`는 `string`이어야 합니다.

## 응답의 상태 코드 설정하기

클라이언트에 응답을 다시 보낼 때 응답의 상태 코드를 설정할 수 있습니다.

다음 예시에서는 응답의 상태 코드를 `200`(`OK`)으로 설정하고 `message` 프로퍼티의 값이 `Hello from Next.js!`인 JSON 응답을 반환합니다.

```js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

## JSON 응답 보내기

클라이언트에 응답을 다시 보낼 때 JSON 응답을 보낼 수 있습니다. JSON 응답은 [직렬화 가능한 객체](https://developer.mozilla.org/en-US/docs/Glossary/Serialization)여야 합니다. 실제 앱에서는 요청된 엔드포인트의 결과에 따른 요청 상태를 클라이언트에 전달할 수도 있습니다.

다음 예시에서는 상태 코드 `200`(`OK`)과 비동기 작업의 결과가 포함된 JSON 응답을 보냅니다. 오류 처리를 위해 `try...catch`문에 포함되어 있으며 적절한 상태 코드와 오류 메시지가 잡아서 클라이언트로 다시 전송합니다.

```js
export default async function handler(req, res) {
  try {
    const result = await someAsyncOperation();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
```

## HTTP 응답 보내기

HTTP 응답을 보내는 것은 JSON 응답을 보낼 때와 같은 방식으로 작동합니다. 차이점은 응답 본문이 `string`, `object`, `Buffer`가 될 수 있다는 것입니다.

다음 예시에서는 상태 코드 `200`(`OK`)과 비동기 작업의 결과가 포함된 HTTP 응답을 보냅니다.

```js
export default async function handler(req, res) {
  try {
    const result = await someAsyncOperation();
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
```

## 지정된 경로나 URL로 리디렉션

클라이언트가 양식을 제출한 후에 지정된 경로나 URL로 리디렉션할 수 있습니다.

다음 예시는 양식이 성공적으로 제출된 경우 클라이언트를 `/` 경로로 리디렉션합니다.

```js
export default async function handler(req, res) {
  const { name, message } = req.body;
  try {
    await handleFormInputAsync({ name, message });
    res.redirect(307, '/');
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
```

## 타입스크립트의 타입 추가하기

`next`에서 `NextApiRequest`와 `NextApiResponse` 타입을 가져와 응답 처리기를 보다 타입에 안전하게 만들 수 있습니다. 또한 응답 데이터의 타입을 지정할 수도 있습니다.

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

타입을 사용하는 더 많은 예시를 보려면 [타입스크립트 문서](https://nextjs.org/docs/basic-features/typescript#api-routes)를 확인하세요.
