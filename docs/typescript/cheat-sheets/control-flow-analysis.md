---
sidebar_position: 1
---

# 제어 흐름 분석

CFA(Control Flow Analysis, 제어 흐름 분석)는 대부분 합집합을 사용하고 코드의 논리에 따라 합집합 내부의 타입 수를 줄입니다.

대부분의 경우 CFA는 자연스러운 자바스크립트 불린 논리 내에서 작동합니다. 하지만 타입스크립트가 타입을 좁히는 방식에 영향을 주는 고유한 함수를 정의하는 방법도 있습니다.

## `if`문

대부분의 좁히기는 `if`문 내부의 표현식을 사용합니다. 표현식에서 여러 타입 연산자는 새 스코프 내에서 좁힙니다.

#### 원시값을 위한 `typeof`

```ts
// input: string | number
const input = getUserInput();

if (typeof input === "string") {
  // input: string
}
```

#### `in`을 이용한 객체의 프로퍼티

```ts
// input: string | { error: ... }
const input = getUserInput();

if ("error" in input) {
  // input: { error: ... }
}
```

#### 클래스를 위한 `instanceof`

```ts
// input: number | number[]
const input = getUserInput();

if (input instanceof Array) {
  // input: number[]
}
```

#### 모든 타입을 위한 타입 가드 함수

```ts
// input: number | number[]
const input = getUserInput();

if (Array.isArray(input)) {
  // input: number[]
}
```

### 표현식

불린 연산을 수행할 때 동일한 코드 줄에서도 좁히기가 발생합니다.

```ts
// input: string | number[]
const input = getUserInput();

const inputLength =
  (typeof input === "string" && input.length) || input;
  // input: string
```

## 구별되는 합집합

```ts
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | { status: 400, error: Error }
```

합집합의 모든 요소는 `status`라는 동일한 프로퍼티 이름을 가지고 있으며 CFA는 이를 구별할 수 있습니다.

사용법:

```ts
// res: Responses
const res = getResponse();

switch (res.status) {
  case 200: return res.data;
  case 301: return redirect(res.to);
  case 400: return res.error;
}
```

## 타입 가드

`true`이면 새 스코프에 대한 CFA 변경을 설명하는 반환 타입을 가진 함수입니다.

```ts
function isErrorResponse(obj: Response): obj is APIErrorResponse {
  return obj instanceof APIErrorResponse;
}
```

반환 타입 위치에 있는 `obj is APIErrorResponse`는 단언을 설명합니다.

사용법:

```ts
// res: Responses | APIErrorResponse
const res = getResponse();

if (isErrorResponse(res)) {
  // res: APIErrorResponse
}
```

## 단언 함수

CFA를 설명하는 함수는 `false`를 반환하는 대신 오류를 던지기 때문에 현재 스코프에 영향을 줍니다.

```ts
function assertResponse(obj: any): asserts obj is SuccessResponse {
  if (!(obj instanceof SuccessResponse)) {
    throw new Error("Not a success!");
  }
}
```

사용법:

```ts
// res: SuccessResponse | ErrorResponse
const res = getResponse();

assertResponse(res);
// res: SuccessResponse
```

단언 함수는 **현재** 스코프를 변경하거나 오류를 던집니다.

## 할당

### `as const`로 타입 좁히기

객체의 하위 필드는 변경 가능한 것으로 처리됩니다. 할당 동안에는 하위 필드의 타입이 리터럴이 아닌 버전으로 확대됩니다. 접두사 `as const`는 모든 타입을 리터럴 버전으로 잠급니다.

```ts
const data1 = {
  name: "Zagreus"
};

typeof data1 = {
  name: string
};

const data2 = {
  name: "Zagreus"
} as const;

typeof data2 = {
  name: "Zagreus"
};
```

### 관련 변수 추적하기

```ts
const res = getResponse();
const isSuccessResponse
  = res instanceof SuccessResponse;

if (isSuccessResponse) {
  // res: SuccessResponse
}
```

### 재할당에 의한 타입 갱신

```ts
// data: string | number
let data: string | number = ...

data = "Hello";
// data: string
```

