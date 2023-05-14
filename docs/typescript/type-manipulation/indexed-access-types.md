---
sidebar_position: 4
---

# 색인된 접근 타입

**색인된 접근 타입(indexed access type)**을 사용하여 다른 타입의 특정 프로퍼티를 조회할 수 있습니다.

```ts
type Person = { age: number; name: string; alive: boolean };
// type Age = number
type Age = Person["age"];
```

색인된 타입 자체가 타입이므로 합집합, `keyof`, 또는 기타 타입을 모두 사용할 수 있습니다.

```ts
// type I1 = string | number
type I1 = Person["age" | "name"];

// type I2 = string | number | boolean
type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
// type I3 = string | boolean
type I3 = Person[AliveOrName];
```

존재하지 않는 프로퍼티에 접근하려고 하면 오류가 표시됩니다.

```ts
// 오류: Property 'alve' does not exist on type 'Person'.
type I1 = Person["alve"];
```

임의의 타입으로 색인화하는 또 다른 예는 `number`를 사용하여 배열 요소의 타입을 가져오는 것입니다. 이를 `typeof`와 결합하여 배열 리터럴의 요소 타입을 편리하게 포착할 수 있습니다.

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

// type Person = {
//   name: string;
//   age: number;
// }
type Person = typeof MyArray[number];
// type Age = number
type Age = typeof MyArray[number]["age"];
// 또는
// type Age2 = number
type Age2 = Person["age"];
```

색인화할 때만 타입을 사용할 수 있습니다. 즉, `const`를 사용하여 변수 참조를 만들 수 없습니다.

```ts
const key = "age";
// 오류: Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
type Age = Person[key];
```

그러나 유사한 스타일의 리팩터링에 타입 별칭을 사용할 수 있습니다.

```ts
type key = "age";
type Age = Person[key];
```
