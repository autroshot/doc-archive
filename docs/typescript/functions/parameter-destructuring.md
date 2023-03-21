---
sidebar_position: 9
---

# 매개변수 구조 분해

:::note 배경 지식

[구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

:::

매개변수 구조 분해를 사용하면 인수로 제공된 객체를 함수 본문의 하나 이상의 지역 변수로 편리하게 분해할 수 있습니다.

자바스크립트에서는 다음과 같습니다.

```ts
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

객체에 대한 타입 주석은 구조 분해 구문 다음에 옵니다.

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

다소 장황해 보일 수 있지만 여기서도 명명된 타입을 사용할 수 있습니다.

```ts
// 이전 예시와 동일합니다.
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```
