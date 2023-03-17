---
sidebar_position: 4
---

# 제네릭

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

## 추론

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

## 제약

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

## 제한된 값 사용하기

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

## 타입 인수 지정하기

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

## 좋은 제네릭 함수 작성을 위한 지침

제네릭 함수를 작성하는 것은 재미있으며 타입 매개변수에 쉽게 빠져들 수 있습니다. 타입 매개변수가 너무 많거나 필요하지 않은 제약을 사용하면 추론이 실패하고 함수 호출자에게 문제가 생길 수 있습니다.

### 타입 매개변수를 내리기

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

### 타입 매개변수를 적게 사용하기

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

### 타입 매개변수는 두 번 나타나야 한다

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