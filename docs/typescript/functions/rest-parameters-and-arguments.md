---
sidebar_position: 8
---

# 나머지 매개변수와 인수

:::note 배경 지식

- [나머지 매개변수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [전개 문법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

:::

## 나머지 매개변수

선택적 매개변수 또는 다중 정의를 사용하여 다양한 고정 인수 개수를 허용하는 함수를 만들 수 있습니다. 추가로 **나머지 매개변수**를 사용하여 **무한한** 수의 인수를 취하는 함수를 정의할 수 있습니다.

나머지 매개변수는 다른 모든 매개변수 뒤에서 `...` 문법을 사용합니다.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// a는 값 '[10, 20, 30, 40]'을 얻습니다.
const a = multiply(10, 1, 2, 3, 4);
```

타입스크립트에서 이 매개변수에 대한 타입 주석은 암시적으로 `any` 대신 `any[]`입니다. 주어진 타입 주석은 반드시 `Array<T>` 또는 `T[]` 또는 튜플 타입이어야 합니다.

## 나머지 인수

반대로 전개 문법을 사용하여 배열에서 가변적인 수의 인수를 제공할 수 있습니다.

예를 들어 배열의 `push` 메서드는 임의 개수의 인수를 사용합니다.

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

일반적으로 타입스크립트는 배열이 불변이라고 가정하지 않습니다. 이로 인해 다음과 같이 놀라운 일이 생길 수 있습니다.

```ts
// 추론된 타입은 'number[]'입니다. 즉 0개 이상의 숫자가 포함된 배열입니다.
// 특별히 두 개의 숫자가 포함된 배열이 아닙니다.
const args = [8, 5];
// 오류: A spread argument must either have a tuple type or be passed to a rest parameter.
const angle = Math.atan2(...args);
```

이 상황에 대한 일반적이고 가장 간단한 솔루션은 `const` 컨텍스트입니다.

```ts
// 길이가 2인 튜플로 추론됩니다.
const args = [8, 5] as const;
// 문제 없습니다.
const angle = Math.atan2(...args);
```

나머지 인수를 사용하려면 이전 런타임을 대상으로 할 때 [`downlevelIteration`](https://www.typescriptlang.org/ko/tsconfig#downlevelIteration)을 설정해야 할 수 있습니다.