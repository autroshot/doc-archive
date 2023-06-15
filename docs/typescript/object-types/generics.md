---
sidebar_position: 5
---

# 제네릭

모든 값을 담을 수 있는 `Box` 타입이 있다고 가정해 보겠습니다. `string`, `number`, `Giraffe`를 비롯해 무엇이든지 담을 수 있습니다.

```ts twoslash
interface Box {
  contents: any;
}
```

현재 `contents` 프로퍼티의 타입은 `any`이고 작동하지만 나중에는 문제가 생길 수 있습니다.

대신 `unknown`을 사용할 수 있지만, `contents`의 타입을 이미 아는 경우에는 예방 검사를 수행하거나 오류가 발생하기 쉬운 타입 단언을 사용해야 합니다.

```ts twoslash
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: "hello world",
};

//'x.contents'를 확인할 수 있습니다.
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// 또는 타입 단언을 사용할 수 있습니다.
console.log((x.contents as string).toLowerCase());
```

안전한 타입 접근법 중 하나는 `contents`의 모든 타입에 대해 별개의 `Box` 타입으로 분류하는 것입니다.

```ts twoslash
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
```

그러나 이 방법은 해당 타입으로 작동하는 별개의 함수 또는 함수의 다중 정의를 정의해야 합니다.

```ts twoslash
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
// ---cut---
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

상용구가 너무 많습니다. 게다가 나중에 새로운 타입과 다중 정의를 도입해야 할 수도 있습니다. `box`의 타입과 다중 정의가 사실상 모두 동일하기 때문에 이 방법은 만족스럽지 않습니다.

대신 **타입 매개변수**를 선언하는 **제네릭** `Box` 타입을 만들 수 있습니다.

```ts twoslash
interface Box<Type> {
  contents: Type;
}
```

이를 '`Type`의 `Box`는 `contents`가 `Type` 타입을 가진 것'이라고 읽을 수 있습니다. 나중에 `Box`를 참조할 때 `Type` 대신에 **타입 인수**를 건네줘야 합니다.

```ts twoslash
interface Box<Type> {
  contents: Type;
}
// ---cut---
let box: Box<string>;
```

`Box`를 실제 타입에 대한 템플릿으로 생각할 수 있습니다. 여기서 `Type`은 다른 타입으로 대체될 플레이스홀더입니다. 타입스크립트가 `Box<string>`를 보면 `Box<Type>`의 모든 `Type` 인스턴스를 `string`으로 대체하고 `{ contents: string }`으로 작업하게 됩니다. 즉, `Box<string>`과 이전 `StringBox`는 동일하게 작동합니다.

```ts twoslash
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "hello" };
boxA.contents;
//   ^?

let boxB: StringBox = { contents: "world" };
boxB.contents;
//   ^?
```

`Box`는 `Type`을 어떤 것으로든 대체할 수 있으므로 재사용이 가능합니다. 새로운 타입의 `Box`가 필요할 때 새로운 `Box` 타입을 선언할 필요가 전혀 없습니다. (원한다면 그렇게 할 수 있습니다.)

```ts twoslash
interface Box<Type> {
  contents: Type;
}

interface Apple {
  // ....
}

// '{ contents: Apple }'과 동일합니다.
type AppleBox = Box<Apple>;
```

이는 [제네릭 함수](../functions/generic.md)를 사용하여 다중 정의를 완전히 피할 수 있다는 것을 의미합니다.

```ts twoslash
interface Box<Type> {
  contents: Type;
}

// ---cut---
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

타입 별칭에도 제네릭을 사용할 수 있습니다.

다음과 같이 새로운 `Box<Type>` 인터페이스를 정의할 수 있습니다.

```ts twoslash
interface Box<Type> {
  contents: Type;
}
```

대신 다음과 같이 타입 별칭을 사용할 수도 있습니다.

```ts twoslash
type Box<Type> = {
  contents: Type;
};
```

타입 별칭은 인터페이스와 달리 객체 타입 이상을 묘사할 수 있습니다. 따라서 타입 별칭을 사용하여 다른 종류의 제네릭 도우미 타입을 작성할 수 있습니다.

```ts twoslash
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
//   ^?

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
//   ^?
```

잠시 후에 다시 타입 별칭으로 돌아오겠습니다.

## `Array` 타입

제네릭 객체 타입은 포함된 요소의 타입과 독립적으로 작동하는 일종의 컨테니어 타입인 경우가 많습니다. 이는 데이터 구조가 서로 다른 데이터 타입에서 재사용할 수 있으므로 이상적입니다.

사실 이 핸드북 전체에서 `Array` 타입을 사용했습니다. `number[]`나 `string[]` 같은 타입은 `Array<number>`와 `Array<string>`의 줄임말일 뿐입니다.

```ts twoslash
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// 둘 중 하나를 사용할 수 있습니다.
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

위의 `Box` 타입과 마찬가지로 `Array` 자체는 제네릭 타입입니다.

```ts twoslash
// @noLib: true
interface Number {}
interface String {}
interface Boolean {}
interface Symbol {}
// ---cut---
interface Array<Type> {
  /**
   * 배열의 길이를 가져오거나 설정합니다.
   */
  length: number;

  /**
   * 배열의 마지막 요소를 제거하고 반환합니다.
   */
  pop(): Type | undefined;

  /**
   * 배열에 새로운 요소를 추가하고 배열의 새로운 길이를 반환합니다.
   */
  push(...items: Type[]): number;

  // ...
}
```

모던 자바스크립트는 `Map<K, V>`, `Set<T>`, `Promise<T>` 같은 제네릭 데이터 구조도 제공합니다. `Map`, `Set`, `Promise`의 동작 방식 덕분에 모든 타입과 함께 사용할 수 있습니다.

## `ReadonlyArray` 타입

`ReadonlyArray`는 변경하면 안 되는 배열을 묘사하는 특별한 타입입니다.

```ts twoslash
// @errors: 2339
function doStuff(values: ReadonlyArray<string>) {
  // values를 읽을 수 있습니다.
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // 하지만 values를 변경하는 것은 불가능합니다.
  values.push("hello!");
}
```

프로퍼티의 `readonly` 수정자와 마찬가지로 주로 의도를 알리는 데 사용합니다. `ReadonlyArray`를 반환하는 함수를 보면, 반환되는 배열의 내용을 변경할 수 없음을 알 수 있습니다. 그리고 `ReadonlyArray`를 소비하는 함수를 보면, 해당 함수에 어떤 배열을 전달해도 배열의 내용이 변경되는 것을 걱정하지 않아도 됩니다.

`Array`와 달리 `ReadonlyArray` 생성자는 없습니다.

```ts twoslash
// @errors: 2693
new ReadonlyArray("red", "green", "blue");
```

대신 `ReadonlyArray`에 일반 `Array`를 할당할 수 있습니다.

```ts twoslash
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

타입스크립트가 `Array<Type>`의 약칭으로 `Type[]`을 제공하는 것처럼, `ReadonlyArray<Type>`의 약칭으로 `readonly Type[]`을 제공합니다.

```ts twoslash
// @errors: 2339
function doStuff(values: readonly string[]) {
  //                     ^^^^^^^^^^^^^^^^^
  // values를 읽을 수 있습니다.
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // 하지만 values를 변경하는 것은 불가능합니다.
  values.push("hello!");
}
```

마지막으로 `readonly` 프로퍼티 수정자와 달리, `Array`를 `ReadonlyArray`에 할당하는 것은 가능하지만 그 반대는 불가능합니다.

```ts twoslash
// @errors: 4104
let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;
```

## 튜플 타입

**튜플 타입**은 포함된 요소의 개수와 특정 위치에 포함된 타입을 정확하게 아는 일종의 `Array` 타입입니다.

```ts twoslash
type StringNumberPair = [string, number];
//                      ^^^^^^^^^^^^^^^^
```

`StringNumberPair`는 `string`과 `number`로 이루어진 튜플 타입입니다. `ReadonlyArray`처럼 런타임에는 표현되지 않지만 타입스크립트에게는 의미를 갖습니다. 타입 시스템에서 `StringNumberPair`는 `0` 색인에 `string`이 있고 `1` 색인에 `number`가 있는 배열을 묘사합니다.

```ts twoslash
function doSomething(pair: [string, number]) {
  const a = pair[0];
  //    ^?
  const b = pair[1];
  //    ^?
  // ...
}

doSomething(["hello", 42]);
```

요소 개수를 초과하여 색인을 생성하려고 하면 오류가 발생합니다.

```ts twoslash
// @errors: 2493
function doSomething(pair: [string, number]) {
  // ...

  const c = pair[2];
}
```

자바스크립트의 [배열 구조 분해](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EB%B0%B0%EC%97%B4_%EA%B5%AC%EC%A1%B0_%EB%B6%84%ED%95%B4)를 사용하여 튜플을 구조 분해할 수 있습니다.

```ts twoslash
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  //          ^?

  console.log(hash);
  //          ^?
}
```

:::note 참고

튜플 유형은 각 요소의 의미가 **명백한** 컨벤션 기반 API에서 유용합니다. 변수를 구조 분해할 때 변수의 이름을 원하는 대로 지정할 수 있는 유연성이 생깁니다. 위의 예시에서 `0`과 `1` 요소의 이름을 원하는 대로 지정할 수 있습니다.

그러나 모든 사용자가 컨벤션에 대해 동일한 관점을 갖지 않을 수 있습니다. 따라서 설명적인 프로퍼티 이름이 있는 객체를 사용하는 것이 API에 더 나은지 고려해 볼 필요가 있습니다.

:::

길이 검사를 제외하면, 간단한 튜플 타입은 `Array`에서 특정 색인에 프로퍼티를 선언하고 숫자 리터럴 타입으로 `length`를 선언한 것과 동일합니다.

```ts twoslash
interface StringNumberPair {
  // 특수 프로퍼티
  length: 2;
  0: string;
  1: number;

  // 기타 Array<string | number> 멤버들...
  slice(start?: number, end?: number): Array<string | number>;
}
```

튜플은 물음표(요소의 타입 뒤에 `?`)를 사용하여 선택적 프로퍼티를 가질 수 있습니다. 선택적 튜플 요소는 마지막에만 올 수 있으며 `length` 타입에도 영향을 미칩니다.

```ts twoslash
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  //           ^?

  console.log(`Provided coordinates had ${coord.length} dimensions`);
  //                                            ^?
}
```

튜플은 배열이나 튜플 타입이어야 하는 나머지 요소도 가질 수 있습니다.

```ts twoslash
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

- `StringNumberBooleans`은 처음 두 요소가 각각 `string`과 `number`이고, 그 뒤에는 원하는 만큼의 `boolean`이 올 수 있는 튜플을 묘사합니다.
- `StringBooleansNumber`는 첫 요소가 `string`이고, 그 뒤에는 원하는 만큼의 `boolean`이 오고, 마지막은 `number`로 끝나는 튜플을 묘사합니다.
- `BooleansStringNumber`는 처음에 원하는 만큼의 `boolean`이 오고, 그 뒤에는 `string`과 `number`가 오는 튜플을 묘사합니다.

나머지 요소가 있는 튜플에서는 길이를 지정하지 않습니다. 묘사된 요소의 집합이 여러 위치에 있을 뿐입니다.

```ts twoslash
type StringNumberBooleans = [string, number, ...boolean[]];
// ---cut---
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];
```

선택적 요소와 나머지 요소가 어디서 유용할까요? 타입스크립트가 매개변수 목록과 튜플을 일치시킬 때 좋습니다. 튜플 타입은 다음과 같이 [나머지 매개변수와 인수](../functions/rest-parameters-and-arguments.md)에 사용될 수 있습니다.

```ts twoslash
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
```

이는 기본적으로 다음과 동일합니다.

```ts twoslash
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```

나머지 매개변수를 사용하여 가변 개수의 인수를 사용하고 최소 개수의 요소가 필요하지만 중간 변수를 도입하고 싶지 않을 때 편리합니다.

## `readonly` 튜플 타입

튜플 타입에는 `readonly` 변형이 있습니다. 배열 약칭 구문과 동일하게 앞에 `readonly` 수정자를 붙이면 됩니다.

```ts twoslash
function doSomething(pair: readonly [string, number]) {
  //                       ^^^^^^^^^^^^^^^^^^^^^^^^^
  // ...
}
```

예상할 수 있듯이, `readonly` 튜플의 프로퍼티에 쓰기는 타입스크립트에서 허용되지 않습니다.

```ts twoslash
// @errors: 2540
function doSomething(pair: readonly [string, number]) {
  pair[0] = "hello!";
}
```

튜플은 생성한 뒤에는 수정하지 않는 경우가 대부분이므로 가능하면 `readonly` 튜플로 만드는 것이 좋습니다. 이는 `const` 단언이 있는 배열 리터럴은 `readonly` 튜플 타입으로 추론된다는 점을 고려할 때 중요합니다.

```ts twoslash
// @errors: 2345
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
```

여기서 `distanceFromOrigin`은 요소를 수정하지 않지만 변경 가능한 튜플을 기대합니다. `point`의 타입은 `readonly [3, 4]`로 추론되므로 `[number, number]`와 호환되지 않습니다. `point`의 요소가 변경되지 않는다는 것을 보장하지 못하기 때문입니다.

