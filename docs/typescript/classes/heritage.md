---
sidebar_position: 2
---

# 상속

객체 지향 기능이 있는 다른 언어와 마찬가지로 자바스크립트의 클래스는 기본 클래스에서 상속할 수 있습니다.

## `implements`절

`implements`절을 사용하여 클래스가 특정 `interface`를 충족하는지 확인할 수 있습니다. 클래스가 올바르게 구현되지 않으면 오류가 발생합니다.

```ts
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

// 오류: Class 'Ball' incorrectly implements interface 'Pingable'.
//   Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
class Ball implements Pingable {
  pong() {
    console.log("pong!");
  }
}
```

클래스는 `class C implements A, B {`와 같이 여러 인터페이스를 구현할 수도 있습니다. 

### 주의 사항

`implements`절은 클래스가 인터페이스 타입으로 취급될 수 있는지 확인할 뿐입니다. 클래스나 메서드의 타입을 **전혀** 변경하지 않습니다. `implements`절이 클래스 타입을 변경한다고 잘못 생각해서 오류가 많이 발생하곤 합니다.

```ts
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {
  // 오류: Parameter 's' implicitly has an 'any' type.
  check(s) {
    // 여기서는 오류가 발생하지 않습니다.
    return s.toLowercse() === "ok";
  }
}
```

이 예시에서 `s`의 타입이 `check`의 `name: string` 매개변수의 영향을 받을 것이라고 예상할 것입니다. 하지만 그렇지 않습니다. `implements`절은 클래스 본문을 확인하거나 타입의 추론 방식을 변경하지 않습니다.

마찬가지로 선택적 프로퍼티를 사용하여 인터페이스를 구현해도 해당 프로퍼티가 생성되지 않습니다.

```ts
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
// 오류: Property 'y' does not exist on type 'C'.
c.y = 10;
```

## `extends`절

:::note 배경 지식

[`extends` 키워드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

:::

클래스는 기본 클래스에서 `extend`(확장)될 수 있습니다. 파생 클래스에는 기본 클래스의 모든 프로퍼티와 메서드가 있으며 추가 멤버도 정의합니다.

```ts
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// 기본 클래스의 메서드
d.move();
// 파생 클래스의 메서드
d.woof(3);
```

### 메서드 재정의

:::note 배경 지식

[`super` 키워드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

:::

파생 클래스는 기본 클래스의 필드나 프로퍼티를 재정의(override)할 수 있습니다. `super.` 문법을 사용하여 기본 클래스의 메서드에 접근할 수 있습니다. 자바스크립트의 클래스는 단순한 룩업 객체이기 때문에 슈퍼 필드(super field)라는 개념이 없습니다.

타입스크립트는 파생 클래스가 항상 기본 클래스의 하위 타입이 되게 합니다.

예를 들어 다음은 메서드를 재정의하는 합법적인 방법입니다.

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");
```

파생 클래스가 기본 클래스의 계약을 따르는 것이 중요합니다. 기본 클래스 참조로 파생 클래스 인스턴스를 참조하는 것은 매우 일반적이며 항상 합법적입니다.

```ts
// 기본 클래스 참조를 이용해 파생 인스턴스의 별칭을 지정합니다.
const b: Base = d;
// 문제없습니다.
b.greet();
```

만약 `Derived`가 `Base`의 계약을 따르지 않는다면 어떻게 될까요?

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // name 매개변수를 필수로 만들었습니다.
  // 오류: Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
  //   Type '(name: string) => void' is not assignable to type '() => void'.
  greet(name: string) {
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

오류를 무시하고 다음 코드를 컴파일하면 충돌이 발생합니다.

```ts
const b: Base = new Derived();
// name이 undefined이므로 충돌합니다.
b.greet();
```

### 타입 전용 필드 선언

`target >= ES2022` 또는 [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig#useDefineForClassFields)가 `true`이면, 상위 클래스 생성자가 완료된 후에 클래스 필드가 초기화되어 상위 클래스에서 설정한 모든 값을 덮어씁니다. 이는 상속된 필드에 대해 더 정확한 타입을 다시 선언하려는 경우에만 문제가 될 수 있습니다. `declare`를 사용하여 런타임에서는 필드 선언이 없어야 함을 타입스크립트에 나타낼 수 있습니다.

```ts
interface Animal {
  dateOfBirth: any;
}
 
interface Dog extends Animal {
  breed: any;
}
 
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
 
class DogHouse extends AnimalHouse {
  // 자바스크립트 코드를 내보내지 않습니다.
  // 타입이 올바른지만 확인합니다.
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
```

### 초기화 순서

경우에 따라 자바스크립트 클래스가 초기화되는 순서가 예상과 다를 수 있습니다. 다음 코드를 살펴보겠습니다.

```ts
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class Derived extends Base {
  name = "derived";
}
 
// derived가 아닌 base를 출력합니다.
const d = new Derived();
```

무슨 일이 생긴 걸까요?

자바스크립트에서 정의한 클래스 초기화 순서는 다음과 같습니다.

- 기본 클래스의 필드가 초기화됨
- 기본 클래스의 생성자가 실행됨
- 파생 클래스의 필드가 초기화됨
- 파생 클래스의 생성자가 실행됨

파생 클래스의 필드가 아직 초기화되지 않았기 때문에, 기본 클래스의 생성자가 자신의 `name` 값을 보았습니다.

### 내장 타입 상속

:::note 참고

`Array`, `Error`, `Map`과 같은 내장 타입에서 상속할 계획이 없거나, 컴파일 대상이 명시적으로 `ES6`/`ES2015` 이상으로 설정된 경우에는 이 섹션을 건너뛰어도 됩니다.

:::

ES2015에서 객체를 반환하는 생성자는 암시적으로 `super(...)` 호출자를 `this` 값으로 대체합니다. 생성된 생성자 코드는 `super(...)`의 잠재적 반환값을 잡고 `this`로 대체해야 합니다.

그 결과 `Error`, `Array` 등의 하위 클래스가 더 이상 예상대로 작동하지 않을 수 있습니다. 이는 `Error`, `Array` 등의 생성자 함수가 프로토타입 체인을 조정하기 위해 ES6의 `new.target`을 사용하기 때문입니다. 그러나 ES5에서는 생성자를 호출할 때 `new.target`의 값을 보장할 방법이 없습니다. 다른 하위 수준 컴파일러도 기본적으로 동일한 제한을 가집니다.

다음의 하위 클래스를 살펴보겠습니다.

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);
  }
  sayHello() {
    return "hello " + this.message;
  }
}
```

다음을 발견할 수 있습니다.

- 메서드는 하위 클래스에서 생성되어 반환된 객체에서 `undefined`일 수 있으므로, `sayHello`를 호출하면 오류가 발생합니다.
- `instanceof`는 하위 클래스의 인스턴스와 상위 인스턴스 사이에서 끊어집니다. 따라서 `(new MsgError()) instanceof MsgError`는 `false`를 반환합니다.

권장 사항으로, `super(...)` 호출 직후에 프로토타입을 수동으로 조정할 수 있습니다.

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);
 
    // 프로토타입을 명시적으로 설정합니다.
    Object.setPrototypeOf(this, MsgError.prototype);
  }
 
  sayHello() {
    return "hello " + this.message;
  }
}
```

그러나 `MsgError`의 하위 클래스도 프로토타입을 수동으로 설정해야 합니다. [`Object.setPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)을 지원하지 않는 런타임의 경우에는 [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)를 대신 사용할 수 있습니다.

안타깝게도 [이 해결책은 인터넷 익스플로러 10과 이전 버전에서는 작동하지 않습니다](https://msdn.microsoft.com/en-us/library/s4esdbwz(v=vs.94).aspx). 프로토타입에서 인스턴스 자체로 메서드를 수동으로 복사할 수 있지만 (예: `MsgError.prototype`에서 `this`로) 프로토타입 체인 자체는 수정할 수 없습니다.

