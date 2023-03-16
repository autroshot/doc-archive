---
sidebar_position: 6
---

# 다중 정의

일부 자바스크립트 함수는 다양한 수와 다양한 타입의 인수로 호출할 수 있습니다. 예를 들어 타임스탬프(하나의 인수) 또는 월/일/년 지정(세 개의 인수)을 사용하는 `Date`를 생성하는 함수를 작성할 수 있습니다.

타입스크립트에서는 **다중 정의(overload) 시그니처**를 사용하여 다양한 방식으로 호출 가능한 함수를 묘사할 수 있습니다. 다중 정의 시그니처는 몇 가지 함수 시그니처(보통 두 개 이상)를 작성하고 그 뒤에 함수 본문을 작성하여 만듭니다.

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// 오류: No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
const d3 = makeDate(1, 3);
```

이 예시에서는 두 개의 다중 정의를 작성했습니다. 하나의 인수를 받는 것과 세 개의 인수를 받는 것입니다. 앞의 두 시그니처를 **다중 정의 시그니처**라고 부릅니다.

그런 다음 호환되는 시그니처를 사용하여 함수 구현을 작성했습니다. 함수에 **구현** 시그니처가 있지만 이 시그니처를 직접 호출하는 것은 불가능합니다. 필수 매개변수 다음에 선택적 매개변수가 두 개 있는 함수를 작성했지만 두 개의 매개변수로 호출하는 것은 불가능합니다!

## 다중 정의 시그니처와 구현 시그니처

이것은 일반적인 혼란의 원인입니다. 사람들은 종종 다음과 같은 코드를 작성하고 오류가 왜 발생하는지 모릅니다.

```ts
function fn(x: string): void;
function fn() {
  // ...
}
// 0개의 인수로 호출 가능할 것이라 예상합니다.
// 오류: Expected 1 arguments, but got 0.
fn();
```

함수 본문을 작성하는 데 사용되는 시그니처는 외부에서 볼 수 없다는 점을 주의해야 합니다.

:::caution

**구현** 시그니처는 외부에서 보이지 않습니다. 다중 정의 함수를 작성할 때는 항상 함수 구현 위에 두 개 이상의 시그니처가 있어야 합니다.

:::

구현 시그니처도 다중 정의 시그니처와 **호환**되어야 합니다.

예를 들어 다음 함수에서는 구현 시그니처가 다중 정의와 호환되지 않아서 오류가 발생합니다.

```ts
function fn(x: boolean): void;
// 인수 타입이 올바르지 않습니다.
// 오류: This overload signature is not compatible with its implementation signature.
function fn(x: string): void;
function fn(x: boolean) {}
```

```ts
function fn(x: string): string;
// 반환 타입이 올바르지 않습니다.
// 오류: This overload signature is not compatible with its implementation signature.
function fn(x: number): boolean;

function fn(x: string | number) {
  return "oops";
}
```

## 좋은 다중 정의 작성하기

제네릭과 마찬가지로 함수 다중 정의를 사용할 때 따라야 할 지침이 몇 가지 있습니다. 이 원칙을 따르면 함수를 더 쉽게 호출하고, 이해하고, 구현할 수 있습니다.

다음과 같이 문자열이나 배열의 길이를 반환하는 함수가 있다고 가정해 보겠습니다.

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

이 함수는 문제가 없습니다. 문자열이나 배열로 호출할 수 있습니다. 그러나 타입스크립트는 함수 호출을 단일 다중 정의로만 해결할 수 있기 때문에 문자열 또는 배열일 수 있는 값으로 호출하는 것은 불가능합니다.

```ts
len(""); // 문제 없습니다.
len([0]); // 문제 없습니다.
// 오류: No overload matches this call.
//   Overload 1 of 2, '(s: string): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//       Type 'number[]' is not assignable to type 'string'.
//   Overload 2 of 2, '(arr: any[]): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'any[]'.
//       Type 'string' is not assignable to type 'any[]'.No overload matches this call.
len(Math.random() > 0.5 ? "hello" : [0]);
```

두 다중 정의의 인수 개수와 반환 타입이 같으므로, 다중 정의가 없는 함수를 대신 작성할 수 있습니다.

```ts
function len(x: any[] | string) {
  return x.length;
}
```

이게 훨씬 낫네요! 호출자는 두 타입의 값으로 함수를 호출할 수 있습니다. 그리고 올바른 구현 시그니처를 알아낼 필요가 없습니다.

:::info 정리

가능하면 매개변수에서 다중 정의 대신 합집합 타입을 사용하세요.

:::

## 함수에서 `this` 선언하기

타입스크립트는 코드 흐름 분석을 통해 함수에서 `this`가 무엇인지 추론합니다.

예시:

```ts
const user = {
  id: 123,
 
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

타입스크립트는 `user.becomeAdmin` 함수의 `this`가 외부 객체 `user`라는 것을 압니다. 대부분의 경우 `this`는 이것만으로 충분합니다. 하지만 `this`가 가리키는 객체를 지정하고 싶을 때가 있습니다.

자바스크립트 명세서에는 `this`라는 이름을 가진 매개변수를 사용할 수 없다고 명시되어 있습니다. 따라서 타입스크립트에서는 이 문법을 사용하여 함수 본문에서 `this`의 타입을 선언할 수 있습니다.

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

이 패턴은 다른 객체가 일반적으로 함수 호출 시기를 제어하는 콜백 스타일 API에서 많이 사용합니다. 여기서는 화살표 함수가 아닌 `function`을 사용해야 합니다.

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
// 오류: The containing arrow function captures the global value of 'this'.
//   Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
const admins = db.filterUsers(() => this.admin);
```
