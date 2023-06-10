---
sidebar_position: 12
---

# 덜 일반적인 원시값

타입 시스템에서 표현되는 자바스크립트의 나머지 원시값을 언급할 필요가 있습니다. 하지만 자세히 다루지는 않겠습니다.

## `bigint`

ES2020부터는 자바스크립트에서 매우 큰 정수에 사용되는 원시값, `BigInt`가 있습니다.

```ts twoslash
// @target: es2020

// BigInt 함수로 bigint를 생성합니다.
const oneHundred: bigint = BigInt(100);

// 리터럴 구문으로 BigInt를 생성합니다.
const anotherHundred: bigint = 100n;
```

`BigInt`에 대한 자세한 내용은 [타입스크립트 3.2 릴리스 노트](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint)에서 확인할 수 있습니다.

## `symbol`

자바스크립트에는 `Symbol()` 함수를 통해 전역적으로 고유한 참조를 만드는 데 사용되는 원시값이 있습니다.

```ts twoslash
// @errors: 2367
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
  // 절대로 실행되지 않습니다.
}
```

[심볼 페이지](https://www.typescriptlang.org/ko/docs/handbook/symbols.html)에서 자세한 내용을 확인할 수 있습니다.