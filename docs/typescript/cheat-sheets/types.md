---
sidebar_position: 3
---

# 타입

전체 이름은 **타입 별칭**이며 타입 리터럴에 이름을 제공하는 데 사용됩니다.

인터페이스보다 더 풍부한 타입 시스템 기능을 지원합니다.

## 타입

### 타입 vs 인터페이스

- 인터페이스는 객체의 모양만 묘사
- 인터페이스는 여러 번 선언해서 확장 가능
- 성능이 중요한 유형에서는 인터페이스 비교 검사가 더 빠를 수 있음

### 타입을 변수처럼 생각하기

다른 범위에서 동일한 이름을 갖는 변수를 선언하는 방법과 마찬가지로 타입도 유사한 의미론을 갖습니다.

### 유틸리티 타입 이용하기

타입스크립트에는 타입 시스템에서 일반적인 작업을 수행하는 데 도움이 되는 많은 전역 타입이 포함되어 있습니다. 자세한 내용은 사이트의 [문서](https://www.typescriptlang.org/ko/docs/handbook/utility-types.html)를 확인하세요.

## 객체 리터럴 구문

```ts
type JSONResponse = {
  version: number;                      // 필드

  /** 바이트 단위 */                    // 첨부 문서
  payloadSize: number;

  outOfStock?: boolean;                 // 선택적

  update: (retryTimes: number) => void; // 화살표 함수 필드
  update(retryTimes: number): void;     // 함수

  (): JSONResponse;                     // 타입은 호출 가능

  [key : string]: number;               // 모든 색인 허용

  new (s: string): JSONResponse;        // new 사용 가능

  readonly body : string;               // 읽기 전용 프로퍼티
}
```

자세한 내용은 [인터페이스 치트 시트](./interfaces.md)를 참고하세요.

## 원시 타입

주로 문서화에 유용합니다.

```ts twoslash
type SanitizedInput = string;
type MissingNo = 404;
```

## 객체 리터럴 타입

```ts twoslash
// @noLib
type Location = {
  x: number;
  y: number;
}
```

## 튜플 타입

튜플은 특정 색인에 고정된 타입이 있는 특별한 배열입니다.

```ts twoslash
// @noLib
type Location = {
  x: number;
  y: number;
}
// ---cut---
type Data = [
  location: Location,
  timestamp: string
]
```

## 합집합 타입

고정된 문자열 목록과 같이 여러 옵션을 가지는 타입을 묘사합니다.

```ts twoslash
type Size = "small" | "medium" | "large";
```

## 교집합 타입

타입을 병합하거나 확장하는 방법입니다.

```ts twoslash
// @noLib
type Location = { x: number } & { y: number };
```

## 타입 인덱싱

타입의 하위 집합에서 추출하고 이름을 지정하는 방법입니다.

```ts twoslash
// @noLib
type Response = { data: string };

type Data = Response["data"];
//   ^?
```

## 값에서 타입 가져오기

`typeof` 연산자를 이용해 기존 자바스크립트 런타임 값의 타입을 재사용합니다.

```ts twoslash
const person = { name: 'Alex', age: 20 };

type Person = typeof person;
//   ^?
```

## 함수 반환에서 타입 가져오기

함수의 반환값을 타입으로 재사용합니다.

```ts twoslash
const createPerson = () => { 
  return { name: 'Alex', age: 20 }
};

type Person = ReturnType<typeof createPerson>;
//   ^?
```

## 모듈에서 타입 가져오기

```ts
const data: import("./data").data
```

------

다음 기능들은 기존 자바스크립트 코드를 설명하는 라이브러리를 만드는 데 유용하며, 대부분의 타입스크립트 앱에서는 사용할 일이 거의 없습니다.

## 매핑된 타입

입력 타입이 새 타입의 구조를 변경 가능하게 만듭니다.

```ts twoslash
type Artist = { name: string, bio: string };

type Subscriber<Type> = {
  // 타입 제네릭 매개변수 Type의 필드를 순회합니다.
  [Property in keyof Type]:
    // 매개변수가 기존 타입인 함수로 타입을 설정합니다.
    (newValue: Type[Property]) => void
};

type ArtistSub = Subscriber<Artist>;
//   ^?
```

## 조건부 타입

타입 시스템 내에서 `if`문처럼 작동합니다. 제네릭을 통해 생성된 다음 타입 합집합의 옵션 수를 줄이는 데 많이 사용됩니다.

```ts twoslash
interface FourLegs {
  legs: 4
}

interface Bird {
  legs: 2
}
interface Dog {
  legs: 4
}
interface Ant {
  legs: 6
}
interface Wolf {
  legs: 4
}
// ---cut---
type HasFourLegs<Animal> =
  Animal extends { legs: 4 } ? Animal : never;

type Animals = Bird | Dog | Ant | Wolf;

type FourLegsAnimals = HasFourLegs<Animals>;
//   ^?
```

## 템플릿 합집합 타입

템플릿 문자열을 사용해 타입 시스템 내에서 텍스트를 결합하고 조작할 수 있습니다.

```ts twoslash
type SupportedLangs = "en" | "pt" | "zh";
type FooterLocaleIDs = "header" | "footer";

type AllLocaleIDs = `${SupportedLangs}_${FooterLocaleIDs}_id`;
//   ^?
```

