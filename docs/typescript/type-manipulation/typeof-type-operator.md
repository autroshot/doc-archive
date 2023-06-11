---
sidebar_position: 3
---

# `typeof` 타입 연산자

자바스크립트에는 이미 **표현식** 컨텍스트에서 사용할 수 있는 `typeof` 연산자가 있습니다.

```ts twoslash
// "string"을 출력합니다.
console.log(typeof "Hello world");
```

타입스크립트는 변수나 프로퍼티의 **타입**을 참조하기 위해 **타입** 컨텍스트에서 사용할 수 있는 `typeof` 연산자를 추가합니다.

```ts twoslash
let s = "hello";
let n: typeof s;
//  ^?
```

이는 기본 타입에는 그다지 유용하지 않지만, 다른 타입 연산자와 결합하면 `typeof`를 사용하여 많은 패턴을 편리하게 표현할 수 있습니다.

예를 들어 사전 정의된 타입인 `ReturnType<T>`부터 살펴보겠습니다. 이 타입은 **함수 타입**을 받아 반환 타입을 생성합니다.

```ts twoslash
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
//   ^?
```

함수 이름에 `ReturnType`을 사용하려고 하면 다음과 같이 도움을 주는 오류가 표시됩니다.

```ts twoslash
// @errors: 2749
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
```

**값**과 **타입**은 같은 것이 아니라는 것을 기억하세요. **값 `f`**가 갖는 **타입**을 참조하기 위해 `typeof`를 사용합니다.

```ts twoslash
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
//   ^?
```

## 한계

타입스크립트는 `typeof`를 사용할 수 있는 표현식의 종류를 의도적으로 제한합니다.

특히, 식별자(예: 변수 이름) 또는 프로퍼티에만 `typeof`를 사용할 수 있습니다. 이는 실행 불가능한 코드를 작성하는 혼란스러운 함정을 피하는 데 도움이 됩니다.

```ts twoslash
// @errors: 1005
declare const msgbox: (prompt: string) => boolean;
// ---cut---
// '= ReturnType<typeof msgbox>'을 사용할 의도였습니다.
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
```
