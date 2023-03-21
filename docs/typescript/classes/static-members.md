---
sidebar_position: 4
---

# 정적 멤버

:::note 배경 지식

[정적 멤버](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/static)

:::

클래스에는 `static` 멤버가 있을 수 있습니다. 이 멤버는 클래스의 특정 인스턴스와 연결되지 않습니다. 클래스 생성자 객체 자체를 통해 접근할 수 있습니다.

```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

정적 멤버는 동일하게 `public`, `protected`, `private`와 같은 가시성 한정자를 사용할 수 있습니다.

```ts
class MyClass {
  private static x = 0;
}
// 오류: Property 'x' is private and only accessible within class 'MyClass'.
console.log(MyClass.x);
```

정적 멤버도 상속됩니다.

```ts
class Base {
  static getGreeting() {
    return "Hello world";
  }
}
class Derived extends Base {
  myGreeting = Derived.getGreeting();
}
```

## 특별한 정적 이름

일반적으로 `Function` 프로토타입에서 프토퍼티를 덮어쓰는 것은 안전하지 않고 가능하지 않습니다. 클래스 자체가 `new`로 호출할 수 있는 함수이기 때문에 특정 `static` 이름은 사용할 수 없습니다. `name`, `length`, `call`과 같은 함수 프로퍼티는 `static` 멤버로 정의할 수 없습니다.

```ts
class S {
  // 오류: Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
  static name = "S!";
}
```

## 정적 클래스가 없는 이유

타입스크립트(와 자바스크립트)에는 C#과 같은 방식의 `static class`라는 구조가 없습니다.

정적 클래스 구조는 해당 언어가 모든 데이터와 함수가 클래스 내부에만 있도록 강제하기 때문에 존재합니다. 타입스크립트에는 이러한 제한이 없기 때문에 정적 클래스가 필요하지 않습니다. 단일 인스턴스만 있는 클래스는 일반적으로 자바스크립트나 타입스크립트에서 일반적인 **객체**로 표시됩니다.

예를 들어 타입스크립트에는 정적 클래스 구문이 필요하지 않습니다. 일반 객체(또는 최상위 함수)도 같은 작업을 수행할 수 있기 때문입니다.

```ts
// 불필요한 정적 클래스
class MyStaticClass {
  static doSomething() {}
}
 
// 선호되는 대안 1
function doSomething() {}
 
// 선호되는 대안 2
const MyHelperObject = {
  dosomething() {},
};
```
