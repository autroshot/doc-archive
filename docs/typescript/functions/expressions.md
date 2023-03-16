---
sidebar_position: 1
---

# 표현식

함수를 묘사하는 가장 간단한 방법은 **함수 타입 표현식**입니다. 이 타입은 문법적으로 화살표 함수와 유사합니다.

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

`(a: string) => void` 문법은 `a`라는 문자열 타입의 매개변수가 하나 있고 반환값이 없는 함수를 의미합니다. 함수 선언과 마찬가지로 매개변수 타입은 지정되지 않으면 암시적으로 `any`입니다.

:::note 참고

매개변수의 이름은 **필수**입니다. `(string) => void` 함수 타입은 이름이 `string`이며 타입이 `any`인 매개변수를 가진 함수를 의미합니다.

:::

물론 다음과 같이 타입 별칭을 사용하여 함수 타입의 이름을 지정할 수 있습니다.

```ts
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

