---
sidebar_position: 4
---

# 클래스

타입스크립트 클래스에는 ES2015 자바스크립트 클래스에 대한 몇 가지 타입별 확장과 런타임 추가 요소가 있습니다.

## 클래스

### 클래스 인스턴스 만들기

```ts
class ABC { ... }
const abc = new ABC();
```

`new ABC`의 매개변수는 생성자 함수에서 가져옵니다.

### `private x` vs `#private`

접두사 `private`은 타입 전용 추가 요소이며 런타임에는 영향을 주지 않습니다.

다음 예시에서는 클래스 외부의 코드가 `item`에 접근할 수 있습니다.

```ts
class Bag {
  private item: any;
}
```

`#private`는 런타임에서 비공개입니다. 클래스 내부에서만 접근할 수 있도록 자바스크립트 엔진이 강제합니다.

```ts
class Bag { #item: any }
```

### 클래스의 `this`

함수 내부의 `this` 값은 함수가 호출되는 방식에 따라 다릅니다. 다른 언어에서처럼 `this`가 항상 클래스의 인스턴스인 것은 아닙니다.

문제가 생겼을 때는 `this` 매개변수, `bind` 함수, 화살표 함수를 활용할 수 있습니다.

### 타입과 값

클래스는 타입이나 값으로 사용될 수 있습니다.

```ts
// 앞의 Bag은 타입이고 뒤의 Bag은 값입니다.
const a: Bag = new Bag();
```

따라서 다음과 같이 하지 않도록 주의하세요.

```ts
class C implements Bag {}
```

## 일반 구문

```ts
// 이 클래스는 Account의 하위 클래스입니다.
// 이 클래스는 인터페이스 또는 타입 집합인 Updatable과 Serializable을 준수합니다.
class User extends Account implements Updatable, Serializable {
  id: string; // 필드
  displayName?: boolean; // 선택적 필드
  name!: string; // 분명히 존재한다고 말하는 필드
  #attributes: Map<any, any>; // 비공개 필드
  roles = ["user"]; // 기본값이 있는 필드
  readonly createdAt = new Date() // 기본값이 있는 읽기 전용 필드
  
  // new에서 호출되는 코드
  constructor(id: string, email: string) {
    super(id);
    // 'strict: true'이면 이 코드는 올바르게 설정되었는지 확인하기 위해 필드에 대해 검사됩니다.
    this.email = email;
    ...
  }
  
  // 클래스 메서드 및 화살표 함수 필드를 묘사하는 방법
  setName(name: string) { this.name = name }
  verifyName = (name: string) => { ... }
  
  // 2개의 다중 정의가 있는 함수
  sync(): Promise<{ ... }>;
  sync(cb: ((result: string) => void)): void;
  sync(cb?: ((result: string) => void)): void | Promise<{ ... }> { ... }

  // 획득자와 설정자
  get accountID() {}
  set accountID(value: string) {}
  
  // private 접근은 이 클래스에서만 가능하고, protected는 하위 클래스를 허용합니다. 타입 검사에서만 사용되며 기본값은 public입니다.
  private makeRequest() { ... }
  protected handleRequest() { ... }
  
  // 정적 필드와 메서드
  static #usetCount = 0;
  static registerUser(user: User) { ... }
  
  // 정적 변수를 설정하기 위한 정적 블록으로 this는 정적 클래스를 나타냅니다.
  static { this.#userCount = -1 }
};
```

## 제네릭

클래스 메서드에서 변경할 수 있는 타입을 선언합니다.

```ts
// Type은 클래스 타입 매개변수입니다.
class Box<Type> {
  contents: Type;
  // Type은 이곳에서 사용됩니다.
  constructor(value: Type) {
    this.contents = value;
  }
}
const stringBox = new Box("a package");
```

------

다음 기능들은 현재 구문으로는 자바스크립트에 적용되지 않는 타입스크립트만의 언어 확장입니다.

## 매개변수 프로퍼티

인스턴스 필드를 입력 매개변수로 자동 설정합니다. 클래스에 대한 타입스크립트만의 확장입니다.

```ts
class Location {
  constructor(public x: number, public y: number) {}
}

const loc = new Location(20, 40);
loc.x // 20
loc.y // 40
```

## 추상 클래스

구현은 불가능하지만 상속의 대상이 될 수 있는 클래스입니다. 클래스의 요소로 선언될 수도 있습니다.

```ts
abstract class Animal {
  abstract getName(): string;
  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Dog extends Animal { getName(): { ... } }
```

## 데코레이터와 프로퍼티

클래스, 클래스 메서드, 접근자, 프로퍼티, 메서드의 매개변수에 데코레이터를 사용할 수 있습니다.

```ts
import {
  Syncable, triggersSync, preferCache, required
} from "mylib";

@Syncable
class User {
  @triggersSync()
  save() { ... }
  
  @preferCache(false)
  get displayName() { ... }
  
  update(@required info: Partial<User>) { ... }
}
```

