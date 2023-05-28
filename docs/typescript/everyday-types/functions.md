---
sidebar_position: 5
---

# 함수

함수는 자바스크립트에서 데이터를 전달하는 주요 수단입니다. 타입스크립트를 사용하면 함수의 입력과 출력 값의 타입을 모두 지정할 수 있습니다.

## 매개변수 타입 주석

함수를 선언할 때 각 매개변수 뒤에 타입 주석을 추가하여 함수가 허용하는 매개변수 타입을 선언할 수 있습니다. 매개변수 타입 주석은 매개변수 이름 다음에 옵니다.

```ts
// 매개변수 타입 주석
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

매개변수에 타입 주석이 있다면, 해당 함수에 대한 인수가 검사됩니다.

```ts
// 실행하면 런타임 오류가 발생합니다!
// 오류: Argument of type 'number' is not assignable to parameter of type 'string'.
greet(42);
```

:::note 참고

매개변수에 타입 주석이 없더라도, 타입스크립트는 여전히 올바른 수의 인수를 전달했는지 확인합니다.

:::

## 반환 타입 주석

반환 타입 주석을 추가할 수도 있습니다. 반환 타입 주석은 매개변수 목록 뒤에 나타납니다.

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

변수 타입 주석과 마찬가지로, 타입스크립트는 `return` 문을 기반으로 함수의 반환 타입을 추론합니다. 따라서 반환 타입 주석은 일반적으로 필요하지 않습니다. 위 예시의 타입 주석은 변경하는 것이 아무것도 없습니다. 일부 코드베이스에서는 문서화 목적, 우발적인 변경 방지, 개인 취향에 따라 반환 타입을 명시적으로 지정합니다.

## 익명 함수

익명 함수는 함수 선언과 조금 다릅니다. 타입스크립트가 호출 방법을 결정할 수 있는 위치에 함수가 나타나면, 해당 함수의 매개변수에 자동으로 타입이 지정됩니다.

예를 들면 다음과 같습니다.

```ts
// 여기에는 타입 주석이 없지만 타입스크립트는 버그를 발견할 수 있습니다.
const names = ["Alice", "Bob", "Eve"];

// 함수에 대한 컨텍스트 타이핑
names.forEach(function (s) {
  // 오류: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
  console.log(s.toUppercase());
});

// 컨텍스트 타이핑은 화살표 함수에도 적용됩니다.
names.forEach((s) => {
  // 오류: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
  console.log(s.toUppercase());
});
```

매개변수 `s`에 타입 주석이 없었지만, 타입스크립트는 배열의 추론된 타입과 `forEach` 함수의 타입을 사용하여 `s`가 가질 타입을 결정합니다.

이 과정을 **컨텍스트 타이핑(contextual typing)**이라고 하는데, 함수의 컨텍스트가 어떤 타입을 가져야 하는지를 알려주기 때문입니다.

추론 규칙과 마찬가지로 이것이 어떻게 발생하는지 명시적으로 배울 필요는 없습니다. 하지만 컨텍스트 타이핑이 발생한다는 것을 이해하면, 타입 주석이 필요하지 않은 때를 알아차리는 데 도움이 될 수 있습니다. 나중에 값이 만드는 컨텍스트가 해당 타입에 어떤 영향을 미치는지에 대한 더 많은 예를 살펴보겠습니다.