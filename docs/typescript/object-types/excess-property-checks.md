---
sidebar_position: 1.5
---

# 초과 프로퍼티 검사

객체에 타입이 할당되는 위치와 방식에 따라 타입 시스템에 차이가 생길 수 있습니다. 이에 대한 하나의 주요한 예는 초과 프로퍼티 검사입니다. 객체가 생성되고 객체 타입에 할당될 때, 객체의 유효성을 보다 철저하게 검사합니다.

```ts twoslash
// @errors: 2345 2739
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

`createSquare`에 지정된 인수의 철자가 `color`가 아니라 `colour`라는 점에 유의하세요. 순수 자바스크립트에서는 이런 코드가 조용히 실패합니다.

`width` 프로퍼티가 호환되고, `color` 프로퍼티가 없으며, 추가적인 `colour` 프로퍼티가 중요하지 않기 때문에, 이 프로그램이 올바르게 타입핑되었다고 주장할 수도 있습니다.

그러나 타입스크립트는 이 코드에 버그가 있을 수 있다는 입장을 취합니다. 객체 리터럴은 특별한 취급을 받으며, 다른 변수에 할당하거나 인수로 전달할 때 **초과 프로퍼티 검사**를 받습니다. **대상 타입**에 없는 프로퍼티가 객체 리터럴에 있으면 다음과 같이 오류가 발생합니다.

```ts twoslash
// @errors: 2345 2739
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// ---cut---
let mySquare = createSquare({ colour: "red", width: 100 });
```

이러한 검사를 우회하는 것은 사실 매우 간단합니다. 가장 쉬운 방법은 타입 단언을 사용하는 것입니다.

```ts twoslash
// @errors: 2345 2739
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// ---cut---
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

그러나 객체에 특별한 방식으로 사용되는 일부 추가 프로퍼티가 있을 수 있다면, 문자열 색인 시그니처를 추가하는 것이 더 나은 방법일 수 있습니다. `SquareConfig`가 앞의 타입의 `color`와 `width` 프로퍼티를 ​​가질 수 있지만, 다른 여러 프로퍼티도 가질 수 있다면, 다음과 같이 정의할 수 있습니다.

```ts twoslash
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

색인 시그니처에 대해서는 잠시 후에 설명할 것입니다. 여기서 `SquareConfig`는 여러 프로퍼티를 가질 수 있으며, `color`나 `width`이 아니라면 그 타입은 중요하지 않습니다.

검사를 우회하는 마지막 방법은 조금 의외일 수 있지만, 객체를 다른 변수에 할당하는 것입니다. `squareOptions`를 할당하면 초과 프로퍼티 검사를 받지 않으므로 컴파일러에서 오류를 표시하지 않습니다.

```ts twoslash
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// ---cut---
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

이 우회법은 `squareOptions`와 `SquareConfig` 사이에 공통 프로퍼티가 있는 한 작동합니다. 예시에서는 `width` 프로퍼티가 이에 해당합니다. 그러나 변수에 공통 객체 프로퍼티가 없으면 다음과 같이 실패합니다.

```ts twoslash
// @errors: 2559
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// ---cut---
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
```

위와 같은 간단한 코드의 경우에는 이러한 검사를 **회피**하려고 하면 안 됩니다. 메서드와 상태를 유지하는 보다 복잡한 객체 리터럴의 경우 이러한 기술을 염두에 두어야 할 수 있지만, 초과 프로퍼티 오류의 대부분은 실제로 버그입니다.

즉, 옵션 가방과 같은 것에서 초과 프로퍼티 검사 문제가 발생하는 경우에는 일부 타입 선언을 수정해야 할 수 있습니다. 이 예시에서 `color` 또는 `colour` 프로퍼티가 모두 있는 객체를 `createSquare`에 전달해도 괜찮다면, 이를 반영하도록 `SquareConfig`의 정의를 수정해야 합니다.

