---
sidebar_position: 10
---

# 표현식

:::note 배경 지식

[클래스 표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/class)

:::

클래스 표현식은 클래스 선언과 매우 유사합니다. 유일하고 실질적인 차이점은 클래스 표현식에 이름이 필요하지 않다는 것입니다. 하지만 바인딩된 식별자를 통한 참조가 가능합니다.

```ts twoslash
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
//    ^?
```
