---
sidebar_position: 11
---

# 추상 클래스와 멤버

타입스크립트의 클래스, 메서드, 필드는 **추상적**일 수 있습니다.

**추상 메서드** 또는 **추상 필드**는 구현되지 않은 것입니다. 이러한 멤버는 직접 인스턴스화할 수 없는 **추상 클래스** 내에 있어야 합니다.

추상 클래스의 역할은 모든 추상 멤버를 구현하는 하위 클래스의 기본 클래스입니다. 클래스에 추상 멤버가 없으면 **구체적**이라고 합니다.

예시를 살펴보겠습니다.

```ts
abstract class Base {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}

// 오류: Cannot create an instance of an abstract class.
const b = new Base();
```

추상적이기 때문에 `new`로 `Base`를 인스턴스화할 수 없습니다. 대신 파생 클래스를 만들고 추상 멤버를 구현해야 합니다.

```ts
class Derived extends Base {
  getName() {
    return "world";
  }
}
 
const d = new Derived();
d.printName();
```

기본 클래스의 추상 멤버를 구현하는 것을 잊어버리면 오류가 발생합니다.

```ts
// 오류: Non-abstract class 'Derived' does not implement inherited abstract member 'getName' from class 'Base'.
class Derived extends Base {
  // 무언가를 하는 것을 잊었습니다.
}
```

## 추상 생성 시그니처

때로는 추상 클래스에서 파생되는 클래스의 인스턴스를 생성하는 클래스 생성자 함수를 만들고 싶을 수 있습니다.

예를 들어 다음 코드를 작성할 수 있습니다.

```ts
function greet(ctor: typeof Base) {
  // 오류: Cannot create an instance of an abstract class.
  const instance = new ctor();
  instance.printName();
}
```

타입스크립트는 추상 클래스를 인스턴스화하려고 한다는 것을 올바르게 알려줍니다.

`greet`의 정의를 고려할 때, 결국 추상 클래스가 생성되므로 이 코드를 작성하는 것이 완벽하게 허용될 것입니다.

```ts
// 옳지 않습니다!
greet(Base);
```

대신 생성 시그니처가 있는 것을 받는 함수를 작성하려고 합니다.

```ts
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);
// 오류: Argument of type 'typeof Base' is not assignable to parameter of type 'new () => Base'.
//   Cannot assign an abstract constructor type to a non-abstract constructor type.
greet(Base);
```

이제 타입스크립트는 어떤 클래스 생성자 함수를 호출할 수 있는지 정확하게 알려줍니다. `Derived`는 구체적이기 때문에 가능하지만 `Base`는 불가능합니다.