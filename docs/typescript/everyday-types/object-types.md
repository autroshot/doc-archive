---
sidebar_position: 6
---

# 객체 타입

원시값을 제외하면, 여러분이 접하게 될 가장 일반적인 타입은 **객체 타입**입니다. 이것은 프로퍼티가 있는 모든 자바스크립트 값을 나타내는데, 거의 모든 값이 여기에 해당합니다! 객체 타입을 정의하려면 프로퍼티와 타입을 나열하기만 하면 됩니다.

예를 들어 다음은 점과 같은 객체를 받는 함수 입니다.

```ts twoslash
// 매개변수의 타입 주석은 객체 타입입니다.
function printCoord(pt: { x: number; y: number }) {
  //                      ^^^^^^^^^^^^^^^^^^^^^^^^
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

여기서는 `number` 타입인 `x`와 `y`, 두 가지 프로퍼티가 있는 타입으로 매개변수에 주석을 달았습니다. `,` 또는 `;`를 사용하여 프로퍼티를 구분할 수 있으며 마지막 구분 기호는 선택 사항입니다.

각 프로퍼티의 타입 부분도 선택 사항입니다. 타입을 지정하지 않으면 `any`로 간주됩니다.

## 선택적 프로퍼티

객체 타입은 프로퍼티의 일부 또는 전체를 **선택 사항**으로 지정할 수 있습니다. 프로퍼티 이름 뒤에 `?`를 추가하면 됩니다.

```ts twoslash
function printName(obj: { first: string; last?: string }) {
  // ...
}
// 둘 다 가능합니다.
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

자바스크립트에서 존재하지 않는 프로퍼티에 접근하면, 런타임 오류가 발생하는 것이 아니라 `undefined` 값을 얻게 됩니다. 따라서 선택적 프로퍼티에서 **읽기**를 할 때는 `undefined`를 먼저 확인해야 합니다.

```ts twoslash
// @errors: 2532
function printName(obj: { first: string; last?: string }) {
  // 오류 - 'obj.last'가 제공되지 않으면 충돌이 발생할 수 있습니다!
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // 문제없습니다.
    console.log(obj.last.toUpperCase());
  }

  // 다음은 최신 자바스크립트 구문을 사용하는 안전한 대안입니다.
  console.log(obj.last?.toUpperCase());
}
```