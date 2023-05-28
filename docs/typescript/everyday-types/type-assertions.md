---
sidebar_position: 9
---

# 타입 단언

경우에 따라 타입스크립트가 알 수 없는 값의 타입에 대한 정보가 여러분에게 있을 수 있습니다.

예를 들어 `document.getElementById`를 사용하는 경우, 타입스크립트는 어떤 종류의 `HTMLElement`가 반환된다는 것만 알지만, 여러분은 페이지에서 항상 주어진 ID에 대해 `HTMLCanvasElement`가 반환된다는 것을 알 수 있습니다.

이 상황에서 **타입 단언**을 사용하여 보다 구체적인 타입을 지정할 수 있습니다.

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

타입 주석과 마찬가지로 타입 단언은 컴파일러에 의해 제거되며 코드의 런타임 동작에 영향을 주지 않습니다.

다음과 같이 꺾쇠 괄호(`<>`) 구문을 사용할 수도 있습니다. 코드가 `.tsx` 파일에 있는 경우에는 불가능합니다.

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

:::note 참고

타입 단언은 컴파일 타임에 제거되므로 타입 단언과 관련된 런타임 검사는 없습니다. 타입 단언이 잘못된 경우, 예외가 발생하거나 `null`이 생성되지 않습니다.

:::

타입스크립트는 타입의 **더 구체적인** 또는 **덜 구체적인** 버전으로 변환하는 타입 단언만 허용합니다. 이 규칙은 다음과 같은 **불가능한** 강제를 방지합니다.

```ts
// 오류: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const x = "hello" as number;
```

때때로 이 규칙은 너무 보수적일 수 있으며 유효할 수 있는 더 복잡한 강제를 허용하지 않습니다. 이 경우에는 먼저 `any`(또는 나중에 소개할 `unknown`)로 단언한 다음, 원하는 타입으로 단언할 수 있습니다.

```ts
const a = (expr as any) as T;
```