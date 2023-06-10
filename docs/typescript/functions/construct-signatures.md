---
sidebar_position: 3
---

# 생성 시그니처

자바스크립트 함수는 `new` 연산자와 함께 호출될 수도 있습니다. 이 연산자는 일반적으로 새 객체를 만들기 때문에 타입스크립트에서는 이를 **생성자**라고 부릅니다.

다음과 같이 호출 시그니처 앞에 `new` 키워드를 추가하여 **생성 시그니처**를 작성할 수 있습니다.

```ts twoslash
type SomeObject = any;
// ---cut---
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

자바스크립트의 `Date` 객체와 같은 일부 객체는 `new` 유무와 관계없이 호출 가능합니다. 동일한 타입의 호출과 생성 시그니처를 임의로 결합할 수 있습니다.

```ts twoslash
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```
