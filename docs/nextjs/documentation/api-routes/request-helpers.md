---
sidebar_position: 3
---

# 요청 도우미

API 경로는 들어오는 요청(`req`)을 분석하는 내장 요청 도우미를 제공합니다.

- `req.cookies` - 요청에 의해 전송된 쿠키가 포함된 객체입니다. 기본값은 `{}`입니다.
- `req.query` - [질의 문자열](https://en.wikipedia.org/wiki/Query_string)을 포함하는 객체입니다. 기본값은 `{}`입니다.
- `req.body` - `content-type`에 의해 분석된 본문을 포함하는 객체입니다. 본문이 전송되지 않은 경우 `null`입니다.
