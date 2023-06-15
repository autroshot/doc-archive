---
sidebar_position: 5
---

# 조건부 타입

가장 유용한 프로그램의 핵심은 입력을 기반으로 결정을 내리는 것입니다. 자바스크립트 프로그램도 다르지 않지만, 값을 쉽게 분석할 수 있다는 사실을 고려하여 이러한 결정도 입력의 타입에 기반합니다. **조건부 타입**은 입력 타입과 출력 타입 간의 관계를 묘사하는 데 도움이 됩니다.

```ts twoslash
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
//   ^?

type Example2 = RegExp extends Animal ? number : string;
//   ^?
```

조건부 타입은 자바스크립트의 조건식(`condition ? trueExpression : falseExpression`)과 비슷한 형태를 갖습니다.

```ts twoslash
type SomeType = any;
type OtherType = any;
type TrueType = any;
type FalseType = any;
type Stuff =
  // ---cut---
  SomeType extends OtherType ? TrueType : FalseType;
```

`extends`의 왼쪽 타입이 오른쪽 타입에 할당 가능하다면, 첫 번째 분기(`true` 분기)에서 타입을 가져옵니다. 그렇지 않으면 뒤의 분기(`false` 분기)에서 타입을 가져오게 됩니다.

위의 예시에서 조건부 타입은 별로 유용하지 않은 것처럼 보일 수 있습니다. 스스로 `Dog extends Animal` 여부를 판단하고 `number` 또는 `string`을 선택할 수 있기 때문입니다! 그러나 조건부 타입의 힘은 제네릭과 함께 사용할 때 발휘됩니다.

예를 들어 다음 `createLabel` 함수를 살펴보겠습니다.

```ts twoslash
interface IdLabel {
  id: number /* 어떤 필드 */;
}
interface NameLabel {
  name: string /* 다른 필드 */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

`createLabel`에 대한 이러한 다중 정의는 입력 타입에 따라 선택하는 단일 자바스크립트 함수를 설명합니다. 몇 가지 주의할 점이 있습니다.

1. 라이브러리가 API 전체에서 계속해서 같은 종류의 선택을 해야 한다면 이는 번거로운 일이 됩니다.
2. 세 가지 다중 정의를 생성해야 합니다. 타입이 **확실**한 경우(`string`, `number`) 하나씩, 가장 일반적인 경우(`string | number`) 하나입니다. `createLabel`이 처리할 수 있는 모든 새 타입에 대해 다중 정의의 수가 기하급수적으로 증가합니다.

대신 조건부 타입으로 논리를 인코딩할 수 있습니다.

```ts twoslash
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
// ---cut---
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

그런 다음 이 조건부 타입을 사용하여 다중 정의를 하나의 함수로 단순화할 수 있습니다.

```ts twoslash
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
// ---cut---
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");
//  ^?

let b = createLabel(2.8);
//  ^?

let c = createLabel(Math.random() ? "hello" : 42);
//  ^?
```

### 조건부 타입의 제약 조건

종종 조건부 타입의 검사는 새로운 정보를 제공합니다. 타입 가드로 범위를 좁히면 더 구체적인 타입을 얻을 수 있는 것처럼, 조건부 타입의 참 분기는 우리가 확인하는 타입에 따라 제네릭을 추가로 제한합니다.

예를 들어 다음을 살펴보겠습니다.

```ts twoslash
// @errors: 2536
type MessageOf<T> = T["message"];
```

이 예시에서 `T`는 `message`라는 프로퍼티를 가지고 있지 않으므로 타입스크립트 오류가 발생합니다. `T`를 제한할 수 있으면 타입스크립트는 더 이상 불평하지 않을 것입니다.

```ts twoslash
type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;
//   ^?
```

그러나 `MessageOf`가 모든 타입을 받고 `message` 프로퍼티를 사용할 수 없을 때, 기본적으로 `never`와 같이 설정되도록 하려면 어떻게 해야 할까요? 제약 조건을 제거하고 조건부 타입을 도입하여 이를 수행할 수 있습니다.

```ts twoslash
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
//   ^?

type DogMessageContents = MessageOf<Dog>;
//   ^?
```

참 분기 내에서 타입스크립트는 `T`에 `message` 프로퍼티가 **있다**는 것을 압니다.

또 다른 예로, 배열 타입을 요소 타입으로 평평하게 만들지만 그렇지 않으면 그대로 두는 `Flatten` 타입을 작성할 수 있습니다.

```ts twoslash
type Flatten<T> = T extends any[] ? T[number] : T;

// 요소 타입을 추출합니다.
type Str = Flatten<string[]>;
//   ^?

// 타입을 그대로 둡니다.
type Num = Flatten<number>;
//   ^?
```

`Flatten`에 배열 타입이 주어지면, `number`로 색인화된 접근을 사용하여 `string[]`의 요소 타입을 가져옵니다. 그렇지 않으면 주어진 타입을 그대로 반환합니다.

### 조건부 타입 내에서의 추론

우리는 앞에서 조건부 타입을 사용하여 제약 조건을 적용한 다음 타입을 추출했습니다. 이 작업은 매우 일반적인 작업이므로 조건부 타입을 사용하면 더 쉬워집니다.

조건부 타입은 `infer` 키워드를 사용하여 참 분기에서 비교하는 타입에서 추론하는 방법을 제공합니다. 예를 들어 색인된 접근 타입으로 **수동으로** 가져오는 대신, `Flatten`에서 요소 타입을 추론할 수 있습니다.

```ts twoslash
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

여기서는 참 분기 내에서 `T`의 요소 타입을 검색하는 방법을 지정하는 대신, `infer` 키워드를 사용하여 `Item`이라는 새로운 제네릭 타입 변수를 선언적으로 도입했습니다. 이렇게 하면 관심 있는 타입의 구조를 파헤치고 조사하는 방법에 대해 생각할 필요가 없어집니다.

`infer` 키워드를 사용하여 유용한 도우미 타입 별칭을 작성할 수 있습니다. 예를 들어 간단한 경우에는 함수 타입에서 반환 타입을 추출할 수 있습니다.

```ts twoslash
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;
//   ^?

type Str = GetReturnType<(x: string) => string>;
//   ^?

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
//   ^?
```

다중 호출 시그니처가 있는 타입(예: 다중 정의된 함수의 타입)에서 추론할 때는 **마지막** 시그니처(아마도 가장 허용적이고 포괄적인 것)에서 추론이 이뤄집니다. 인수 타입 목록을 기반으로 다중 정의 확인을 수행하는 것은 불가능합니다.

```ts twoslash
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
//   ^?
```

## 배분적 조건부 타입

조건부 타입이 제네릭 타입에 작용할 때, 합집합 타입이 주어지면 해당 타입은 **배분적**이게 됩니다. 예를 들어 다음과 같은 경우가 있습니다.

```ts twoslash
type ToArray<Type> = Type extends any ? Type[] : never;
```

합집합 타입을 `ToArray`에 연결하면, 합집합의 각 멤버에 조건부 타입이 적용됩니다.

```ts twoslash
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
//   ^?
```

여기서 `StrArrOrNumArr`은 다음을 배분합니다.

```ts twoslash
type StrArrOrNumArr =
  // ---cut---
  string | number;
```

합집합의 각 멤버 타입에 다음과 같이 효과적으로 매핑합니다.

```ts twoslash
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr =
  // ---cut---
  ToArray<string> | ToArray<number>;
```

그 결과는 다음과 같습니다.

```ts twoslash
type StrArrOrNumArr =
  // ---cut---
  string[] | number[];
```

일반적으로 배분성은 원하는 동작입니다. 이 동작을 막으려면 `extends` 키워드의 양쪽을 대괄호로 묶을 수 있습니다.

```ts twoslash
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// StrArrOrNumArr은 더 이상 합집합이 아닙니다.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
//   ^?
```
