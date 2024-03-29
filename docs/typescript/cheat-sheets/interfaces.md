---
sidebar_position: 2
---

# 인터페이스

객체의 모양을 묘사하는 데 사용되며 확장이 가능합니다.

자바스크립트의 거의 모든 것은 객체입니다. 인터페이스는 객체의 런타임 동작과 일치하도록 만들어집니다.

## 인터페이스

### 내장 원시 타입

`boolean`, `string`, `number`, `undefined`, `null`, `any`, `unknown`, `never`, `void`, `bigint`, `symbol`

### 일반적인 내장 JS 객체

`Date`, `Error`, `Array`, `Map`, `Set`, `Regexp`, `Promise`

### 타입 리터럴

객체:

```ts
{ field: string }
```

함수:

```ts
(arg: number) => string
```

배열:

```ts
string[] or Array<string>
```

튜플:

```ts
[string, number]
```

### 사용을 피해야 하는 객체

`Object`, `String`, `Number`, `Boolean`

## 일반 구문

```ts
// 선택적으로 기존 인터페이스나 타입에서 프로퍼티를 가져옵니다.
interface JSONResponse extends Response, HTTPAble {
  version: number;
  
  // 편집기에 표시하기 위해 첨부된 JSDoc 주석
  /** 바이트 단위 */
  payloadSize: number;
  
  // 이 프로퍼티는 객체에 없을 수 있습니다.
  outOfStock?: boolean;
  
  // 이것은 함수인 프로퍼티를 묘사하는 두 가지 방법입니다.
  update: (retryTimes: number) => void;
  update(retryTimes: number): void;
  
  // ()로 이 객체를 호출할 수 있습니다.
  // 참고로 JS의 함수는 호출 가능한 객체입니다.
  (): JSONResponse;
  
  // 이 인터페이스가 묘사하는 객체에 new를 사용할 수 있습니다.
  new(s: string): JSONResponse;
  
  // 묘사되지 않은 모든 프로퍼티가 이미 존재하는 것으로 간주되며 모든 프로퍼티는 숫자여야 합니다.
  [key: string]: number;
  
  // 변경 불가능한 프로퍼티라는 것을 타입스크립트에게 알립니다.
  readonly body: string;
}
```

## 제네릭

인터페이스에서 변경 가능한 타입을 선언합니다.

```ts
interface APICall<Response> {
  data: Response;
}
```

사용법:

```ts
const api: APICall<ArtworkCall> = ...
api.data; // Artwork
```

`extends` 키워드를 사용해 제네릭 매개변수에 허용되는 타입을 제한할 수 있습니다.

```ts
// 타입에 제약을 설정합니다. status 프로퍼티가 있는 타입만 사용할 수 있습니다.
interface APICall<Response extends { status: number }> {
  data: Response;
}

const api: APICall<ArtworkCall> = ...
api.data.status;
```

## 다중 정의

호출 가능한 인터페이스는 다양한 매개변수 세트에 대해 여러 정의를 가질 수 있습니다.

```ts
interface Expect {
  (matcher: boolean): string;
  (matcher: string): boolean;
}
```

## `get`과 `set`

객체에는 사용자 지정 획득자 또는 설정자가 있을 수 있습니다.

```ts
interface Ruler {
  get size(): number;
  set size(value: number | string);
}
```

사용법:

```ts
const r: Ruler = ...
r.size = 12;
r.size = "36";
```

## 병합을 통한 확장

인터페이스는 병합됩니다. 인터페이스를 여러 번 선언하면 타입 정의에 새 필드가 추가됩니다.

```ts
interface APICall {
  data: Response;
}

interface APICall {
  error?: Error;
}
```

## 클래스 적합성

`implements`로 클래스가 해당 인터페이스를 준수하는지 확인할 수 있습니다.

```ts
interface Syncable { sync(): void }

class Account implements Syncable { ... }
```

