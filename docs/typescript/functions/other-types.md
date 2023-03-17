---
sidebar_position: 7
---

# 기타 타입

함수 타입을 사용할 때 자주 쓰는 추가 타입이 몇 가지 있습니다. 다른 모든 타입과 동일하게 어디에서나 사용할 수 있지만, 특히 함수와 관련이 있는 타입입니다.

## `void`

`void`는 값을 반환하지 않는 함수의 반환값을 나타냅니다. 함수에 `return`문이 없거나 반환문에서 명시적 값을 반환하지 않을 때 추론되는 타입입니다.

```ts
// 추론된 반환 타입은 void입니다.
function noop() {
  return;
}
```

자바스크립트에서 값을 반환하지 않는 함수는 암시적으로 `undefined` 값을 반환합니다. 하지만 타입스크립트에서는 `void`와 `undefined`가 구별됩니다. 이 장의 끝에 자세한 내용이 있습니다.

:::info 정리

`void`와 `undefined`는 구별됩니다.

:::

## `object`

특별한 타입인 `object`는 원시값(`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`)이 아닌 모든 값을 참조합니다. 이는 빈 객체 타입인 `{ }`와 다르며, 전역 타입인 `Object`와도 다릅니다. `Object`는 거의 사용하지 않습니다.

:::info 정리

`object`는 `Object`와 다릅니다. **항상** `object`를 사용하세요!

:::

자바스크립트에서 함수 값은 객체입니다. 프로퍼티가 있고, 프로퍼티 체인에 `Object.prototype`가 있으며, 이는 `instanceof Object`와 동일합니다. `Object.keys`도 호출 가능합니다. 따라서 타입스크립트에서 함수 타입은 `object`로 간주됩니다.

## `unknown`

`unknown` 타입은 **모든(any)** 값을 나타냅니다. 이 타입은 `any` 타입과 유사하지만 `unknown` 값으로 무언가를 하는 것은 오류를 발생시키므로 더 안전합니다.

```ts
function f1(a: any) {
  a.b(); // 문제 없습니다.
}
function f2(a: unknown) {
  // 오류: Object is of type 'unknown'.
  a.b();
}
```

이는 함수 타입을 묘사할 때 유용합니다. 함수 본문에 `any` 값을 포함하지 않으면서 모든 값을 허용하는 함수를 묘사할 수 있습니다.

반대로 알 수 없는 타입의 값을 반환하는 함수를 묘사하는 것도 가능합니다.

```ts
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
 
// obj는 주의가 필요합니다!
const obj = safeParse(someRandomString);
```

## `never`

일부 함수는 값을 **절대** 반환하지 않습니다.

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

`never` 타입은 값이 **절대** 관찰되지 않는 값을 묘사합니다. 반환 타입의 `never`는 함수가 예외를 던지거나 프로그램 실행이 종료됨을 의미합니다.

`never`는 타입스크립트가 합집합에 남은 것이 없다고 판단할 때도 나타납니다.

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // 무언가를 합니다.
  } else if (typeof x === "number") {
    // 다른 무언가를 합니다.
  } else {
    x; // never 타입입니다!
  }
}
```

## `Function`

전역 타입인 `Function`은 `bind`, `call`, `apply`, 그리고 자바스크립트의 모든 함수 값에 존재하는 기타 프로퍼티를 묘사합니다. 그리고 `Function` 타입의 값을 항상 호출할 수 있는 특별한 프로퍼티가 있습니다. 해당 호출은 `any`를 반환합니다.

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

이는 **타입인 아닌 함수 호출**이며 안전하지 않은 `any` 반환 타입이므로 사용하지 않는 것이 좋습니다.

임의의 함수를 받아야 하지만 해당 함수를 호출할 생각이 없다면 `() => void`를 사용하는 것이 더 안전합니다.