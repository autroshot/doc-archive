---
sidebar_position: 6
---

# 제네릭 클래스

인터페이스와 마찬가지로 클래스는 제네릭일 수 있습니다. 제네릭 클래스가 `new`로 인스턴스화되면 타입 매개변수는 함수 호출에서와 같은 방식으로 추론됩니다.

```ts
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

// const b: Box<string>
const b = new Box("hello!");
```

클래스는 인터페이스와 동일한 방식으로 일반 제약 조건과 기본값을 사용할 수 있습니다.

## 정적 멤버의 타입 매개변수

이 코드는 허용되지 않는데 그 이유가 명확하지 않을 수 있습니다.

```ts
class Box<Type> {
  // 오류: Static members cannot reference class type parameters.
  static defaultValue: Type;
}
```

타입은 항상 완전히 지워진다는 점을 기억하세요! 런타임에는 `Box.defaultValue` 프로퍼티 슬롯만 존재합니다. 이는 `Box<string>.defaultValue`를 바꾸면 `Box<number>.defaultValue`도 변경된다는 것을 의미합니다.

일반 클래스의 `static` 멤버는 클래스의 타입 매개변수를 참조할 수 없습니다.

