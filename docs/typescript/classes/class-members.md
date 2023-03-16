---
sidebar_position: 1
---

# 클래스 멤버

다음은 가장 기본적인 클래스인 빈 클래스입니다.

```ts
class Point {}
```

이 클래스는 그다지 유용하지 않으므로 몇 가지 멤버를 추가해 보겠습니다.

## 필드

필드 선언은 클래스에 쓰기 가능한 공용 프로퍼티를 만듭니다.

```ts
class Point {
  x: number;
  y: number;
}
 
const pt = new Point();
pt.x = 0;
pt.y = 0;
```

다른 타입과 마찬가지로 타입 주석은 선택 사항이지만 지정하지 않으면 암시적인 `any`가 됩니다.

필드는 **초깃값**을 가질 수 있습니다. 클래스가 인스턴스화되면 자동으로 해당 값으로 초기화됩니다.

```ts
class Point {
  x = 0;
  y = 0;
}
 
const pt = new Point();
// '0, 0'이 출력됩니다.
console.log(`${pt.x}, ${pt.y}`);
```

`const`, `let`, `var`과 마찬가지로 클래스 프로퍼티의 초깃값은 타입 추론에 사용됩니다.

```ts
const pt = new Point();
// 오류: Type 'string' is not assignable to type 'number'.
pt.x = "0";
```

### `--strictPropertyInitialization`

[`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization) 설정은 생성자에서의 클래스 필드 초기화 여부를 제어합니다.

```ts
class BadGreeter {
  // 오류: Property 'name' has no initializer and is not definitely assigned in the constructor.
  name: string;
}
```

```ts
class GoodGreeter {
  name: string;
 
  constructor() {
    this.name = "hello";
  }
}
```

필드는 **생성자**에서 초기화되어야 합니다. 타입스크립트는 초기화를 감지하기 위해 생성자에서 호출하는 메서드를 분석하지 않습니다. 파생 클래스가 해당 메서드를 재정의하고 멤버를 초기화하지 못할 수 있기 때문입니다.

생성자 이외의 수단을 통해 필드를 확실히 초기화하려는 경우 (예를 들어 외부 라이브러리가 클래스의 일부를 채우는 경우) **확정 할당 단언 연산자, `!`**를 사용할 수 있습니다.

```ts
class OKGreeter {
  // 초기화되지 않았지만 오류가 발생하지 않습니다.
  name!: string;
}
```

## `readonly`

필드에는 `readonly` 수정자가 붙을 수 있습니다. 이는 생성자 외부에서의 필드에 대한 할당을 막습니다.

```ts
class Greeter {
  readonly name: string = "world";
 
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
 
  err() {
    // 오류: Cannot assign to 'name' because it is a read-only property.
    this.name = "not ok";
  }
}
const g = new Greeter();
// 오류: Cannot assign to 'name' because it is a read-only property.
g.name = "also not ok";
```

## 생성자

:::note 배경 지식

[MDN의 생성자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor)

:::

클래스 생성자는 함수와 매우 유사합니다. 타입 주석, 기본값, 다중 정의(overload)가 있는 매개변수를 추가할 수 있습니다.

```ts
class Point {
  x: number;
  y: number;
 
  // 기본값이 있는 일반 시그니처
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

```ts
class Point {
  // 다중 정의
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // 미정
  }
}
```

클래스 생성자 시그니처와 함수 시그니처 사이에는 몇 가지 차이점이 있습니다.

- 생성자는 타입 매개변수를 가질 수 없습니다. 이는 나중에 배울 외부 클래스 선언에 속합니다.
- 생성자는 반환 타입 주석을 가질 수 없습니다. 반환되는 것은 항상 클래스 인스턴스 타입입니다.

### `super` 호출

자바스크립트에서와 마찬가지로 기본 클래스가 있다면, `this.` 멤버를 사용하기 전에 생성자 본문에서 `super();`를 호출해야 합니다.

```ts
class Base {
  k = 4;
}
 
class Derived extends Base {
  constructor() {
    // ES5에서는 잘못된 값을 출력합니다. ES6에서는 예외가 발생합니다.
    // 오류: 'super' must be called before accessing 'this' in the constructor of a derived class.
    console.log(this.k);
    super();
  }
}
```

`super` 호출을 잊는 것은 자바스크립트에서 저지르기 쉬운 실수입니다. 하지만 타입스크립트에서는 필요할 때 알려줍니다.

## 메서드

:::note 배경 지식

[MDN의 메서드 정의](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Method_definitions)

:::

클래스의 함수 프로퍼티를 **메서드**라고 합니다. 함수와 생성자에서 사용하는 모든 타입 주석을 메서드에서도 사용할 수 있습니다.

```ts
class Point {
  x = 10;
  y = 10;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

타입스크립트는 메서드에 표준 타입 주석 외의 새로운 것을 추가하지 않습니다.

메서드 본문 내에서는 여전히 `this.`를 통해 필드와 기타 메서드에 접근해야 합니다. 메서드 본문의 잘못된 이름은 항상 해당 스코프에 있는 것을 참조합니다.

```ts
let x: number = 0;
 
class C {
  x: string = "hello";
 
  m() {
    // 클래스 프로퍼티가 아니라 첫 줄의 x를 수정하려고 합니다.
    // 오류: Type 'string' is not assignable to type 'number'.
    x = "world";
  }
}
```

## 획득자/설정자

클래스에서는 **접근자**를 사용할 수 있습니다.

```ts
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

:::note 참고

추가 논리가 없는 필드 지원 `get`/`set` 쌍은 자바스크립트에서 쓸모가 거의 없습니다. `get`/`set` 작업에 추가 논리가 필요하지 않다면 `public` 필드를 노출해도 됩니다.

:::

타입스크립트에는 접근자에 대한 몇 가지 특별한 추론 규칙이 있습니다.

- `get`이 있지만 `set`이 없으면, 프로퍼티는 자동으로 `readonly`입니다.
- 설정자 매개변수의 타입을 지정하지 않으면, 해당 타입은 획득자의 반환 타입에서 추론됩니다.
- 획득자와 설정자는 [멤버 가시성](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)을 가져야 합니다.

[타입스크립트 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/)부터는 획득자와 설정자가 다른 타입을 가지는 것이 가능합니다.

```ts
class Thing {
  _size = 0;
 
  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
 
    // NaN, Infinity 등이 허용되지 않습니다.
 
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}
```

## 색인 시그니처

클래스는 색인 시그니처를 선언할 수 있습니다. 이는 [객체 타입의 색인 시그니처](docs/typescript/object-types.md#색인-시그니처)와 동일하게 작동합니다.

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
```

색인 시그니쳐 타입은 메서드 타입도 잡아야 하기 때문에 유용하게 사용하기가 쉽지 않습니다. 일반적으로 색인화된 데이터는 클래스 인스턴스 자체가 아닌 다른 위치에 저장하는 것이 좋습니다.