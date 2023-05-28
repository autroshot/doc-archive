---
sidebar_position: 6
---

# 매핑된 타입

중복을 없애기 위해 한 타입이 다른 타입에 기반해야 할 때도 있습니다.

매핑된 타입은 사전에 선언되지 않은 프로퍼티의 타입을 선언하는 데 사용되는 색인 시그니처의 구문을 기반으로 합니다.

```ts
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

매핑된 타입은 타입을 생성하기 위해 `PropertyKey`(주로 [`keyof`](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)로 생성됨)의 합집합을 사용하여 키를 순회하는 제네릭 타입입니다.

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

이 예시에서 `OptionsFlags`는 `Type` 타입에서 모든 프로퍼티를 가져오고 해당 값을 불린으로 변경합니다.

```ts
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
type FeatureOptions = OptionsFlags<FeatureFlags>;
```

### 매핑 수정자

매핑 중에 적용할 수 있는 두 가지 추가 수정자가 있습니다. `readonly`와 `?`는 각각 가변성과 선택성에 영향을 줍니다.

`-` 또는 `+` 접두사를 붙여 이러한 수정자를 제거하거나 추가할 수 있습니다. 접두사를 명시하지 않으면 `+`로 간주됩니다.

```ts
// 타입의 프로퍼티에서 readonly 속성을 제거합니다.
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

// type UnlockedAccount = {
//   id: string;
//   name: string;
// }
type UnlockedAccount = CreateMutable<LockedAccount>;
```

```ts
// 타입의 프로퍼티에서 optional 속성을 제거합니다.
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

// type User = {
//   id: string;
//   name: string;
//   age: number;
// }
type User = Concrete<MaybeUser>;
```

## `as`로 키를 다시 매핑하기

타입스크립트 4.1 이상에서는 매핑된 타입에서 `as` 절을 사용하여 매핑된 타입의 키를 다시 매핑할 수 있습니다.

```ts
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
```

[템플릿 리터럴 타입](./template-literal-types.md) 같은 기능을 활용하여 이전 프로퍼티 이름에서 새 프로퍼티 이름을 만들 수 있습니다.

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
type LazyPerson = Getters<Person>;
```

조건부 타입을 통해 `never`를 생성하여 키를 필터링할 수 있습니다.

```ts
// kind 프로퍼티를 제거합니다.
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
    kind: "circle";
    radius: number;
}

// type KindlessCircle = {
//   radius: number;
// }
type KindlessCircle = RemoveKindField<Circle>;
```

`string | number | symbol`의 합집합뿐만 아니라 모든 타입의 합집합을 임의의 합집합에 매핑할 수 있습니다.

```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// }
type Config = EventConfig<SquareEvent | CircleEvent>
```

### 더 알아보기

매핑된 타입은 이 타입 조작 부분의 다른 기능과 같이 사용할 수 있습니다.

예를 들어 다음은 [조건부 타입](./conditional-types.md)을 사용하는 매핑된 타입입니다. 객체의 `pii` 프로퍼티가 리터럴 `true`로 설정되었는지 여부에 따라 `true` 또는 `false`를 반환합니다.

```ts
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

// type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
```

