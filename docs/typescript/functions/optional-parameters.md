---
sidebar_position: 5
---

# 선택적 매개변수

자바스크립트의 함수는 종종 가변적인 수의 인수를 취합니다.

예를 들어 `number`의 `toFixed` 메서드는 선택적 자릿수를 취합니다.

```ts twoslash
function f(n: number) {
  console.log(n.toFixed()); // 0개의 인수
  console.log(n.toFixed(3)); // 1개의 인수
}
```

타입스크립트에서는 다음과 같이 매개변수에 `?`를 표시하여 **선택적**으로 모델링할 수 있습니다.

```ts twoslash
function f(x?: number) {
  // ...
}
f(); // 문제없습니다.
f(10); // 문제없습니다.
```

매개변수가 `number` 타입으로 지정되더라도 `x` 매개변수는 사실 `number | undefined` 타입을 가지게 됩니다. 자바스크립트에서 지정되지 않은 매개변수는 `undefined` 값을 가지기 때문입니다.

매개변수에 **기본값**을 제공할 수도 있습니다.

```ts twoslash
function f(x = 10) {
  // ...
}
```

이제 `f` 본문에서 모든 `undefined` 인수는 `10`으로 대체되기 때문에 `x`는 `number` 타입을 가지게 됩니다. 매개변수가 선택 사항인 경우 호출자는 `undefined`를 전달하는 것이 항상 가능합니다. 이는 호출자가 누락된 인수를 간단히 시뮬레이트하기 때문입니다.

```ts twoslash
declare function f(x?: number): void;
// ---cut---
// 모두 문제없습니다.
f();
f(10);
f(undefined);
```

## 콜백의 선택적 매개변수

선택적 매개변수와 함수 타입 표현식을 배웠다면 콜백을 호출하는 함수를 작성할 때 다음과 같은 실수를 하기 쉽습니다.

```ts twoslash
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

`index?`의 일반적인 의도는 선택적 매개변수로서 다음의 두 호출이 가능한 것입니다.

```ts twoslash
// @errors: 2532 18048
declare function myForEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
// ---cut---
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
```

이것이 실제로 의미하는 바는 `callback`이 하나의 인수로 호출될 수 있다는 것입니다. 즉, 함수 정의는 구현이 다음과 같을 수 있다고 말합니다.

```ts twoslash
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // 오늘은 인덱스를 제공하고 싶지 않습니다.
    callback(arr[i]);
  }
}
```

타입스크립트는 차례로 이 의미를 적용하고 실제로는 불가능한 오류를 발생시킵니다.

```ts twoslash
// @errors: 2532 18048
declare function myForEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
// ---cut---
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
});
```

자바스크립트에서는 매개변수보다 더 많은 인수로 함수를 호출하면 추가 인수는 무시됩니다. 타입스크립트도 같은 방식으로 작동합니다. 동일한 타입이며 매개변수가 적은 함수는 매개변수가 많은 함수를 항상 대신할 수 있습니다.

:::info 정리

콜백을 위한 함수 타입을 작성할 때, 인수를 전달하지 않고 함수를 호출하려는 것이 아니면 선택적 매개변수를 **절대** 사용하지 마세요.

:::