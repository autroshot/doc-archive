---
sidebar_position: 4
---

# 함수

함수는 지역 함수든, 다른 모듈에서 가져온 함수든, 클래스의 메서드든 모든 애플리케이션의 기본 구성 요소입니다. 함수는 값이기도 합니다. 다른 값과 마찬가지로 타입스크립트에는 함수를 호출하는 방법을 묘사하는 여러 가지 방법이 있습니다.

함수를 묘사하는 타입을 작성하는 방법에 대해 알아보겠습니다.

## 함수 타입 표현식

함수를 묘사하는 가장 간단한 방법은 **함수 타입 표현식**입니다. 이 타입은 문법적으로 화살표 함수와 유사합니다.

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

`(a: string) => void` 문법은 `a`라는 문자열 타입의 매개변수가 하나 있고 반환값이 없는 함수를 의미합니다. 함수 선언과 마찬가지로 매개변수 타입은 지정되지 않으면 암시적으로 `any`입니다.

:::note 참고

매개변수의 이름은 **필수**입니다. `(string) => void` 함수 타입은 이름이 `string`이며 타입이 `any`인 매개변수를 가진 함수를 의미합니다.

:::

물론 다음과 같이 타입 별칭을 사용하여 함수 타입의 이름을 지정할 수 있습니다.

```ts
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

## 호출 시그니처

자바스크립트에서 함수는 호출 가능할 뿐만 아니라 프로퍼티를 가질 수 있습니다. 그러나 함수 타입 표현식 문법은 프로퍼티 선언을 허용하지 않습니다.

프로퍼티가 있고 호출 가능한 것을 묘사하려면 다음과 같이 객체 타입으로 **호출 시그니처**를 작성할 수 있습니다.

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

함수 타입 표현식과 문법이 약간 다른 것을 알 수 있습니다. 매개변수 목록과 반환 타입 사이에 `=>`가 아닌 `:`을 사용했습니다.

## 생성 시그니처

자바스크립트 함수는 `new` 연산자와 함께 호출될 수도 있습니다. 이 연산자는 일반적으로 새 객체를 만들기 때문에 타입스크립트에서는 이를 **생성자**라고 부릅니다.

다음과 같이 호출 시그니처 앞에 `new` 키워드를 추가하여 **생성 시그니처**를 작성할 수 있습니다.

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

자바스크립트의 `Date` 객체와 같은 일부 객체는 `new` 유무와 관계없이 호출 가능합니다. 동일한 타입의 호출과 생성 시그니처를 임의로 결합할 수 있습니다.

```ts
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

## 제네릭 함수

입력 타입과 출력 타입이 관련되거나 두 입력 타입이 어떤 식으로든 관련되어 있는 함수를 작성하는 것이 일반적입니다.

예를 들어 배열의 첫 번째 요소를 반환하는 함수가 있다고 가정해 보겠습니다.

```ts
function firstElement(arr: any[]) {
  return arr[0];
}
```

이 함수는 제 역할을 하지만 안타깝게도 반환 타입이 `any`입니다. 함수가 배열 요소의 타입을 반환한다면 더 좋을 것입니다.

타입스크립트에서 **제네릭**은 두 값 사이의 대응 관계를 묘사할 때 사용됩니다.

다음과 같이 함수 시그니처에서 **타입 매개변수**를 선언하면 됩니다.

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

함수에 타입 매개변수 `Type`를 추가하고 이를 두 곳에서 사용함으로써 함수 입력(배열)과 출력(반환값) 사이에 링크를 만들었습니다. 이제 함수를 호출하면 더 구체적인 타입이 나옵니다.

```ts
// s의 타입은 string입니다.
const s = firstElement(["a", "b", "c"]);
// n의 타입은 number입니다.
const n = firstElement([1, 2, 3]);
// u의 타입은 undefined입니다.
const u = firstElement([]);
```

### 추론

위 예시에서는 `Type`을 지정할 필요가 없었습니다. 타입은 타입스크립트에 의해 자동으로 **추론**되었습니다.

복수의 타입 매개변수도 사용할 수 있습니다. 예를 들어 `map`의 독립 실행 버전은 다음과 같습니다.

```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// 매개변수 n은 string 타입입니다.
// parsed는 'number[]' 타입입니다.
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

이 예시에서 타입스크립트는 (주어진 `string` 배열에서) 타입 매개변수 `Input`의 타입을 추론할 수 있습니다. 그리고 함수 표현식의 반환값(`number`)을 기반으로 타입 매개변수 `Output`의 타입을 추론할 수 있습니다.

### 제약

지금까지 우리는 **어떤(any)** 종류의 값에서도 작동하는 제네릭 함수를 작성했습니다. 두 값을 연관시키면서도 값의 타입을 제한하고 싶을 때가 있습니다. 이때 **제약**을 사용하여 타입 매개변수가 허용하는 타입의 종류를 제한할 수 있습니다.

두 값 중에서 더 긴 값을 반환하는 함수를 작성해 보겠습니다. 그러기 위해서는 숫자형인 `length` 프로퍼티가 필요합니다. `extends`를 사용하여 타입 매개변수를 해당 타입으로 제한합니다.

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray의 타입은 'number[]'입니다.
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString의 타입은 'alice' | 'bob'입니다.
const longerString = longest("alice", "bob");
// 오류! 숫자형에는 length 프로퍼티가 없습니다.
// 오류: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
const notOK = longest(10, 100);
```

이 예시에는 몇 가지 흥미로운 점이 있습니다. 타입스크립트는 `longest`의 반환 타입을 추론할 수 있습니다. 반환 타입 추론은 제네릭 함수에서도 작동합니다.

`Type`을 `{ length: number }`로 제한했기 때문에 `a`와 `b` 매개변수의 `.length` 프로퍼티에 접근할 수 있습니다. 타입 제약이 없으면 값이 길이 프로퍼티가 없는 다른 타입일 수 있으므로 해당 프로퍼티에 접근할 수 없습니다.

`longerArray`와 `longerString`의 타입은 인수에 기반해 추론되었습니다. 제네릭은 복수의 값을 동일한 타입으로 연관시키는 것임을 기억해야 합니다.

`number` 타입에는 `.length` 프로퍼티가 없으므로 `longest(10, 100)` 호출은 거부됩니다.

### 제한된 값 사용하기

다음은 제네릭 제약을 사용할 때 발생하는 일반적인 오류입니다.

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // 오류: Type '{ length: number; }' is not assignable to type 'Type'.
    //   '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
    return { length: minimum };
  }
}
```

이 함수는 정상인 것처럼 보일 수 있습니다. `Type`이 `{ length: number }`로 제한되고 함수는 `Type`이나 해당 제약과 일치하는 값을 반환합니다. 함수가 제약과 일치하는 **어떤** 객체가 아니라 전달된 것과 **동일한** 종류의 객체를 반환할 것을 약속한다는 점이 문제입니다.

위 코드에 문제가 없다면 다음과 같이 분명히 작동하지 않는 코드를 작성할 수 있게 됩니다.

```ts
// arr은 '{ length: 6 }' 값을 얻습니다.
const arr = minimumLength([1, 2, 3], 6);
// 여기서 충돌이 발생합니다.
// 배열에는 slice 메서드가 존재하지만 반환된 객체에는 해당 메서드가 없기 때문입니다.
console.log(arr.slice(0));
```

### 타입 인수 지정하기

타입스크립트는 일반적으로 제네릭 호출에서 의도한 타입 인수를 추론할 수 있지만 항상 그런 것은 아닙니다.

예를 들어 두 배열을 결합하는 함수를 작성한다고 가정해 보겠습니다.

```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```

일치하지 않는 배열로 이 함수를 호출하면 오류가 발생합니다.

```ts
// 오류: Type 'string' is not assignable to type 'number'.Type 'string' is not assignable to type 'number'.
const arr = combine([1, 2, 3], ["hello"]);
```

그러나 원한다면 `Type`을 수동으로 지정할 수 있습니다.

```ts
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

### 좋은 제네릭 함수 작성을 위한 지침

제네릭 함수를 작성하는 것은 재미있으며 타입 매개변수에 쉽게 빠져들 수 있습니다. 타입 매개변수가 너무 많거나 필요하지 않은 제약을 사용하면 추론이 실패하고 함수 호출자에게 문제가 생길 수 있습니다.

#### 타입 매개변수를 내리기

다음은 유사하게 보이는 함수를 작성하는 두 가지 방법입니다.

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
 
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (좋음)
const a = firstElement1([1, 2, 3]);
// b: any (나쁨)
const b = firstElement2([1, 2, 3]);
```

언뜻 보기에는 비슷해 보이지만 `firstElement1`가 훨씬 더 좋은 방법입니다. `firstElement1`의 추론된 반환 타입은 `Type`이지만 `firstElement2`의 추론된 반환 타입은 `any`입니다. 타입스크립트는 호출 중에 요소를 해결하기 위해 기다리는 것이 아니라 제약 타입을 사용하여 `arr[0]` 표현식을 해결합니다.

:::info 규칙

가능하면 제약 대신 타입 매개변수 자체를 사용하세요.

:::

#### 타입 매개변수를 적게 사용하기

다음은 앞의 예시와 유사한, 함수의 또 다른 쌍입니다.

```ts
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

두 값이 연관되지 않는 타입 매개변수 `Func`를 만들었습니다. 이는 안 좋은 신호입니다. 타입 인수를 지정하려는 호출자는 아무 이유 없이 추가 타입 인수를 수동으로 지정해야 하기 때문입니다. `Func`는 함수를 읽고 추론하기 어렵게 만들 뿐입니다.

:::info 규칙

타입 매개변수를 최대한 적게 사용하세요.

:::

#### 타입 매개변수는 두 번 나타나야 한다

우리는 함수가 제네릭일 필요가 없다는 사실을 종종 잊곤 합니다.

```ts
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");
```

더 간단한 버전을 쉽게 작성할 수 있습니다.

```ts
function greet(s: string) {
  console.log("Hello, " + s);
}
```

타입 매개변수는 **여러 값의 타입을 연관시키기 위한 것**입니다. 타입 매개변수가 함수 시그니처에서 한 번만 사용되면 아무 것도 연관되지 않습니다.

:::info 규칙

타입 매개변수가 한 곳에만 있다면 제네릭이 정말 필요한지 고려해야 합니다.

:::

## 선택적 매개변수

자바스크립트의 함수는 종종 가변적인 수의 인수를 취합니다.

예를 들어 `number`의 `toFixed` 메서드는 선택적 자릿수를 취합니다.

```ts
function f(n: number) {
  console.log(n.toFixed()); // 0개의 인수
  console.log(n.toFixed(3)); // 1개의 인수
}
```

타입스크립트에서는 다음과 같이 매개변수에 `?`를 표시하여 **선택적**으로 모델링할 수 있습니다.

```ts
function f(x?: number) {
  // ...
}
f(); // 문제 없습니다.
f(10); // 문제 없습니다.
```

매개변수가 `number` 타입으로 지정되더라도 `x` 매개변수는 사실 `number | undefined` 타입을 가지게 됩니다. 자바스크립트에서 지정되지 않은 매개변수는 `undefined` 값을 가지기 때문입니다.

매개변수에 **기본값**을 제공할 수도 있습니다.

```ts
function f(x = 10) {
  // ...
}
```

이제 `f` 본문에서 모든 `undefined` 인수는 `10`으로 대체되기 때문에 `x`는 `number` 타입을 가지게 됩니다. 매개변수가 선택 사항인 경우 호출자는 `undefined`를 전달하는 것이 항상 가능합니다. 이는 호출자가 누락된 인수를 간단히 시뮬레이트하기 때문입니다.

```ts
// 모두 문제 없습니다.
f();
f(10);
f(undefined);
```

### 콜백의 선택적 매개변수

선택적 매개변수와 함수 타입 표현식을 배웠다면 콜백을 호출하는 함수를 작성할 때 다음과 같은 실수를 하기 쉽습니다.

```ts
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

`index?`의 일반적인 의도는 선택적 매개변수로서 다음의 두 호출이 가능한 것입니다.

```ts
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
```

이것이 실제로 의미하는 바는 `callback`이 하나의 인수로 호출될 수 있다는 것입니다. 즉, 함수 정의는 구현이 다음과 같을 수 있다고 말합니다.

```ts
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // 오늘은 인덱스를 제공하고 싶지 않습니다.
    callback(arr[i]);
  }
}
```

타입스크립트는 차례로 이 의미를 적용하고 실제로는 불가능한 오류를 발생시킵니다.

```ts
myForEach([1, 2, 3], (a, i) => {
  // 오류: Object is possibly 'undefined'.
  console.log(i.toFixed());
});
```

자바스크립트에서는 매개변수보다 더 많은 인수로 함수를 호출하면 추가 인수는 무시됩니다. 타입스크립트도 같은 방식으로 작동합니다. 동일한 타입이며 매개변수가 적은 함수는 매개변수가 많은 함수를 항상 대신할 수 있습니다.

:::info 정리

콜백을 위한 함수 타입을 작성할 때, 인수를 전달하지 않고 함수를 호출하려는 것이 아니면 선택적 매개변수를 **절대** 사용하지 마세요.

:::

## 함수 오버로드

일부 자바스크립트 함수는 다양한 수와 다양한 타입의 인수로 호출할 수 있습니다. 예를 들어 타임스탬프(하나의 인수) 또는 월/일/년 지정(세 개의 인수)을 사용하는 `Date`를 생성하는 함수를 작성할 수 있습니다.

타입스크립트에서는 **오버로드 시그니처**를 사용하여 다양한 방식으로 호출 가능한 함수를 묘사할 수 있습니다. 오버로드 시그니처는 몇 가지 함수 시그니처(보통 두 개 이상)를 작성하고 그 뒤에 함수 본문을 작성하여 만듭니다.

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// 오류: No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
const d3 = makeDate(1, 3);
```

이 예시에서는 두 개의 오버로드를 작성했습니다. 하나의 인수를 받는 것과 세 개의 인수를 받는 것입니다. 앞의 두 시그니처를 **오버로드 시그니처**라고 부릅니다.

그런 다음 호환되는 시그니처를 사용하여 함수 구현을 작성했습니다. 함수에 **구현** 시그니처가 있지만 이 시그니처를 직접 호출하는 것은 불가능합니다. 필수 매개변수 다음에 선택적 매개변수가 두 개 있는 함수를 작성했지만 두 개의 매개변수로 호출하는 것은 불가능합니다!

### 오버로드 시그니처와 구현 시그니처

이것은 일반적인 혼란의 원인입니다. 사람들은 종종 다음과 같은 코드를 작성하고 오류가 왜 발생하는지 모릅니다.

```ts
function fn(x: string): void;
function fn() {
  // ...
}
// 0개의 인수로 호출 가능할 것이라 예상합니다.
// 오류: Expected 1 arguments, but got 0.
fn();
```

함수 본문을 작성하는 데 사용되는 시그니처는 외부에서 볼 수 없다는 점을 주의해야 합니다.

:::caution

**구현** 시그니처는 외부에서 보이지 않습니다. 오버로드 함수를 작성할 때는 항상 함수 구현 위에 두 개 이상의 시그니처가 있어야 합니다.

:::

구현 시그니처도 오버로드 시그니처와 **호환**되어야 합니다.

예를 들어 다음 함수에서는 구현 시그니처가 오버로드와 호환되지 않아서 오류가 발생합니다.

```ts
function fn(x: boolean): void;
// 인수 타입이 올바르지 않습니다.
// 오류: This overload signature is not compatible with its implementation signature.
function fn(x: string): void;
function fn(x: boolean) {}
```

```ts
function fn(x: string): string;
// 반환 타입이 올바르지 않습니다.
// 오류: This overload signature is not compatible with its implementation signature.
function fn(x: number): boolean;

function fn(x: string | number) {
  return "oops";
}
```

### 좋은 오버로드 작성하기

제네릭과 마찬가지로 함수 오버로드를 사용할 때 따라야 할 지침이 몇 가지 있습니다. 이 원칙을 따르면 함수를 더 쉽게 호출하고, 이해하고, 구현할 수 있습니다.

다음과 같이 문자열이나 배열의 길이를 반환하는 함수가 있다고 가정해 보겠습니다.

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

이 함수는 문제가 없습니다. 문자열이나 배열로 호출할 수 있습니다. 그러나 타입스크립트는 함수 호출을 단일 오버로드로만 해결할 수 있기 때문에 문자열 또는 배열일 수 있는 값으로 호출하는 것은 불가능합니다.

```ts
len(""); // 문제 없습니다.
len([0]); // 문제 없습니다.
// 오류: No overload matches this call.
//   Overload 1 of 2, '(s: string): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//       Type 'number[]' is not assignable to type 'string'.
//   Overload 2 of 2, '(arr: any[]): number', gave the following error.
//     Argument of type 'number[] | "hello"' is not assignable to parameter of type 'any[]'.
//       Type 'string' is not assignable to type 'any[]'.No overload matches this call.
len(Math.random() > 0.5 ? "hello" : [0]);
```

두 오버로드의 인수 개수와 반환 타입이 같으므로, 오버로드가 없는 함수를 대신 작성할 수 있습니다.

```ts
function len(x: any[] | string) {
  return x.length;
}
```

이게 훨씬 낫네요! 호출자는 두 타입의 값으로 함수를 호출할 수 있습니다. 그리고 올바른 구현 시그니처를 알아낼 필요가 없습니다.

:::info 정리

가능하면 오버로드 대신 합집합 타입이 있는 매개변수를 사용하세요.

:::

### 함수에서 `this` 선언하기

타입스크립트는 코드 흐름 분석을 통해 함수에서 `this`가 무엇인지 추론합니다.

예시:

```ts
const user = {
  id: 123,
 
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

타입스크립트는 `user.becomeAdmin` 함수의 `this`가 외부 객체 `user`라는 것을 압니다. 대부분의 경우 `this`는 이것만으로 충분합니다. 하지만 `this`가 가리키는 객체를 지정하고 싶을 때가 있습니다.

자바스크립트 명세서에는 `this`라는 이름을 가진 매개변수를 사용할 수 없다고 명시되어 있습니다. 따라서 타입스크립트에서는 이 문법을 사용하여 함수 본문에서 `this`의 타입을 선언할 수 있습니다.

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

이 패턴은 다른 객체가 일반적으로 함수 호출 시기를 제어하는 콜백 스타일 API에서 많이 사용합니다. 여기서는 화살표 함수가 아닌 `function`을 사용해야 합니다.

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
// 오류: The containing arrow function captures the global value of 'this'.
//   Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
const admins = db.filterUsers(() => this.admin);
```

## 기타 알아야 할 타입

함수 타입을 사용할 때 자주 쓰는 추가 타입이 몇 가지 있습니다. 다른 모든 타입과 동일하게 어디에서나 사용할 수 있지만, 특히 함수와 관련이 있는 타입입니다.

### `void`

`void`는 값을 반환하지 않는 함수의 반환값을 나타냅니다. 함수에 `return`문이 없거나 반환문에서 명시적 값을 반환하지 않을 때 추론되는 타입입니다.

```ts
// 추론된 반환 타입은 void입니다.
function noop() {
  return;
}
```

자바스크립트에서 값을 반환하지 않는 함수는 암시적으로 `undefined` 값을 반환합니다. 하지만 타입스크립트에서는 `void`와 `undefined`가 구별됩니다. 이 장의 끝에 자세한 내용이 있습니다.

:::info 정리

`void`와 `undefined`는 구별됩니다.

:::

### `object`

특별한 타입인 `object`는 원시값(`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`)이 아닌 모든 값을 참조합니다. 이는 빈 객체 타입인 `{ }`와 다르며, 전역 타입인 `Object`와도 다릅니다. `Object`는 거의 사용하지 않습니다.

:::info 정리

`object`는 `Object`와 다릅니다. **항상** `object`를 사용하세요!

:::

자바스크립트에서 함수 값은 객체입니다. 프로퍼티가 있고, 프로퍼티 체인에 `Object.prototype`가 있으며, 이는 `instanceof Object`와 동일합니다. `Object.keys`도 호출 가능합니다. 따라서 타입스크립트에서 함수 타입은 `object`로 간주됩니다.

### `unknown`

`unknown` 타입은 **모든(any)** 값을 나타냅니다. 이 타입은 `any` 타입과 유사하지만 `unknown` 값으로 무언가를 하는 것은 오류를 발생시키므로 더 안전합니다.

```ts
function f1(a: any) {
  a.b(); // 문제 없습니다.
}
function f2(a: unknown) {
  // 오류: Object is of type 'unknown'.
  a.b();
}
```

이는 함수 타입을 묘사할 때 유용합니다. 함수 본문에 `any` 값을 포함하지 않으면서 모든 값을 허용하는 함수를 묘사할 수 있습니다.

반대로 알 수 없는 타입의 값을 반환하는 함수를 묘사하는 것도 가능합니다.

```ts
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
 
// obj는 주의가 필요합니다!
const obj = safeParse(someRandomString);
```

### `never`

일부 함수는 값을 **절대** 반환하지 않습니다.

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

`never` 타입은 값이 **절대** 관찰되지 않는 값을 묘사합니다. 반환 타입의 `never`는 함수가 예외를 던지거나 프로그램 실행이 종료됨을 의미합니다.

`never`는 타입스크립트가 합집합에 남은 것이 없다고 판단할 때도 나타납니다.

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // 무언가를 합니다.
  } else if (typeof x === "number") {
    // 다른 무언가를 합니다.
  } else {
    x; // never 타입입니다!
  }
}
```

### `Function`

전역 타입인 `Function`은 `bind`, `call`, `apply`, 그리고 자바스크립트의 모든 함수 값에 존재하는 기타 프로퍼티를 묘사합니다. 그리고 `Function` 타입의 값을 항상 호출할 수 있는 특별한 프로퍼티가 있습니다. 해당 호출은 `any`를 반환합니다.

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

이는 **타입인 아닌 함수 호출**이며 안전하지 않은 `any` 반환 타입이므로 사용하지 않는 것이 좋습니다.

임의의 함수를 받아야 하지만 해당 함수를 호출할 생각이 없다면 `() => void`를 사용하는 것이 더 안전합니다.

## 나머지 매개변수와 인수

:::note 배경 지식

- [나머지 매개변수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [전개 문법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

:::

### 나머지 매개변수

선택적 매개변수 또는 오버로드를 사용하여 다양한 고정 인수 개수를 허용하는 함수를 만들 수 있습니다. 추가로 **나머지 매개변수**를 사용하여 **무한한** 수의 인수를 취하는 함수를 정의할 수 있습니다.

나머지 매개변수는 다른 모든 매개변수 뒤에서 `...` 문법을 사용합니다.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// a는 값 '[10, 20, 30, 40]'을 얻습니다.
const a = multiply(10, 1, 2, 3, 4);
```

타입스크립트에서 이 매개변수에 대한 타입 주석은 암시적으로 `any` 대신 `any[]`입니다. 주어진 타입 주석은 반드시 `Array<T>` 또는 `T[]` 또는 튜플 타입이어야 합니다.

### 나머지 인수

반대로 전개 문법을 사용하여 배열에서 가변적인 수의 인수를 제공할 수 있습니다.

예를 들어 배열의 `push` 메서드는 임의 개수의 인수를 사용합니다.

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

일반적으로 타입스크립트는 배열이 불변이라고 가정하지 않습니다. 이로 인해 다음과 같이 놀라운 일이 생길 수 있습니다.

```ts
// 추론된 타입은 'number[]'입니다. 즉 0개 이상의 숫자가 포함된 배열입니다.
// 특별히 두 개의 숫자가 포함된 배열이 아닙니다.
const args = [8, 5];
// 오류: A spread argument must either have a tuple type or be passed to a rest parameter.
const angle = Math.atan2(...args);
```

이 상황에 대한 일반적이고 가장 간단한 솔루션은 `const` 컨텍스트입니다.

```ts
// 길이가 2인 튜플로 추론됩니다.
const args = [8, 5] as const;
// 문제 없습니다.
const angle = Math.atan2(...args);
```

나머지 인수를 사용하려면 이전 런타임을 대상으로 할 때 [`downlevelIteration`](https://www.typescriptlang.org/ko/tsconfig#downlevelIteration)을 설정해야 할 수 있습니다.

## 매개변수 구조 분해

:::note 배경 지식

- [구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

:::

매개변수 구조 분해를 사용하면 인수로 제공된 객체를 함수 본문의 하나 이상의 지역 변수로 편리하게 분해할 수 있습니다.

자바스크립트에서는 다음과 같습니다.

```ts
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

객체에 대한 타입 주석은 구조 분해 문법 다음에 옵니다.

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

다소 장황해 보일 수 있지만 여기서도 명명된 타입을 사용할 수 있습니다.

```ts
// 이전 예시와 동일합니다.
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## 함수의 할당 가능성

### 반환 타입 `void`

함수의 `void` 반환 타입은 비정상적이지만 예상되는 행동을 만들 수 있습니다.

반환 타입이 `void`인 문맥적 타이핑은 함수가 무언가를 반환하지 **않도록** 강제하지 **않습니다**. 이를 `void` 반환 타입(`type vf = () => void`)을 갖는 문맥적 함수 타입이라고 볼 수 있습니다. 함수는 구현될 때 모든 값을 반환할 수 있지만 해당 값은 무시됩니다.

따라서 `() => void` 타입의 다음 구현은 유효합니다.

```ts
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
```

그리고 이 함수의 반환값을 다른 변수에 할당할 때는 `void` 타입이 유지됩니다.

```ts
const v1 = f1();
 
const v2 = f2();
 
const v3 = f3();
```

이 특성 때문에 `Array.prototype.push`가 숫자를 반환하고 `Array.prototype.forEach` 메서드가 반환 타입이 `void`인 함수를 기대함에도 다음 코드가 유효한 것입니다.

```ts
const src = [1, 2, 3];
const dst = [0];
 
src.forEach((el) => dst.push(el));
```

리터럴 함수 정의에 `void` 반환 타입이 있으면 해당 함수는 아무것도 반환하지 **않아야** 합니다.

```ts
function f2(): void {
  // @ts-expect-error
  return true;
}
 
const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

`void`에 대한 자세한 내용은 다음 문서 항목을 참조하세요.

- [안내서](#void)
- [자주 묻는 질문 - “void를 반환하는 함수가 void가 아닌 값을 반환하는 함수에 할당 가능한 이유는 무엇인가요?”](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)