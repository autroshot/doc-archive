---
sidebar_position: 3
---

# 멤버 가시성

타입스크립트를 사용하여 특정 메서드나 프로퍼티가 클래스 외부의 코드에 표시되는지 여부를 제어할 수 있습니다.

## `public`

클래스 멤버의 기본 가시성은 `public`입니다. `public` 멤버는 어디에서나 접근할 수 있습니다.

```ts twoslash
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

`public`은 이미 기본 가시성 수정자이므로 클래스 멤버에 쓸 필요는 없지만, 스타일과 가독성을 위해 사용할 수 있습니다.

## `protected`

`protected` 멤버는 자신이 선언된 클래스의 하위 클래스에서만 볼 수 있습니다.

```ts twoslash
// @errors: 2445
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends Greeter {
  public howdy() {
    // 여기에서 protected 멤버에 접근할 수 있습니다.
    console.log("Howdy, " + this.getName());
    //                          ^^^^^^^^^^^^^^
  }
}
const g = new SpecialGreeter();
g.greet(); // 문제없습니다.
g.getName();
```

### `protected` 멤버의 노출

파생 클래스는 기본 클래스의 계약을 따라야 합니다. 하지만 기본 클래스의 하위 타입을 더 노출되게 만드는 것이 가능합니다. 예를 들어 `protected` 멤버를 `public`으로 만들 수 있습니다.

```ts twoslash
class Base {
  protected m = 10;
}
class Derived extends Base {
  // 수정자가 없으므로 기본값은 public입니다.
  m = 15;
}
const d = new Derived();
console.log(d.m); // 문제없습니다.
```

`Derived`는 이미 `m`을 자유롭게 읽고 쓸 수 있으므로 멤버의 보안이 의미 있게 변하지는 않습니다. 파생 클래스에서 이러한 노출을 원하지 않는다면, `protected` 수정자를 반복할 필요가 있다는 점을 주의해야 합니다.

### 계층 간의 `protected` 접근

다른 OOP 언어는 기본 클래스 참조를 통한 `protected` 멤버 접근에 대한 의견이 다릅니다.

```ts twoslash
// @errors: 2446
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {
    other.x = 10;
  }
}
```

예를 들어 자바는 이를 허용합니다. 반면 C#과 C++는 이 코드를 허용하지 않습니다.

C# 및 C++의 타입스크립트 측은 `Derived2`의 `x`에 접근하는 것이 `Derived2`의 하위 클래스에서만 허용되어야 하고 `Derived1`은 그 중 하나가 아니기 때문입니다. 게다가 `Derived1` 참조를 통해 `x`에 접근하는 것이 허용되지 않는다면, 기본 클래스 참조를 통한 접근도 동일해야 합니다.

['파생 클래스에서 protected 멤버에 접근할 수 없는 이유는 무엇인가요?'](https://blogs.msdn.microsoft.com/ericlippert/2005/11/09/why-cant-i-access-a-protected-member-from-a-derived-class/)를 참고하세요. 이는 C#의 추론을 잘 설명합니다.

## `private`

`private`은 `protected`와 유사하지만 하위 클래스에서의 멤버에 대한 접근도 허용하지 않습니다.

```ts twoslash
// @errors: 2341
class Base {
  private x = 0;
}
const b = new Base();
// 클래스 외부에서 접근할 수 없습니다.
console.log(b.x);
```

```ts twoslash
// @errors: 2341
class Base {
  private x = 0;
}
// ---cut---
class Derived extends Base {
  showX() {
    // 하위 클래스에서 접근할 수 없습니다.
    console.log(this.x);
  }
}
```

`private` 멤버는 파생 클래스에 표시되지 않으므로 파생 클래스에서 해당 멤버의 가시성을 높일 수는 없습니다.

```ts twoslash
// @errors: 2415
class Base {
  private x = 0;
}
class Derived extends Base {
  x = 1;
}
```

### 인스터스 간의 `private` 접근

다른 OOP 언어는 동일한 클래스의 다른 인스턴스가 서로의 `private` 멤버에 접근 가능한지에 대해 의견이 다릅니다. 자바, C#, C++, 스위프트, PHP에서는 이를 허용하지만 루비에서는 허용하지 않습니다.

타입스크립트는 인스터스 간의 `private` 접근을 허용합니다.

```ts twoslash
class A {
  private x = 10;
 
  public sameAs(other: A) {
    // 오류가 발생하지 않습니다.
    return other.x === this.x;
  }
}
```

### 주의 사항

다른 타입 시스템과 마찬가지로 `private`과 `protected`는 [타입 검사 중에만 적용됩니다](https://www.typescriptlang.org/play?removeComments=true&target=99&ts=4.3.4#code/PTAEGMBsEMGddAEQPYHNQBMCmVoCcsEAHPASwDdoAXLUAM1K0gwQFdZSA7dAKWkoDK4MkSoByBAGJQJLAwAeAWABQIUH0HDSoiTLKUaoUggAW+DHorUsAOlABJcQlhUy4KpACeoLJzrI8cCwMGxU1ABVPIiwhESpMZEJQTmR4lxFQaQxWMm4IZABbIlIYKlJkTlDlXHgkNFAAbxVQTIAjfABrAEEC5FZOeIBeUAAGAG5mmSw8WAroSFIqb2GAIjMiIk8VieVJ8Ar01ncAgAoASkaAXxVr3dUwGoQAYWpMHBgCYn1rekZmNg4eUi0Vi2icoBWJCsNBWoA6WE8AHcAiEwmBgTEtDovtDaMZQLM6PEoQZbA5wSk0q5SO4vD4-AEghZoJwLGYEIRwNBoqAzFRwCZCFUIlFMXECdSiAhId8YZgclx0PsiiVqOVOAAaUAFLAsxWgKiC35MFigfC0FKgSAVVDTSyk+W5dB4fplHVVR6gF7xJrKFotEk-HXIRE9PoDUDDcaTAPTWaceaLZYQlmoPBbHYx-KcQ7HPDnK43FQqfY5+IMDDISPJLCIuqoc47UsuUCofAME3Vzi1r3URvF5QV5A2STtPDdXqunZDgDaYlHnTDrrEAF0dm28B3mDZg6HJwN1+2-hg57ulwNV2NQGoZbjYfNrYiENBwEFaojFiZQK08C-4fFKTVCozWfTgfFgLkeT5AUqiAA).

이는 `in`이나 단순 프로퍼티 룩업과 같은 자바스크립트 런타입 구조가 여전히 `private`이나 `protected` 멤버에 접근할 수 있음을 의미합니다.

```ts twoslash
class MySafe {
  private secretKey = 12345;
}
```

```js
// 자바스크립트 파일에서...
const s = new MySafe();
// 12345를 출력합니다.
console.log(s.secretKey);
```

`private`은 타입 검사 중에 대괄호 표기법을 사용하여 접근할 수 있습니다. 이를 이용하면 단위 테스트 등에서 `private`로 선언된 필드에 쉽게 접근할 수 있습니다. 하지만 이런 **느슨한 `private`**은 엄격하지 않다는 단점이 있습니다.

```ts twoslash
// @errors: 2341
class MySafe {
  private secretKey = 12345;
}
 
const s = new MySafe();
 
// 타입 검사 중에는 허용되지 않습니다.
console.log(s.secretKey);
 
// 문제없습니다.
console.log(s["secretKey"]);
```

타입스크립트의 `private`와 달리 자바스크립트의 [`private` 필드(`#`)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields)는 컴파일 후에도 `private`으로 유지됩니다. 그리고 이전에 언급한 대괄호 표기법 접근과 같은 탈출용 해치를 제공하지 않으므로 **엄격한 `private`**이 됩니다.

```ts twoslash
class Dog {
  #barkAmount = 0;
  personality = "happy";
 
  constructor() {}
}
```

```ts twoslash
// @target: esnext
// @showEmit
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

ES2021 이하로 컴파일할 때 타입스크립트는 `#` 대신 위크맵을 사용합니다.

```ts twoslash
// @target: es2015
// @showEmit
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

악의적인 사용자로부터 클래스의 값을 보호해야 한다면 클로저, 위크맵, `private` 필드와 같은 강력한 런타임 프라이버시를 제공하는 메커니즘을 사용해야 합니다. 런타임 동안 이러한 추가 프라이버시 확인은 성능에 영향을 미칠 수 있습니다.