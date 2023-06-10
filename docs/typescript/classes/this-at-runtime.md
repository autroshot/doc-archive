---
sidebar_position: 7
---

# 런타임의 `this`

:::note 배경 지식

[`this` 키워드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

:::

타입스크립트는 자바스크립트의 런타임 동작을 변경하지 않으며, 자바스크립트는 몇 가지 독특한 런타임 동작으로 유명하다는 점을 기억해야 합니다.

자바스크립트에서 `this`를 처리하는 방식은 정말 특이합니다.

```ts twoslash
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};
 
// MyClass가 아닌 obj를 출력합니다.
console.log(obj.getName());
```

간단히 말하면, 기본적으로 함수 내부의 `this` 값은 **함수가 호출된 방식**에 따라 달라집니다. 이 예시에서는 함수가 `obj` 참조를 통해 호출되었기 때문에, 함수의 `this` 값은 클래스 인스턴스가 아닌 `obj`입니다.

이런 일이 일어나기를 바라는 경우는 거의 없습니다! 타입스크립트는 이런 오류를 완화하거나 방지하는 몇 가지 방법을 제공합니다.

## 화살표 함수

:::note 배경 지식

[화살표 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

:::

`this` 컨텍스트를 자주 잃는 함수가 있다면, 메서드 정의 대신 화살표 함수 프로퍼티를 사용하는 것이 좋습니다.

```ts twoslash
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// 충돌하는 대신 MyClass를 출력합니다.
console.log(g());
```

여기에는 몇 가지 장단점이 있습니다.

- 타입스크립트로 확인되지 않은 코드의 경우에도 `this` 값이 런타임에서 정확함을 보장합니다.
- 각 클래스 인스턴스가 해당 방식으로 정의된 각 함수의 자체 사본을 가지기 때문에 더 많은 메모리를 사용합니다.
- 파생 클래스에서 `super.getName`을 사용할 수 없습니다. 프로토타입 사슬에서 기본 클래스 메서드를 가져올 수 없기 때문입니다.

## `this` 매개변수

메서드나 함수 정의에서 `this`라는 이름의 초기 매개변수는 타입스크립트에서 특별한 의미를 갖습니다.

다음 매개변수는 컴파일 중에 지워집니다.

```ts twoslash
type SomeType = any;
// ---cut---
// this 매개변수가 있는 타입스크립트 입력
function fn(this: SomeType, x: number) {
  /* ... */
}
```

```js
// 자바스크립트 출력
function fn(x) {
  /* ... */
}
```

타입스크립트는 `this` 매개변수로 함수 호출이 올바른 컨텍스트에서 수행되는지 확인합니다. 화살표 함수를 사용하는 대신 메서드 정의에 `this` 매개변수를 추가하여 메서드가 올바르게 호출되도록 정적으로 적용할 수 있습니다.

```ts twoslash
// @errors: 2684
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// 문제없습니다.
c.getName();
 
// 오류, 충돌합니다.
const g = c.getName;
console.log(g());
```

이 방법은 화살표 함수 접근법의 반대 절충점을 만듭니다.

- 자바스크립트 호출자는 여전히 자신도 모르게 클래스 메서드를 잘못 사용할 수 있습니다.
- 클래스 인스턴스당 하나가 아니라 클래스 정의당 하나의 함수만 할당됩니다.
- 기본 메서드 정의는 여전히 `super`를 통해 호출할 수 있습니다.