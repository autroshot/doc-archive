---
sidebar_position: 11
---

# `null`과 `undefined`

자바스크립트에는 값이 없거나 초기화되지 않은 값을 나타내는 데 사용되는 두 가지 원시값이 있습니다. `null`과 `undefined`입니다.

타입스크립트에는 여기에 대응되며 동일한 이름을 가지는 두 가지 **타입**이 있습니다. 이러한 타입의 작동 방식은 [`strictNullChecks`](https://www.typescriptlang.org/ko/tsconfig#strictNullChecks) 옵션의 설정 여부에 따라 달라집니다.

## `strictNullChecks` 꺼짐

[`strictNullChecks`](https://www.typescriptlang.org/ko/tsconfig#strictNullChecks)가 **꺼져** 있으면, `null`이나 `undefined` 값에 정상적으로 접근할 수 있으며, `null`과 `undefined` 값을 모든 타입의 프로퍼티에 할당할 수 있습니다. 이는 널 검사가 없는 언어(예: C#, Java)의 동작 방식과 유사합니다. 이러한 값을 확인하지 않는 것은 버그의 주요 원인이 되는 경향이 있습니다. 코드베이스에서 가능하다면 [`strictNullChecks`](https://www.typescriptlang.org/ko/tsconfig#strictNullChecks)를 켜는 것이 좋습니다.

## `strictNullChecks` 켜짐

[`strictNullChecks`](https://www.typescriptlang.org/ko/tsconfig#strictNullChecks)가 **켜져** 있으면, 값이 `null`이나 `undefined`인 경우 해당 값에 메서드 또는 프로퍼티를 사용하기 전에 해당 값을 테스트해야 합니다. 선택적 프로퍼티를 사용하기 전에 `undefined`를 확인하는 것처럼, **좁히기**를 사용하여 `null`일 수 있는 값을 확인할 수 있습니다.

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // 아무것도 하지 않습니다.
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## 널이 아닌 단언 연산자 (접미사 `!`)

타입스크립트에는 명시적 검사를 수행하지 않고 타입에서 `null`과 `undefined`를 제거하기 위한 특별한 구문도 있습니다. 표현식 뒤에 `!`를 쓰는 것은, 사실상 값이 `null`이나 `undefined`가 아니라는 타입 단언입니다.

```ts
function liveDangerously(x?: number | null) {
  // 오류가 발생하지 않습니다.
  console.log(x!.toFixed());
}
```

다른 타입 단언과 마찬가지로, `!`는 코드의 런타임 동작을 변경하지 않습니다. 따라서 값이 `null`이나 `undefined`가 될 수 없다는 것을 알고 있는 경우에만 `!`을 사용하는 것이 중요합니다.