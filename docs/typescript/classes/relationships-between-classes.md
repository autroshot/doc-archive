---
sidebar_position: 12
---

# 클래스 간의 관계

대부분의 경우, 타입스크립트의 클래스는 다른 타입과 마찬가지로 구조적으로 비교됩니다.

예를 들어 다음 두 클래스는 동일하기 때문에 서로 대신할 수 있습니다.

```ts
class Point1 {
  x = 0;
  y = 0;
}
 
class Point2 {
  x = 0;
  y = 0;
}
 
// 문제없습니다.
const p: Point1 = new Point2();
```

마찬가지로 명시적 상속이 없더라도 클래스 간의 하위 타입 관계는 존재합니다.

```ts
class Person {
  name: string;
  age: number;
}
 
class Employee {
  name: string;
  age: number;
  salary: number;
}
 
// 문제없습니다.
const p: Person = new Employee();
```

지금까지는 명료해 보입니다. 하지만 이상해 보이는 경우가 몇 가지 있습니다.

빈 클래스에는 멤버가 없습니다. 구조적 타입 시스템에서 멤버가 없는 타입은 일반적으로 다른 모든 것의 상위 타입입니다. 따라서 빈 클래스를 작성하면 (하지 마세요!) 빈 클래스의 자리를 모든 것이 대체할 수 있습니다.

```ts
class Empty {}
 
function fn(x: Empty) {
  // x로는 아무것도 할 수 없으므로 아무것도 하지 않겠습니다.
}
 
// 모두 문제없습니다!
fn(window);
fn({});
fn(fn);
```