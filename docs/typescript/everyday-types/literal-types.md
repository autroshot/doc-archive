---
sidebar_position: 10
---

# 리터럴 타입

일반적인 타입인 `string`과 `number` 외에도 타입 위치에서 **특정한** 문자열과 숫자를 참조할 수 있습니다.

이에 대해 생각하는 한 가지 방법은 자바스크립트에서 변수를 선언하는 다양한 방법을 고려하는 것입니다. `var`와 `let` 모두 변수 내부의 내용을 변경할 수 있지만, `const`는 변경할 수 없습니다. 이는 타입스크립트가 리터럴를 위한 타입을 생성하는 방식에 반영됩니다.

```ts twoslash
let changingString = "Hello World";
changingString = "Olá Mundo";
// changingString은 가능한 모든 문자열을 나타낼 수 있습니다.
// 따라서 타입스크립트는 타입 시스템에서 문자열을 묘사합니다.
changingString;
// ^?

const constantString = "Hello World";
// constantString은 가능한 문자열이 하나입니다.
// 따라서 리터럴 타입을 표현합니다.
constantString;
// ^?
```

리터럴 타입 자체는 그다지 가치가 없습니다.

```ts twoslash
// @errors: 2322
let x: "hello" = "hello";
// 문제없습니다.
x = "hello";
// ...
x = "howdy";
```

하나의 값만 가질 수 있는 변수는 별로 쓸모가 없습니다!

그러나 리터럴을 합집합으로 **결합**하면 훨씬 더 유용한 개념을 표현할 수 있습니다. 예를 들어 특정 값의 집합만 허용하는 함수를 표현할 수 있습니다.

```ts twoslash
// @errors: 2345
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
```

숫자 리터럴 타입도 동일한 방식으로 작동합니다.

```ts twoslash
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

물론 리터럴을 리터럴이 아닌 타입과 결합할 수도 있습니다.

```ts twoslash
// @errors: 2345
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
```

불린 리터럴이라는 리터럴 타입이 하나 더 있습니다. 불린 리터럴 타입은 두 가지뿐이며, 짐작할 수 있듯이 `true`와 `false` 타입입니다. `boolean` 타입 자체는 실제로 `true | false` 합집합의 별칭일 뿐입니다.

## 리터럴 추론

변수를 객체로 초기화하면, 타입스크립트는 해당 객체의 프로퍼티가 나중에 값이 변경될 수 있다고 가정합니다. 예를 들어 다음 코드를 작성했다고 가정해 보겠습니다.

```ts twoslash
declare const someCondition: boolean;
// ---cut---
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

타입스크립트는 이전에 `0`이 있었던 필드에 `1`을 할당하는 것이 오류라고 가정하지 않습니다. 다시 말하면 `obj.counter`는 `0`이 아닌 `number` 타입을 가져야 한다는 것입니다. 이는 타입이 **읽기**와 **쓰기** 행동을 모두 결정하는 데 사용되기 때문입니다.

문자열에도 동일하게 적용됩니다.

```ts twoslash
// @errors: 2345
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```

위의 예시에서 `req.method`는 `"GET"`이 아니라 `string`으로 추론됩니다. 코드가 `req` 생성과 `req.method` 호출 사이에서 평가될 수 있으므로, `"GUESS"`와 같은 새 문자열을 `req.method`에 할당할 수 있습니다. 따라서 타입스크립트는 이 코드를 오류가 있는 것으로 간주합니다.

이 문제를 해결하는 방법에는 두 가지가 있습니다.

1. 두 위치 중 하나에 타입 단언을 추가하여 추론을 변경할 수 있습니다.

   ```ts twoslash
   declare function handleRequest(url: string, method: "GET" | "POST"): void;
   // ---cut---
   // 변경 1
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // 변경 2
   handleRequest(req.url, req.method as "GET");
   ```

   변경 1은 `req.method`가 항상 **리터럴 타입** `"GET"`을 가지도록 합니다. 이후에 해당 필드에 `"GUESS"`가 할당될 가능성을 방지합니다. 변경 2는 다른 이유로 `req.method`가 `"GET"` 값을 갖고 있다는 것을 의미합니다.

2. `as const`를 사용하여 전체 객체를 타입 리터럴로 변환할 수 있습니다.

   ```ts twoslash
   declare function handleRequest(url: string, method: "GET" | "POST"): void;
   // ---cut---
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

`as const` 접미사는 `const`처럼 작동합니다. 타입 시스템에서는 모든 프로퍼티에 `string`이나 `number`와 같은 일반적인 버전 대신 리터럴 타입이 할당되도록 합니다.