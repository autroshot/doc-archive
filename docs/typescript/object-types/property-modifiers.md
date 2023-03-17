---
sidebar_position: 1
---

# 프로퍼티 수정자

객체 타입의 각 프로퍼티는 타입, 선택 사항 여부, 쓰기 가능 여부와 같은 몇 가지 사항을 지정할 수 있습니다.

## 선택적 프로퍼티

우리는 대부분 프로퍼티 세트가 존재할 수 있는 객체를 다룹니다. 이 경우 이름 끝에 물음표(`?`)를 추가하여 해당 프로퍼티를 **선택 사항**으로 표시할 수 있습니다.

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

이 예시에서 `xPos`와 `yPos`는 선택 사항입니다. 둘 중 하나만 선택해도 되므로 위의 `paintShape` 호출은 모두 유효합니다. 모든 선택 사항은 해당 프로퍼티가 지정될 때 특정 타입을 가져야 합니다.

[`strictNullChecks`](https://www.typescriptlang.org/ko/tsconfig#strictNullChecks)일 때, 타입스크립트는 해당 프로퍼티가 `undefined`일 수 있다고 알려줍니다.

```ts
function paintShape(opts: PaintOptions) {
  // (property) PaintOptions.xPos?: number | undefined
  let xPos = opts.xPos;
  // (property) PaintOptions.yPos?: number | undefined
  let yPos = opts.yPos;
  // ...
}
```

자바스크립트에서는 프로퍼티를 지정하지 않아도 접근이 가능하며 그 값은 `undefined`입니다. `undefined`를 다음과 같이 특별하게 다룰 수 있습니다.

```ts
function paintShape(opts: PaintOptions) {
  // let xPos: number
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  // let yPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // ...
}
```

지정되지 않은 값에 기본값을 설정하는 패턴은 너무 일반적이어서 자바스크립트에는 이를 지원하는 문법이 있습니다.

```ts
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  // (parameter) xPos: number
  console.log("x coordinate at", xPos);
  // (parameter) yPos: number
  console.log("y coordinate at", yPos);
  // ...
}
```

여기서는 `paintShape`의 매개변수에 [구조 분해 패턴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)이 사용되며 `xPos`와 `yPos`에 [기본값](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B8%B0%EB%B3%B8%EA%B0%92)을 제공합니다. 이제 `xPos`와 `yPos`는 `paintShape` 본문 내에 존재하지만 `paintShape` 호출에서는 선택적입니다.

:::note 참고

현재로서는 구조 분해 패턴 내에 타입 주석을 배치할 수 있는 방법이 없습니다. 다음 문법은 자바스크립트에서 이미 다른 의미를 갖기 때문입니다.

```ts
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  // 오류: Cannot find name 'shape'. Did you mean 'Shape'?
  render(shape);
  // 오류: Cannot find name 'xPos'.
  render(xPos);
}
```

객체 구조 분해 패턴에서 `shape: Shape`는 `shape` 프로퍼티를 잡아 `Shape`라는 로컬 변수로 재정의하는 것을 의미합니다. 마찬가지로 `xPos: number`는 매개변수의 `xPos` 값에 기반한 `number`라는 변수를 생성합니다.

:::

[매핑 수정자](https://www.typescriptlang.org/ko/docs/handbook/2/mapped-types.html#mapping-modifiers)를 사용하여 `optional` 속성을 제거할 수 있습니다.

## `readonly` 프로퍼티

타입스크립트에서 프로퍼티는 `readonly`로 표시할 수 있습니다. 런타임 동작은 바뀌지 않습니다. 하지만 `readonly`로 표시된 프로퍼티는 타임 검사에서 쓰기(write)가 불가능합니다.

```ts
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // 'obj.prop'을 읽을 수 있습니다.
  console.log(`prop has the value '${obj.prop}'.`);

  // 하지만 다시 할당할 수는 없습니다.
  // 오류: Cannot assign to 'prop' because it is a read-only property.
  obj.prop = "hello";
}
```

`readonly` 수정자를 사용한다고 해서 값이 완전히 불변인 것은 아닙니다. 내부 콘텐츠를 변경할 수 없다는 의미입니다. 즉, 프로퍼티 자체를 다시 쓰는 것이 불가능하다는 것입니다.

```ts
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // 'home.resident'에서 프로퍼티를 읽고 갱신할 수 있습니다.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // 하지만 Home의 resident 프로퍼티 자체에는 쓰기가 불가능합니다.
  // 오류: Cannot assign to 'resident' because it is a read-only property.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}
```

`readonly`가 의미하는 바를 잘 이해해야 합니다. 타입스크립트를 개발 중에 객체를 어떻게 사용해야 하는지를 알릴 수 있습니다.

타입스크립트는 두 타입의 프로퍼티가 호환되는지 확인할 때 `readonly`를 고려하지 않습니다. 따라서 `readonly`는 별칭을 통해 변경될 수도 있습니다.

```ts
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// 작동합니다.
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // 42를 출력합니다.
writablePerson.age++;
console.log(readonlyPerson.age); // 43을 출력합니다.
```

[매핑 수정자](https://www.typescriptlang.org/ko/docs/handbook/2/mapped-types.html#mapping-modifiers)를 사용하여 `readonly` 속성을 제거할 수 있습니다.

## 색인 시그니처

타입 프로퍼티의 모든 이름을 미리 알지 못하지만 값의 모양은 알고 있는 경우가 있습니다.

이 경우 **색인 시그니처**를 사용하여 가능한 값 타입을 묘사할 수 있습니다.

예시:

```ts
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
// const secondItem: string
const secondItem = myArray[1];
```

위의 `StringArray` 인터페이스에는 색인 시그니처가 있습니다. 이 색인 시그니처는 `StringArray`가 `number`로 색인되면 `string`을 반환한다고 명시합니다.

:::note 참고

색인 시그니처 프로퍼티의 타입은 문자열 또는 숫자여야 합니다.

두 가지 타입의 색인을 모두 지원할 수 있지만 숫자 색인에서 반환된 타입은 문자열 색인에서 반환된 타입의 하위 타입이어야 합니다. `number`로 색인을 만들 때, 자바스크립트가 실제로 객체로 색인을 만들기 전에 `string`으로 변환하기 때문입니다. `100`(`number`)으로 색인을 만드는 것은 `"100"`(`string`)으로 색인을 만드는 것과 동일하므로 둘이 일관되어야 합니다.

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 오류: 숫자형 문자열로 색인을 만들면 완전히 다른 타입의 Animal을 얻을 수 있습니다.
interface NotOkay {
  // 오류: 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
  [x: number]: Animal;
  [x: string]: Dog;
}
```

:::

문자열 색인 시그니처는 '사전' 패턴을 묘사하는 강력한 방법이지만 모든 프로퍼티가 색인 시그니처의 반환 타입과 일치해야 합니다. 문자열 색인이 `obj.property`를 `obj["property"]`로도 사용할 수 있다고 선언하기 때문입니다.

다음 예시에서는 `name`의 타입이 문자열 색인의 타입과 일치하지 않으므로 타입 검사기가 오류를 표시합니다.

```ts
interface NumberDictionary {
  [index: string]: number;

  length: number; // 문제 없습니다.
  // 오류: Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
  name: string;
}
```

그러나 색인 시그니처가 프로퍼티 타입의 합집합인 경우 다른 타입의 프로퍼티가 허용됩니다.

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // length가 숫자이므로 문제 없습니다.
  name: string; // name이 문자열이므로 문제 없습니다.
}
```

마지막으로 색인 시그니처를 `readonly`로 설정하여 색인에 할당하는 것을 방지할 수 있습니다.

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
// 오류: Index signature in type 'ReadonlyStringArray' only permits reading.
myArray[2] = "Mallory";
```

색인 시그니처가 `readonly`이므로 `myArray[2]`를 지정할 수 없습니다.