---
sidebar_position: 1
---

# 제어 흐름 분석

CFA(Control Flow Analysis, 제어 흐름 분석)는 대부분 합집합을 사용하고 코드의 논리에 따라 합집합 내부의 타입 수를 줄입니다.

대부분의 경우 CFA는 자연스러운 자바스크립트 불 논리 내에서 작동합니다. 하지만 타입스크립트가 타입을 좁히는 방식에 영향을 주는 고유한 함수를 정의하는 방법도 있습니다.

## `if`문

대부분의 좁히기는 `if`문 내부의 표현식을 사용합니다. 표현식에서 여러 타입 연산자는 새 범위 내에서 좁힙니다.

#### 원시값을 위한 `typeof`

```ts twoslash
declare function getUserInput(): string | number;
// ---cut---
const input = getUserInput();
//    ^?

if (typeof input === "string") {
  console.log(input);
  //          ^?
}
```

#### `in`을 이용한 객체의 프로퍼티

```ts twoslash
interface Name {
  firstName: string;
}
interface Address {
  state: string;
}

declare function getUserInput(): Name | Address;
// ---cut---
const input = getUserInput();
//    ^?

if ("firstName" in input) {
  console.log(input);
  //          ^?
}
```

#### 클래스를 위한 `instanceof`

```ts twoslash
declare function getUserInput(): number | number[];
// ---cut---
const input = getUserInput();
//    ^?

if (input instanceof Array) {
  console.log(input);
  //          ^?
}
```

#### 모든 타입을 위한 타입 가드 함수

```ts twoslash
declare function getUserInput(): number | number[];
// ---cut---
const input = getUserInput();
//    ^?

if (Array.isArray(input)) {
  console.log(input);
  //          ^?
}
```

### 표현식

불 연산을 수행할 때 동일한 코드 줄에서도 좁히기가 발생합니다.

```ts twoslash
declare function getUserInput(): string | number[];
// ---cut---
const input = getUserInput();
//    ^?

const inputLength =
  (typeof input === "string" && input.length) || input;
  //                            ^?
```

## 구별되는 합집합

```ts twoslash
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | { status: 400, error: Error }
```

합집합의 모든 요소는 `status`라는 동일한 프로퍼티 이름을 가지고 있으며 CFA는 이를 구별할 수 있습니다.

사용법:

```ts twoslash
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | { status: 400, error: Error }

declare function getResponse(): Responses;
declare function redirect(to: string): void;
// ---cut---
const res = getResponse();
//    ^?

switch (res.status) {
  case 200:
    res.data;
//  ^?
    break;
  case 301:
    redirect(res.to);
    //       ^?
    break;
  case 400:
    res.error;
//  ^?
    break;
}
```

## 타입 가드

`true`이면 새 범위에 대한 CFA 변경을 설명하는 반환 타입을 가진 함수입니다.

```ts twoslash
interface ErrorResponse { status: 400, error: Error };
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | ErrorResponse
// ---cut---
function isErrorResponse(obj: Responses): obj is ErrorResponse {
  return "error" in obj ? true : false;
}
```

반환 타입 위치에 있는 `obj is ErrorResponse`는 단언을 묘사합니다.

사용법:

```ts twoslash
interface ErrorResponse { status: 400, error: Error };
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | ErrorResponse

declare function getResponse(): Responses;
function isErrorResponse(obj: Responses): obj is ErrorResponse {
  return "error" in obj ? true : false;
}
// ---cut---
const res = getResponse();
//    ^?

if (isErrorResponse(res)) {
  console.log(res);
  //          ^?
}
```

## 단언 함수

CFA를 묘사하는 함수는 `false`를 반환하는 대신 오류를 던지기 때문에 현재 범위에 영향을 줍니다.

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

단언 함수는 **현재** 범위를 변경하거나 오류를 던집니다.

## 할당

### `as const`로 타입 좁히기

객체의 하위 필드는 변경 가능한 것으로 간주됩니다. 할당 중에는 하위 필드의 타입이 리터럴이 아닌 버전으로 확장됩니다. 접두사 `as const`는 모든 타입을 리터럴 버전으로 잠급니다.

```ts twoslash
const obj = {
  name: "Zagreus"
};

console.log(obj);
//          ^?
```

```ts twoslash
const obj = {
  name: "Zagreus"
} as const;

console.log(obj);
//          ^?
```

### 관련 변수 추적하기

```ts
const res = getResponse();
const isSuccessResponse
  = res instanceof SuccessResponse;

if (isSuccessResponse) {
  // res: SuccessResponse
  res.data;
}
```

### 재할당에 의한 타입 갱신

```ts twoslash
declare function getData(): string | number;
// ---cut---
let data = getData();
//  ^?

data = "Hello";
console.log(data);
//          ^?
```
