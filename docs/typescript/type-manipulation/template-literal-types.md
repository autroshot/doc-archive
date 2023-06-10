---
sidebar_position: 7
---

# 템플릿 리터럴 타입

템플릿 리터럴 타입은 [문자열 리터럴 타입](../everyday-types/literal-types.md)을 기반으로 하며 합집합을 통해 많은 문자열로 확장할 수 있습니다.

템플릿 리터럴 타입은 [자바스크립트의 템플릿 리터럴 문자열](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)과 구문이 동일하지만, 타입 위치에서 사용됩니다. 구체적인 리터럴 타입과 함께 사용하면, 템플릿 리터럴은 내용을 연결하여 새로운 문자열 리터럴 타입을 생성합니다.

```ts twoslash
type World = "world";

type Greeting = `hello ${World}`;
//   ^?
```

보간 위치에서 합집합을 사용하는 경우, 타입은 각 합집합 멤버가 나타낼 수 있는 가능한 모든 문자열 리터럴의 집합입니다.

```ts twoslash
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
//   ^?
```

템플릿 리터럴의 보간된 각 위치에 대해 합집합이 교차 곱해집니다.

```ts twoslash
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
// ---cut---
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
//   ^?
```

일반적으로 대규모 문자열 합집합에서는 사전(ahead-of-time, AOT) 생성을 사용하는 것이 좋지만, 소규모 사례에서는 템플릿 리터럴 타입이 유용합니다.

## 타입의 문자열 합집합

템플릿 리터럴의 힘은 타입 내부의 정보를 기반으로 새 문자열을 정의할 때 발휘됩니다.

전달된 객체에 `on()`이라는 새 함수를 추가하는 함수(`makeWatchedObject`)를 생각해 보겠습니다. 자바스크립트에서의 호출은 `makeWatchedObject(baseObject)`와 같을 것입니다. 우리는 기본 객체가 다음과 같다고 상상할 수 있습니다.

```ts twoslash
// @noErrors
const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};
```

기본 객체에 추가될 `on` 함수는 `eventName`(`string`) 및 `callBack`(`function`)이라는 두 개의 인수를 받습니다.

`eventName`은 `attributeInThePassedObject + Changed` 형식이어야 합니다. 따라서 `eventName`은 기본 객체의 프로퍼티 `firstName`에서 파생된 `firstNameChanged`입니다.

`callBack` 함수는 호출 시 다음과 같아야 합니다.

- 이름 `attributeInThePassedObject`와 관련된 타입의 값을 전달해야 합니다. 따라서 `firstName`은 `string`으로 입력되므로 `firstNameChanged` 이벤트에 대한 콜백은 호출 시 `string`이 전달될 것으로 기대합니다. 마찬가지로 `age`와 관련된 이벤트는 `number` 인수로 호출되어야 합니다.
- 반환 타입이 `void`이어야 합니다. (간단한 설명을 위해)

따라서 `on()`의 단순한 함수 시그니처는 `on(eventName: string, callBack: (newValue: any) => void)`일 수 있습니다. 그러나 앞의 설명에서 우리는 코드에 기록하고 싶은 중요한 타입 제약 조건을 식별했습니다. 템플릿 리터럴 타입을 사용하면 이러한 제약 조건을 코드로 가져올 수 있습니다.

```ts twoslash
// @noErrors
declare function makeWatchedObject(obj: any): any;
// ---cut---
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

// makeWatchedObject가 익명 객체에 on을 추가했습니다.

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
```

`on`은 `firstName`뿐만 아니라 `firstNameChanged` 이벤트를 수신합니다. 적격한 이벤트 이름 집합이 감시되는 객체의 프로퍼티 이름의 합집합에 의해 제한되고 끝에 `Changed`가 추가되게 하면, `on()`의 단순한 사양이 더 강력해질 수 있습니다. 우리는 자바스크립트에서 이러한 계산을 하는 것에 익숙합니다. (예: ``Object.keys(passedObject).map(x => `${x}Changed`)`` 하지만 **타입 시스템 내부**의 템플릿 리터럴은 문자열 조작과 유사한 접근 방식을 제공합니다.

```ts twoslash
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// on 메서드로 감시되는 객체를 생성합니다.
/// 이제 프로퍼티의 변경을 감시할 수 있습니다.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```

이를 통해 잘못된 프로퍼티가 주어졌을 때 오류가 발생하는 것을 만들 수 있습니다.

```ts twoslash
// @errors: 2345
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;
// ---cut---
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", () => {});

// 쉬운 사용자 오류 방지 (이벤트 이름 대신 키 사용)
person.on("firstName", () => {});

// 오타 방지
person.on("frstNameChanged", () => {});
```

## 템플릿 리터럴을 사용한 추론

우리는 전달된 원본 객체에 제공된 모든 정보를 활용하지는 않았습니다. `firstName`이 변경되면(예: `firstNameChanged` 이벤트) 콜백이 `string` 타입의 인수를 받을 것으로 예상해야 합니다. 마찬가지로 `age` 변경에 대한 콜백은 `number` 인수를 받아야 합니다. 우리는 `callBack`의 인수에 순진하게 `any`를 사용하고 있습니다. 다시 말하지만, 템플릿 리터럴 타입을 사용하면, 프로퍼티의 데이터 타입이 해당 프로퍼티의 콜백의 첫 번째 인수와 동일한 타입이 되도록 만들 수 있습니다.

이를 가능하게 하는 핵심 통찰력은, 다음과 같이 제네릭과 함께 함수를 사용하는 것입니다.

1. 첫 번째 인수에 사용된 리터럴은 리터럴 타입으로 캡처됩니다.
2. 해당 리터럴 타입은 제네릭에서 유효한 프로퍼티의 합집합에 있는 것으로 유효성을 검사할 수 있습니다.
3. 검증된 프로퍼티의 타입은 색인된 접근을 사용하여 제네릭 구조에서 조회할 수 있습니다.
4. 그러면 이 타입 정보는 콜백 함수에 대한 인수가 동일한 타입인지 확인하기 위해 적용될 수 있습니다.

```ts twoslash
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", newName => {
    //                        ^?
    console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {
    //                  ^?
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})
```

여기서는 `on`을 제네릭 메서드로 만들었습니다.

사용자가 문자열 `firstNameChanged`로 호출하면, 타입스크립트는 `key`에 대한 올바른 타입을 추론하려고 시도합니다. 이를 위해 `Changed` 이전의 내용과 `Key`를 일치시키고 문자열 `firstName`을 추론합니다. 이제 `on` 메서드는 원본 객체에서 `firstName`의 타입을 가져올 수 있습니다. 이 경우에는 `string`입니다. 마찬가지로 `ageChanged`로 호출하면 타입스크립트는 프로퍼티 `age`의 타입인 `number`를 찾습니다.

추론은 다양한 방식으로 결합될 수 있으며, 종종 문자열을 분해하고 다양한 방식으로 재구성할 수 있습니다.

## 내장된 문자열 조작 타입

문자열 조작을 돕기 위해 타입스크립트에는 문자열 조작에 사용할 수 있는 타입 모음이 포함되어 있습니다. 이러한 타입은 성능을 위해 컴파일러에 내장되어 있으며, 타입스크립트에 포함된 `.d.ts` 파일에서는 찾을 수 없습니다.

### `Uppercase<StringType>`

문자열의 각 문자를 대문자로 변환합니다.

예시:

```ts twoslash
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
//   ^?

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
//   ^?
```

### `Lowercase<StringType>`

문자열의 각 문자를 소문자로 변환합니다.

```ts twoslash
type Greeting = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
//   ^?

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
type MainID = ASCIICacheKey<"MY_APP">
//   ^?
```

### `Capitalize<StringType>`

문자열의 첫 번째 문자를 대문자로 변환합니다.

```ts twoslash
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
//   ^?
```

### `Uncapitalize<StringType>`

문자열의 첫 번째 문자를 소문자로 변환합니다.

```ts twoslash
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
//   ^?
```
