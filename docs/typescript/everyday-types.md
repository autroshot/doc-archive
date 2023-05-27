---
sidebar_position: 3
---

# 일상적인 타입

이 장에서는 자바스크립트 코드에서 찾을 수 있는 가장 일반적인 값의 타입을 다루고, 해당 타입을 타입스크립트에서 묘사하는 방법을 설명합니다. 이는 전체 목록이 아니며, 이후의 장에서 다른 타입의 이름을 지정하고 사용하는 더 많은 방법을 배울 것입니다.

타입은 타입 주석뿐만 아니라 더 많은 **위치**에 나타날 수 있습니다. 우리는 타입 자체에 대해 배우면서, 이러한 타입을 참조하여 새로운 구성을 만들 수 있는 위치에 대해서도 배울 것입니다.

자바스크립트 또는 타입스크립트 코드를 작성할 때 접할 수 있는 가장 기본적이고 일반적인 타입을 검토하는 것으로 시작하겠습니다. 이들은 나중에 더 복잡한 타입의 기반이 됩니다.

## 원시값: `string`, `number`, `boolean`

자바스크립트에는 매우 일반적으로 사용되는 세 가지 [원시값](https://developer.mozilla.org/ko/docs/Glossary/Primitive)이 있습니다. `string`, `number`, `boolean`입니다. 각각은 타입스크립트에 해당하는 타입이 있습니다. 예상할 수 있듯이, 이러한 타입의 값에 자바스크립트의 `typeof` 연산자를 사용할 때 표시되는 것과 동일한 이름입니다.

- `string`은 `"Hello, world"`와 같은 문자열 값을 나타냅니다.
- `number`는 `42`와 같은 숫자를 의미합니다. 자바스크립트는 정수에 대한 특별한 런타임 값이 없으며 `int`나 `float`에 해당하는 것이 없습니다. 모든 것이 단순히 `number`입니다.
- `boolean`은 두 값, `true`와 `false`를 의미합니다.

:::caution

`String`, `Number`, `Boolean`과 같이 대문자로 시작하는 타입 이름은 유효하지만 특수한 내장 타입을 참조합니다. 이들은 거의 사용하지 않습니다. 항상 타입에 `string`, `number`, `boolean`을 사용하세요.

:::

## 배열

`[1, 2, 3]`과 같은 배열 타입을 지정하려면 `number[]` 구문을 사용할 수 있습니다. 이 구문은 모든 타입에 대해 작동합니다(예: `string[]`은 문자열 배열). `Array<number>`로 작성된 것도 볼 수 있는데, 이는 같은 의미입니다. 제네릭을 다룰 때 `T<U>` 구문에 대해 자세히 알아볼 것입니다.

:::caution

`[number]`는 다른 것입니다. [튜플](./object-types/generics.md#튜플-타입)을 참고하세요.

:::

## `any`

또한 타입스크립트에는 `any`라는 특수 타입이 있습니다. 이는 특정 값 때문에 타입 검사 오류가 발생하는 것을 원하지 않을 때 사용할 수 있습니다.

값이 `any` 타입이면, 값의 모든 프로퍼티(`any` 타입이 됨)에 접근하거나, 함수처럼 호출하거나, 모든 타입의 값에 할당하거나, 모든 타입의 값을 할당하는 등, 문법적으로 합법적인 거의 모든 것이 가능합니다.

```ts
let obj: any = { x: 0 };
// 다음 코드 줄들은 컴파일러 오류를 발생시키지 않습니다.
// any를 사용하면 모든 추가 타입 검사가 비활성화됩니다.
// 그리고 여러분이 타입스크립트보다 환경을 더 잘 알고 있다고 가정합니다.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

`any` 타입은 특정 코드 줄이 괜찮다고 타입스크립트를 설득하기 위해, 긴 타입을 작성하고 싶지 않을 때 유용합니다.

### `noImplicitAny`

타입을 지정하지 않았고 타입스크립트가 컨텍스트에서 추론할 수 없는 경우, 컴파일러는 일반적으로 타입을 `any`로 설정합니다.

그러나 일반적으로 `any`는 타입이 확인되지 않기 때문에 이를 피하는 것이 좋습니다. 컴파일러 플래그 [`noImplicitAny`](https://www.typescriptlang.org/ko/tsconfig#noImplicitAny)를 사용하면 암시적 `any`가 오류로 표시됩니다.

## 변수에 대한 타입 주석

`const`, `var`, `let`을 사용하여 변수를 선언할 때, 선택적으로 타입 주석을 추가하여 변수 타입을 명시적으로 지정할 수 있습니다.

```ts
let myName: string = "Alice";
```

:::caution

타입스크립트는 `int x = 0;`과 같이 타입을 왼쪽에서 선언하지 않습니다. 타입 주석은 항상 대상의 **뒤**에 붙습니다.

:::

그러나 대부분의 경우 이것은 필요하지 않습니다. 타입스크립트는 가능하다면 코드의 타입을 자동으로 **추론**하려고 합니다. 예를 들어 변수의 타입은 초기화자(initializer)의 타입을 기반으로 추론됩니다.

```ts
// 타입 주석이 필요하지 않습니다. myName은 string 타입으로 추론됩니다.
let myName = "Alice";
```

보통은 추론 규칙을 명시적으로 배울 필요는 없습니다. 처음 시작하는 경우라면 타입 주석을 생각보다 적게 사용해 보세요. 타입스크립트가 상황을 완전히 이해하는 데 얼마나 적은 타입 주석이 필요한지 알면 놀랄 것입니다.

## 함수

함수는 자바스크립트에서 데이터를 전달하는 주요 수단입니다. 타입스크립트를 사용하면 함수의 입력과 출력 값의 타입을 모두 지정할 수 있습니다.

### 매개변수 타입 주석

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

### 반환 타입 주석

반환 타입 주석을 추가할 수도 있습니다. 반환 타입 주석은 매개변수 목록 뒤에 나타납니다.

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

변수 타입 주석과 마찬가지로, 타입스크립트는 `return` 문을 기반으로 함수의 반환 타입을 추론합니다. 따라서 반환 타입 주석은 일반적으로 필요하지 않습니다. 위 예시의 타입 주석은 변경하는 것이 아무것도 없습니다. 일부 코드베이스에서는 문서화 목적, 우발적인 변경 방지, 개인 취향에 따라 반환 타입을 명시적으로 지정합니다.

### 익명 함수

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

## 객체 타입

원시값을 제외하면, 여러분이 접하게 될 가장 일반적인 타입은 **객체 타입**입니다. 이것은 프로퍼티가 있는 모든 자바스크립트 값을 나타내는데, 거의 모든 값이 여기에 해당합니다! 객체 타입을 정의하려면 프로퍼티와 타입을 나열하기만 하면 됩니다.

예를 들어 다음은 점과 같은 객체를 받는 함수 입니다.

```ts
// 매개변수의 타입 주석은 객체 타입입니다.
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

여기서는 `number` 타입인 `x`와 `y`, 두 가지 프로퍼티가 있는 타입으로 매개변수에 주석을 달았습니다. `,` 또는 `;`를 사용하여 프로퍼티를 구분할 수 있으며 마지막 구분 기호는 선택 사항입니다.

각 프로퍼티의 타입 부분도 선택 사항입니다. 타입을 지정하지 않으면 `any`로 간주됩니다.

### 선택적 프로퍼티

객체 타입은 프로퍼티의 일부 또는 전체를 **선택 사항**으로 지정할 수 있습니다. 프로퍼티 이름 뒤에 `?`를 추가하면 됩니다.

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// 둘 다 가능합니다.
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

자바스크립트에서 존재하지 않는 프로퍼티에 접근하면, 런타임 오류가 발생하는 것이 아니라 `undefined` 값을 얻게 됩니다. 따라서 선택적 프로퍼티에서 **읽기**를 할 때는 `undefined`를 먼저 확인해야 합니다.

```ts
function printName(obj: { first: string; last?: string }) {
  // 오류 - 'obj.last'가 제공되지 않으면 충돌이 발생할 수 있습니다!
  // 오류: 'obj.last' is possibly 'undefined'.
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // 문제없습니다.
    console.log(obj.last.toUpperCase());
  }

  // 다음은 최신 자바스크립트 구문을 사용하는 안전한 대안입니다.
  console.log(obj.last?.toUpperCase());
}
```

## 합집합 타입

타입스크립트의 타입 시스템에서는 다양한 연산자를 사용하여 기존 타입에서 새로운 타입을 만들 수 있습니다. 이제 몇 가지 타입을 작성하는 방법을 알았으므로 타입을 흥미로운 방식으로 **결합**할 차례입니다.

### 합집합 타입 정의하기

타입을 결합하는 첫 번째 방법은 **합집합** 타입입니다. 합집합 타입은 두 개 이상의 다른 타입으로 구성된 타입으로, 해당 타입 중 **하나**가 될 수 있는 값을 나타냅니다. 여기서 각 타입을 조합의 **멤버**라고 부릅니다.

문자열이나 숫자를 받을 수 있는 함수를 작성해 보겠습니다.

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// 문제없습니다.
printId(101);
// 문제없습니다.
printId("202");
// 오류: Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
printId({ myID: 22342 });
```

### 합집합 타입으로 작업하기

합집합 타입과 일치하는 값을 **제공**하는 것은 쉽습니다. 합집합의 멤버와 일치하는 타입을 제공하기만 하면 됩니다. 합집합 타입의 값이 생겼다면 사용을 어떻게 할까요?

타입스크립트는 합집합의 **모든** 멤버에 대해 유효한 경우에만 연산을 허용합니다. 예를 들어 합집합 `string | number`인 경우, `string`에서만 사용할 수 있는 메서드는 사용할 수 없습니다.

```ts
function printId(id: number | string) {
  // 오류: Property 'toUpperCase' does not exist on type 'string | number'.
  //   Property 'toUpperCase' does not exist on type 'number'.
  console.log(id.toUpperCase());
}
```

해결책은 타입 주석이 없는 자바스크립트에서 사용하는 방법과 동일하게, 코드로 합집합을 **좁히는** 것입니다. **좁히기(narrowing)**는 타입스크립트가 코드 구조를 기반으로 값에 대해 보다 구체적인 타입을 추론할 수 있을 때 발생합니다.

예를 들어 타입스크립트는 `typeof` 값으로 `"string"`을 갖는 것은 `string`뿐이라는 것을 알고 있습니다.

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서 id는 string 타입입니다.
    console.log(id.toUpperCase());
  } else {
    // 여기서 id는 number 타입입니다.
    console.log(id);
  }
}
```

또 다른 예는 `Array.isArray`와 같은 함수를 사용하는 것입니다.

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기서 x는 'string[]'입니다.
    console.log("Hello, " + x.join(" and "));
  } else {
    // 여기서 x는 string입니다.
    console.log("Welcome lone traveler " + x);
  }
}
```

`else` 분기에서는 특별한 작업을 수행할 필요가 없습니다. `x`가 `string[]`이 아니면 `string`이기 때문입니다.

때로는 모든 멤버가 공통 요소를 가진 합집합이 있을 수 있습니다. 예를 들어 배열과 문자열에는 모두 `slice` 메서드가 있습니다. 합집합의 모든 멤버가 공통 프로퍼티를 가지고 있는 경우, 좁히기를 사용하지 않고 해당 프로퍼티를 사용할 수 있습니다.

```ts
// 반환 타입은 'number[] | string'으로 추론됩니다.
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

:::note 참고

타입의 **합집합**이 해당 타입 프로퍼티의 **교집합**을 갖는 것이 혼란스러울 수 있습니다. 이는 우연이 아닙니다. 합집합(union)이라는 이름은 유형 이론(type theory)에서 유래했습니다. 합집합 `number | string`은 각 타입에서 **값**의 합집합을 취하여 구성됩니다. 각 집합에 해당하는 사실이 있는 두 집합이 주어지면, 해당 사실의 교집합만 집합 자체의 합집합에 적용됩니다.

예를 들어, 모자를 쓴 키 큰 사람들의 방과 모자를 쓴 스페인어 사용자들의 방이 있다고 가정해 보겠습니다. 이 방들을 합친 후 **모든** 사람에 대해 알 수 있는 유일한 정보는 그들이 모자를 쓰고 있다는 것입니다.

:::

## 타입 별칭

우리는 객체 타입과 합집합 타입을 타입 주석에 직접 작성하여 사용해 왔습니다. 이 방법도 편리하지만, 동일한 타입을 두 번 이상 사용할 때는 하나의 이름으로 참조하는 것이 일반적입니다.

**타입 별칭**은 정확히 그 역할을 수행합니다. 즉, 타입 별칭은 **타입의 이름**입니다. 타입 별칭의 구문은 다음과 같습니다.

```ts
type Point = {
  x: number;
  y: number;
};

// 이전 예시와 완전히 동일합니다.
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

사실 타입 별칭을 사용하면 객체 타입뿐만 아니라 모든 타입의 이름을 지정할 수 있습니다. 예를 들어 타입 별칭은 합집합 타입의 이름을 지정할 수 있습니다.

```ts
type ID = number | string;
```

별칭은 별칭일 뿐입니다. 타입 별칭을 사용하여 동일한 타입의 서로 다른(고유한) **버전**을 만들 수는 없습니다. 별칭을 사용한다는 것은 타입의 별칭을 작성하는 것입니다. 다음 코드는 잘못된 것처럼 보일 수 있지만, 타입스크립트에 따르면 두 타입은 동일한 타입의 별칭이기 때문에 문제가 없습니다.

```ts
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// 살균된 입력을 생성합니다.
let userInput = sanitizeInput(getInput());

// 여전히 문자열을 사용하여 재할당할 수 있습니다.
userInput = "new input";
```

## 인터페이스

**인터페이스 선언**은 객체 타입의 이름을 지정하는 또 다른 방법입니다.

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

앞에서 타입 별칭을 사용했을 때와 마찬가지로, 이 예시는 익명 객체 타입을 사용한 것처럼 작동합니다. 타입스크립트는 `printCoord`에 전달한 값의 **구조**에만 관심이 있습니다. 예상되는 프로퍼티의 존재 여부에만 관심이 있습니다.

타입의 구조와 기능에만 관심을 가지기 때문에, 우리는 타입스크립트를 **구조적으로 타입이 지정된** 타입 시스템이라고 부릅니다.

### 타입 별칭과 인터페이스의 차이점

타입 별칭과 인터페이스는 매우 유사하며, 대부분의 경우 자유롭게 선택할 수 있습니다. `interface`의 거의 모든 기능은 `type`에서도 제공됩니다. 주요 차이점은 인터페이스는 항상 확장 가능한 반면, 타입은 새 프로퍼티를 추가하기 위해 다시 열 수 없다는 점입니다.

#### 인터페이스

인터페이스 확장하기

```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

기존 인터페이스에 새 필드 추가하기

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

#### 타입

교집합을 통해 타입 확장하기

```ts
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

생성된 후에는 타입을 변경할 수 없습니다.

```ts
type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

// 오류: Duplicate identifier 'Window'.
```

이후의 장에서 이 개념에 대해 자세히 배우므로, 모든 내용을 바로 이해하지 못하더라도 걱정하지 마세요.

- 타입스크립트 버전 4.2 이전에서는 타입 별칭 이름이 동등한 익명 타입 대신 [오류 메시지에 나타날 수 있습니다](https://www.typescriptlang.org/ko/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWZWhfYAjABMAMwALA+gbsVjoADqgjKESytQPxCHghAByXigYgBfr8LAsYj8aQMUASbDQcRSExCeCwFiIQh+AKfAYyBiQFgOPyIaikSGLQo0Zj-aazaY+dSaXjLDgAGXgAC9CKhDqAALxJaw2Ib2RzOISuDycLw+ImBYKQflCkWRRD2LXCw6JCxS1JCdJZHJ5RAFIbFJU8ADKC3WzEcnVZaGYE1ABpFnFOmsFhsil2uoHuzwArO9SmAAEIsSFrZB-GgAjjA5gtVN8VCEc1o1C4Q4AGlR2AwO1EsBQoAAbvB-gJ4HhPgB5aDwem-Ph1TCV3AEEirTp4ELtRbTPD4vwKjOfAuioSQHuDXBcnmgACC+eCONFEs73YAPGGZVT5cRyyhiHh7AAON7lsG3vBggB8XGV3l8-nVISOgghxoLq9i7io-AHsayRWGaFrlFauq2rg9qaIGQHwCBqChtKdgRo8TxRjeyB3o+7xAA). 이는 바람직할 수도 있고 바람직하지 않을 수도 있습니다. 인터페이스는 항상 오류 메시지에 이름이 지정됩니다.
- 타입 별칭은 [선언 병합에 참여할 수 없지만 인터페이스는 참여할 수 있습니다](https://www.typescriptlang.org/ko/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).
- 인터페이스는 [객체의 모양을 선언하는 데만 사용할 수 있으며, 원시값의 이름을 바꾸는 데는 사용할 수 없습니다](https://www.typescriptlang.org/ko/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).
- 인터페이스 이름은 오류 메시지에 [**항상** 원래 형태로](https://www.typescriptlang.org/ko/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWY2Q-YAjABMAMwALA+gbsVjNXW8yxySoAADaAA0CCaZbPh1XYqXgOIY0ZgmcK0AA0nyaLFhhGY8F4AHJmEJILCWsgZId4NNfIgGFdcIcUTVfgBlZTOWC8T7kAJ42G4eT+GS42QyRaYbCgXAEEguTzeXyCjDBSAAQSE8Ai0Xsl0K9kcziExDeiQs1lAqSE6SyOTy0AKQ2KHk4p1V6s1OuuoHuzwArMagA) 나타나지만 이름으로 사용될 때만 나타납니다.

대부분의 경우 개인 취향에 따라 선택할 수 있으며, 다른 종류의 선언이 필요한 경우 타입스크립트에서 알려줍니다. 경험적 접근(휴리스틱)을 원한다면, `type`의 기능이 필요하기 전까지는 `interface`를 사용하세요.

## 타입 단언

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

## 리터럴 타입

일반적인 타입인 `string`과 `number` 외에도 타입 위치에서 **특정한** 문자열과 숫자를 참조할 수 있습니다.

이에 대해 생각하는 한 가지 방법은 자바스크립트에서 변수를 선언하는 다양한 방법을 고려하는 것입니다. `var`와 `let` 모두 변수 내부의 내용을 변경할 수 있지만, `const`는 변경할 수 없습니다. 이는 타입스크립트가 리터럴를 위한 타입을 생성하는 방식에 반영됩니다.

```ts
let changingString = "Hello World";
changingString = "Olá Mundo";
// changingString은 가능한 모든 문자열을 나타낼 수 있습니다.
// 따라서 타입스크립트는 타입 시스템에서 문자열을 묘사합니다.
// let changingString: string
changingString;

const constantString = "Hello World";
// constantString은 가능한 문자열이 하나입니다.
// 따라서 리터럴 타입을 표현합니다.
// const constantString: "Hello World"
constantString;
```

리터럴 타입 자체는 그다지 가치가 없습니다.

```ts
let x: "hello" = "hello";
// 문제없습니다.
x = "hello";
// ...

// 오류: Type '"howdy"' is not assignable to type '"hello"'.
x = "howdy";
```

하나의 값만 가질 수 있는 변수는 별로 쓸모가 없습니다!

그러나 리터럴을 합집합으로 **결합**하면 훨씬 더 유용한 개념을 표현할 수 있습니다. 예를 들어 특정 값의 집합만 허용하는 함수를 표현할 수 있습니다.

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// 오류: Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
printText("G'day, mate", "centre");
```

숫자 리터럴 타입도 동일한 방식으로 작동합니다.

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

물론 리터럴을 리터럴이 아닌 타입과 결합할 수도 있습니다.

```ts
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// 오류: Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
configure("automatic");
```

불린 리터럴이라는 리터럴 타입이 하나 더 있습니다. 불린 리터럴 타입은 두 가지뿐이며, 짐작할 수 있듯이 `true`와 `false` 타입입니다. `boolean` 타입 자체는 실제로 `true | false` 합집합의 별칭일 뿐입니다.

### 리터럴 추론

변수를 객체로 초기화하면, 타입스크립트는 해당 객체의 프로퍼티가 나중에 값이 변경될 수 있다고 가정합니다. 예를 들어 다음 코드를 작성했다고 가정해 보겠습니다.

```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

타입스크립트는 이전에 `0`이 있었던 필드에 `1`을 할당하는 것이 오류라고 가정하지 않습니다. 다시 말하면 `obj.counter`는 `0`이 아닌 `number` 타입을 가져야 한다는 것입니다. 이는 타입이 **읽기**와 **쓰기** 행동을 모두 결정하는 데 사용되기 때문입니다.

문자열에도 동일하게 적용됩니다.

```ts
const req = { url: "https://example.com", method: "GET" };
// 오류: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
handleRequest(req.url, req.method);
```

위의 예시에서 `req.method`는 `"GET"`이 아니라 `string`으로 추론됩니다. 코드가 `req` 생성과 `req.method` 호출 사이에서 평가될 수 있으므로, `"GUESS"`와 같은 새 문자열을 `req.method`에 할당할 수 있습니다. 따라서 타입스크립트는 이 코드를 오류가 있는 것으로 간주합니다.

이 문제를 해결하는 방법에는 두 가지가 있습니다.

1. 두 위치 중 하나에 타입 단언을 추가하여 추론을 변경할 수 있습니다.

   ```ts
   // 변경 1
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // 변경 2
   handleRequest(req.url, req.method as "GET");
   ```

   변경 1은 `req.method`가 항상 **리터럴 타입** `"GET"`을 가지도록 합니다. 이후에 해당 필드에 `"GUESS"`가 할당될 가능성을 방지합니다. 변경 2는 다른 이유로 `req.method`가 `"GET"` 값을 갖고 있다는 것을 의미합니다.

2. `as const`를 사용하여 전체 객체를 타입 리터럴로 변환할 수 있습니다.

   ```ts
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

`as const` 접미사는 `const`처럼 작동합니다. 타입 시스템에서는 모든 프로퍼티에 `string`이나 `number`와 같은 일반적인 버전 대신 리터럴 타입이 할당되도록 합니다.

## `null`과 `undefined`

자바스크립트에는 값이 없거나 초기화되지 않은 값을 나타내는 데 사용되는 두 가지 원시값이 있습니다. `null`과 `undefined`입니다.

타입스크립트에는 여기에 대응되며 동일한 이름을 가지는 두 가지 **타입**이 있습니다. 이러한 타입의 작동 방식은 [`strictNullChecks`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#strictNullChecks) 옵션의 설정 여부에 따라 달라집니다.

### `strictNullChecks` 꺼짐

[`strictNullChecks`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#strictNullChecks)가 **꺼져** 있으면, `null`이나 `undefined` 값에 정상적으로 접근할 수 있으며, `null`과 `undefined` 값을 모든 타입의 프로퍼티에 할당할 수 있습니다. 이는 널 검사가 없는 언어(예: C#, Java)의 동작 방식과 유사합니다. 이러한 값을 확인하지 않는 것은 버그의 주요 원인이 되는 경향이 있습니다. 코드베이스에서 가능하다면 [`strictNullChecks`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#strictNullChecks)를 켜는 것이 좋습니다.

### `strictNullChecks` 켜짐

[`strictNullChecks`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#strictNullChecks)가 **켜져** 있으면, 값이 `null`이나 `undefined`인 경우 해당 값에 메서드 또는 프로퍼티를 사용하기 전에 해당 값을 테스트해야 합니다. 선택적 프로퍼티를 사용하기 전에 `undefined`를 확인하는 것처럼, **좁히기**를 사용하여 `null`일 수 있는 값을 확인할 수 있습니다.

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // 아무것도 하지 않습니다.
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### 널이 아닌 단언 연산자 (접미사 `!`)

타입스크립트에는 명시적 검사를 수행하지 않고 타입에서 `null`과 `undefined`를 제거하기 위한 특별한 구문도 있습니다. 표현식 뒤에 `!`를 쓰는 것은, 사실상 값이 `null`이나 `undefined`가 아니라는 타입 단언입니다.

```ts
function liveDangerously(x?: number | null) {
  // 오류가 발생하지 않습니다.
  console.log(x!.toFixed());
}
```

다른 타입 단언과 마찬가지로, `!`는 코드의 런타임 동작을 변경하지 않습니다. 따라서 값이 `null`이나 `undefined`가 될 수 없다는 것을 알고 있는 경우에만 `!`을 사용하는 것이 중요합니다.

## 열거형

열거형은 타입스크립트에 의해 자바스크립트에 추가된 기능으로, 이름이 있고 가능한 상수 집합 중 하나가 될 수 있는 값을 묘사할 수 있다. 대부분의 타입스크립트 기능과 달리, 이것은 자바스크립트에 대한 타입 수준의 추가가 아니라 언어와 런타임 수준의 추가입니다. 따라서 이 기능이 존재한다는 것은 알 필요가 있지만, 확신이 서지 않으면 사용을 보류할 수 있습니다. [열거형 페이지](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/enums.html)에서 열거형에 대한 자세한 내용을 읽을 수 있습니다.

## 덜 일반적인 원시값

타입 시스템에서 표현되는 자바스크립트의 나머지 원시값을 언급할 필요가 있습니다. 하지만 자세히 다루지는 않겠습니다.

#### `bigint`

ES2020부터는 자바스크립트에서 매우 큰 정수에 사용되는 원시값, `BigInt`가 있습니다.

```ts
// BigInt 함수로 bigint를 생성합니다.
const oneHundred: bigint = BigInt(100);

// 리터럴 구문으로 BigInt를 생성합니다.
const anotherHundred: bigint = 100n;
```

`BigInt`에 대한 자세한 내용은 [타입스크립트 3.2 릴리스 노트](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/release-notes/typescript-3-2.html#bigint)에서 확인할 수 있습니다.

#### `symbol`

자바스크립트에는 `Symbol()` 함수를 통해 전역적으로 고유한 참조를 만드는 데 사용되는 원시값이 있습니다.

```ts
const firstName = Symbol("name");
const secondName = Symbol("name");

// 오류: This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
if (firstName === secondName) {
  // 절대로 실행되지 않습니다.
}
```

[심볼 페이지](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/symbols.html)에서 자세한 내용을 확인할 수 있습니다.