---
sidebar_position: 2
---

# `keyof` 타입 연산자

`keyof` 연산자는 객체 타입을 받아 해당 키의 문자열 또는 숫자 리터럴 합집합을 생성합니다. 다음 타입 P는 `"x" | "y"`와 동일한 타입입니다.

```ts
type Point = { x: number; y: number };
// type P = keyof Point
type P = keyof Point;
```

타입에 `string` 또는 `number` 색인 시그니처가 있는 경우, `keyof`는 대신 해당 타입을 반환합니다.

```ts
type Arrayish = { [n: number]: unknown };
// type A = number
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
// type M = string | number
type M = keyof Mapish;
```

이 예시에서 `M`은 `string | number`입니다. 이는 자바스크립트 객체 키가 항상 문자열로 강제되므로 `obj[0]`은 항상 `obj["0"]`과 같습니다.

`keyof` 타입은 나중에 배울 매핑된 타입과 결합할 때 특히 유용합니다.