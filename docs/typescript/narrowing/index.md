# 좁히기

`padLeft`라는 함수가 있다고 가정해 보겠습니다.

```ts twoslash
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}
```

`padding`이 `number`이면 `padding`은 `input` 앞에 추가하려는 공백의 수입니다. `padding`이 `string`이면 `padding`은 단순히 `input` 앞에 붙습니다.

`padding`에 `number`를 건네줄 때의 논리를 구현해 보겠습니다.

```ts twoslash
// @errors: 2345
function padLeft(padding: number | string, input: string) {
  return " ".repeat(padding) + input;
}
```

`padding`에 오류가 발생합니다. 타입스크립트는 `number`에 `number | string`을 할당하는 것을 경고합니다. `padding`이 `number`인지 명시적으로 확인하거나, `padding`이 `string`인 경우를 처리해야 합니다.

이제 해당 부분을 구현해 보겠습니다.

```ts twoslash
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

이 코드가 특별할 게 없는 자바스크립트 코드처럼 보인다는 점을 주목해야 합니다. 타입스크립트의 타입 시스템은 타입 안정성을 위해 큰 변화가 필요하지 않습니다. 일반적인 자바스크립트 코드처럼 쉽게 작성하는 것을 목표로 합니다.

일반적인 자바스크립트처럼 보이지만 코드 뒤에서는 많은 일이 벌어지고 있습니다. 타입스크립트는 `if/else`, 조건부 삼항, 반복문, 참 같은 값 확인 같이 타입에 영향을 주는 자바스크립트 런타입 제어 흐름 구조에서 타입 분석을 덮어씌웁니다. 이는 타입스크립트가 정적 타입을 사용하여 런타임 값을 분석하는 것과 유사합니다.

타입스크립트는 `if`문에서 `typeof padding === "number"`를 **타입 가드(type guard)**라는 특별한 코드로 이해합니다. 해당 위치에서 가능한 구체적인 타입을 얻을 수 있는 실행 경로를 찾습니다. 이러한 특별 검사(타입 가드), 할당, 그리고 타입을 선언된 것보다 구체적인 타입으로 정제하는 과정을 **좁히기(narrowing)**라고 부릅니다. 많은 편집기에서 타입이 변경되는 과정을 관찰할 수 있습니다.

```ts twoslash
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
    //                ^?
  }
  return padding + input;
  //     ^?
}
```

타입스크립트가 좁히기로 이해하는 몇 가지 구조를 앞으로 알아보겠습니다.
