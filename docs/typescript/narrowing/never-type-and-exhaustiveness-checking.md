---
sidebar_position: 4
---

# `never` 타입과 철저한 검사

좁히기를 할 때 모든 가능성을 제거하고 남는 것이 없도록 합집합의 옵션을 줄일 수 있습니다. 타입스크립트는 `never` 타입을 이용하여 존재해서는 안 되는 상태를 표현합니다.

## 철저한 검사

`never` 타입은 모든 타입에 할당 가능합니다. 그러나 `never`에 할당 가능한 타입은 없습니다(`never` 자신 제외). 좁히기와 `never`를 활용해 `switch`문에서 **철저한 검사(exhaustive checking)**를 수행할 수 있습니다.

예를 들어 `getArea` 함수의 `default`에서 `never`에 `shape`를 할당하는 코드(오류가 발생함)를 작성할 수 있습니다. 해당 코드는 모든 가능한 케이스가 처리되지 않았을 때 실행됩니다.

```ts twoslash
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}
// ---cut---
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

다음과 같이 새 요소를 `Shape` 합집합에 추가하면 타입스크립트 오류가 발생합니다.

```ts twoslash
// @errors: 2322
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}
// ---cut---
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```