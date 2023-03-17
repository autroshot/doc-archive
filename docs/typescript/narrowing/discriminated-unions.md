---
sidebar_position: 3
---

# 구별되는 합집합

지금까지 살펴본 대부분의 예시는 `string`, `boolean`, `number` 같은 간단한 타입으로 단일 변수를 좁히는 데 중점을 두었습니다. 하지만 자바스크립트에서 복잡한 구조를 다루는 경우에는 이것으로 충분하지 않습니다.

예를 들어 원과 사각형 같은 모양을 인코딩한다고 가정해 보겠습니다. 원은 반지름을 추적하고 사각형은 측면 길이를 추적합니다. 어떤 모양을 다루고 있는지 알려주기 위해 `kind`라는 필드를 사용하겠습니다.

다음은 `Shape`을 정의하는 첫 번째 시도입니다.

```ts
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
```

문자열 리터럴 타입 `"circle"`과 `"square"`의 합집합을 사용해 모양을 원형으로 처리해야 하는지, 사각형으로 처리해야 하는지 알려줍니다. `string` 대신 `"circle" | "square"`를 사용해 철자 오류 문제를 방지할 수 있습니다.

```ts
function handleShape(shape: Shape) {
  // 철자가 틀렸습니다.
  // 오류: This condition will always return 'false' since the types '"circle" | "square"' and '"rect"' have no overlap.
  if (shape.kind === "rect") {
    // ...
  }
}
```

원인지 사각형인지에 따라 올바른 논리를 적용하는 `getArea` 함수를 작성할 수 있습니다.

먼저 원을 처리해 보겠습니다.

```ts
function getArea(shape: Shape) {
  // 오류: Object is possibly 'undefined'.
  return Math.PI * shape.radius ** 2;
}
```

[`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks)가 설정되어 있으면 오류가 발생합니다. `radius`가 정의되지 않았을 수 있기 때문입니다.

그렇다면 `kind` 프로퍼티에 적절한 검사를 수행하면 어떨까요?

```ts
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    // 오류: Object is possibly 'undefined'.
    return Math.PI * shape.radius ** 2;
  }
}
```

타입스크립트는 여전히 여기서 무엇을 해야 하는지 모릅니다. 우리가 타입 검사기보다 값에 대해 더 많이 아는 지점에 도달했습니다.

`null`이 아니라는 단언(`shape.radius` 뒤에 `!`)을 이용해 `radius`가 분명 존재한다고 알려주는 건 어떨까요?

```ts
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}
```

그러나 이상적인 방법은 아닙니다. 타입 검사기에게 `shape.radius`가 정의되어 있다고 `null`이 아니라는 단언(`!`)으로 말했습니다. 하지만 이러한 단언은 코드를 옮기면 오류가 발생하기 쉽습니다. 게다가 [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks)가 설정되어 있지 않다면 실수로 해당 필드에 접근할 수 있습니다. 선택적 프로퍼티는 읽을 때 항상 존재한다고 가정하기 때문입니다. 분명 더 좋은 방법이 있을 것입니다.

`Shape` 인코딩의 문제는 타입 검사기가 `kind` 프로퍼티로 `radius`나 `sideLength`의 존재 여부를 알 수 없다는 점입니다. 우리가 아는 것을 타입 검사기에게 전달해야 합니다.

이를 염두에 두고 `Shape`를 다시 정의해 보겠습니다.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

여기서는 `kind` 프로퍼티에 다른 값을 할당해서 `Shape`를 두 타입으로 적절히 구분했습니다. 그리고 `radius`와 `sideLength`는 각 타입에서 필수 프로퍼티로 선언했습니다.

`Shape`의 `radius`에 접근을 시도하면 어떤 일이 생기는지 보겠습니다.

```ts
function getArea(shape: Shape) {
  // 오류: Property 'radius' does not exist on type 'Shape'.
  return Math.PI * shape.radius ** 2;
}
```

첫 번째 `Shape` 정의와 동일하게 오류가 발생합니다. `radius`가 선택적일 때 (그리고 [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks)가 설정되었을 때) 오류가 발생했습니다. 타입스크립트가 해당 프로퍼티의 존재 여부를 알 수 없기 때문입니다. 이제 `Shape`가 합집합이므로 타입스크립트는 `shape`가 `Square`일 수 있으며 `Square`는 `radius`을 가지고 있지 않다고 알려줍니다. 두 해석 모두 맞습니다. 하지만 `Shape`의 합집합 인코딩은 [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) 설정과 관계없이 오류를 일으킬 것입니다.

만약 `kind` 프로퍼티를 다시 확인하면 어떨까요?

```ts
function getArea(shape: Shape) {
  // (parameter) shape: Circle
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
```

오류가 사라졌습니다. 합집합의 모든 타입에 리터럴 타입의 공통 프로퍼티가 존재한다면, 타입스크립트는 이를 **구별되는 합집합**으로 간주하고 합집합의 범위를 좁힐 수 있습니다.

예시에서는 `kind`가 공통 프로퍼티입니다. `kind`는 `Shape`의 **구별되는** 프로퍼티입니다.

`kind` 프로퍼티가 `"circle"`인지 확인하는 것은 `Shape`에서 `kind` 프로퍼티가 `"circle"`이 아닌 모든 타입을 제거합니다. `shape`를 `Circle` 타입으로 좁힙니다.

`switch`문에서도 동일한 검사가 작동합니다. 이제 `null`이 아니라는 단언(`!`) 같은 성가신 코드 없이 완전한 `getArea`을 작성할 수 있습니다.

```ts
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      // (parameter) shape: Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      // (parameter) shape: Square
      return shape.sideLength ** 2;
  }
}
```

여기서 중요한 것은 `Shape` 인코딩입니다. `Circle`과 `Square`는 특정 `kind` 필드가 있는 별개의 타입이라는 올바른 정보를 타입스크립트에게 전달한 것이 결정적이었습니다. 일반 자바스크립트와 다르지 않으며 타입이 안전한 타입스크립트 코드를 작성할 수 있었습니다. 타입 시스템이 일을 올바르게 수행하고 `switch`문의 각 분기에서 타입을 파악할 수 있게 됩니다.

:::note 참고

위 예시에서 반환 키워드의 일부를 제거하면 오류가 발생할 것입니다. 타입 검사를 통해 `switch`문의 다른 절에 실수로 빠졌을 때 생기는 버그를 방지할 수 있습니다.

:::

구별되는 합집합은 원과 사각형 예시에서 설명한 것 이상으로 유용합니다. 구별되는 합집합은 자바스크립트에서 모든 종류의 메시징 체계를 표현하는 데 좋습니다. 네트워크를 통해 메시지를 보낼 때(클라이언트/서버 통신), 상태 관리 프레임워크에서 변형을 인코딩할 때 구별되는 합집합을 활용할 수 있습니다.