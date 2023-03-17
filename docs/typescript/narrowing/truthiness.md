---
sidebar_position: 2
---

# 참 같은 값

**참 같은 값(truthiness 또는 truthy)**이라는 용어는 자바스크립트에서 많이 볼 수 있습니다.

자바스크립트에서는 조건문에 `&&`, `||`, `if`문, 불린 부정(`!`) 같은 표현식을 사용할 수 있습니다.

예를 들어 `if`문은 조건이 `boolean` 타입이 아니어도 됩니다.

```ts
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```

자바스크립트에서 `if` 같은 구조는 먼저 조건을 `boolean`으로 강제(형 변환)하고, 결과가 `true`인지 `false`인지에 따라 분기를 선택합니다.

- `0`
- `NaN`
- `""` (빈 문자열)
- `0n` (`0`의 `bigint` 버전)
- `null`
- `undefined`

위의 값들은 `false`로 강제되고 이외의 값은 `true`로 강제됩니다.

어떤 값에 `Boolean` 함수를 사용하거나, 더 짧은 이중 불린 부정(`!!`)을 사용해서 값을 `boolean`으로 강제할 수 있습니다. 전자는 타입스크립트가 값을 `boolean` 타입으로 추론합니다. 반면 후자는 값을 좁은 리터럴 불린 타입인 `true`로 추론한다는 이점이 있습니다.

```ts
// 둘 다 true가 됩니다.
Boolean("hello"); // 타입: boolean, 값: true
!!"world"; // 타입: true, 값: true
```

특히 `null`이나 `undefined` 같은 값을 차단할 때 이를 많이 활용하곤 합니다.

예시로 `printAll` 함수에 활용해 보겠습니다.

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

`strs`이 참 같은 값인지 확인하여 앞의 오류를 제거했습니다. 적어도 다음과 같은 두려운 오류가 발생하는 것을 방지해 줍니다.

```
TypeError: null is not iterable
```

원시값에 대한 참 같은 값 검사는 오류가 발생하기 쉽다는 점을 명심하세요.

예를 들어 `printAll` 함수를 다음과 같이 작성할 수 있습니다.

```ts
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!
  // 따라하지 마세요.
  // 예시일 뿐입니다.
  // !!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

함수의 본문을 참 같은 값 확인으로 감쌌지만 여기에는 미묘한 단점이 존재합니다. 빈 문자열을 올바르게 처리하지 못합니다.

여기서 타입스크립트는 전혀 문제가 되지 않지만 자바스크립트에 익숙하지 않다면 주의할 필요가 있습니다. 타입스크립트는 버그를 초기에 잡는 데 도움이 될 수 있지만, 값을 가지고 아무것도 하지 않는 경우에는 지나치게 규범적일 뿐입니다. 원한다면 린터로 이러한 상황을 처리할 수 있습니다.

마지막으로 불린 부정(`!`)은 부정 분기를 걸러냅니다.

```ts
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

## 동등성으로 좁히기

타입스크립트는 `switch`문과 `===`, `!==`, `==`, `!=` 같은 동등성 검사를 이용해 타입을 좁힙니다.

예시:

```ts
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 이제 x나 y의 모든 문자열 메서드를 호출할 수 있습니다.
    // (method) String.toUpperCase(): string
    x.toUpperCase();
    // (method) String.toLowerCase(): string
    y.toLowerCase();
  } else {
    // (parameter) x: string | number
    console.log(x);
    // (parameter) y: string | boolean
    console.log(y);
  }
}
```

위의 예시에서 `x`와 `y`가 동일하다는 것을 확인할 때, 타입스크립트는 둘의 타입도 동일하다는 것을 압니다. `x`와 `y`의 유일한 공통 타입이 `string`이므로 타입스크립트는 첫 번째 분기의 `x`와 `y`가 `string`이라는 것을 압니다.

변수가 아닌 특정 리터럴 값에 대한 검사에서도 동일하게 작동합니다. 참 같은 값으로 좁히기 섹션에서 `printAll` 함수가 빈 문자열을 제대로 처리하지 않아서 오류가 발생하기 쉽다고 얘기했습니다. 다음과 같이 `null`을 차단하는 특정 검사를 수행하여 타입스크립트가 `strs`의 타입에서 `null`을 올바르게 제거할 수 있습니다.

```ts
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      // (parameter) strs: string[]
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      // (parameter) strs: string
      console.log(strs);
    }
  }
}
```

자바스크립트의 느슨한 동등성 검사인 `==`와 `!=`로도 올바르게 좁힐 수 있습니다. 어떤 값을 `== null`로 확인하는 것은 `null`뿐만 아니라 `undefined`도 확인합니다. `== undefined`도 동일합니다. 값이 `null`이나 `undefined`인지 확인합니다.

```ts
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // 타입에서 null과 undefined를 모두 제거합니다.
  if (container.value != null) {
    // (property) Container.value: number
    console.log(container.value);

    // 이제 container.value를 안전하게 곱할 수 있습니다.
    container.value *= factor;
  }
}
```

## `in` 연산자로 좁히기

자바스크립트에는 객체에 해당 이름을 가진 프로퍼티가 있는지 확인하는 `in` 연산자가 있습니다. 타입스크립트는 잠재적 타입을 좁히는 방법으로 이 연산자를 사용합니다.

예를 들어 `"value" in x`에서  `"value"`는 문자열 리터럴이고 `x`는 합집합 타입이라고 가정해 보겠습니다. `true` 분기는 선택적 또는 필수 `value` 프로퍼티를 가진 `x` 타입으로 좁히고, `false` 분기는 선택적 `value` 프로퍼티 또는 해당 프로퍼티가 없는 타입으로 좁힙니다.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

선택적 프로퍼티는 좁히기를 위해 양쪽에 존재합니다.

예를 들어 사람은 수영과 비행(올바른 장비를 사용한다면)이 모두 가능하므로 `in` 확인의 양쪽 모두에 나타나야 합니다.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    // (parameter) animal: Fish | Human
    animal;
  } else {
    // (parameter) animal: Bird | Human
    animal;
  }
}
```

## `instanceof`로 좁히기

자바스크립트에는 해당 값이 다른 값의 **인스턴스**인지 확인하는 연산자가 있습니다. 보다 구체적으로 자바스크립트의 `x instanceof Foo`는 `x`의 프로퍼티 체인에 `Foo.prototype`가 포함되는지 확인합니다.

나중에 클래스에서 자세히 다룰 것이지만 `new`로 만들어지는 대부분의 값에 이 연산자가 유용합니다. 예상했듯이 `instanceof`도 타입 가드이며 타입스크립트는 `instanceof`로 차단되는 분기를 좁힙니다.

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // (parameter) x: Date
    console.log(x.toUTCString());
  } else {
    // (parameter) x: string
    console.log(x.toUpperCase());
  }
}
```

## 할당

앞에서 언급한 것처럼, 변수에 할당할 때 타입스크립트는 할당의 오른쪽을 보고 왼쪽을 적절하게 좁힙니다.

```ts
// let x: string | number
let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;

// let x: number
console.log(x);
x = "goodbye!";

// let x: string
console.log(x);
```

각 할당이 유효한 것을 확인할 수 있습니다. 관찰된 `x`의 타입을 첫 할당 이후에 `number`로 바꿨음에도, 여전히 `x`에 `string`을 할당할 수 있습니다. 그 이유는 처음에 `x`의 **선언된 타입**이 `string | number`이기 때문입니다. 할당 가능 여부는 항상 선언된 타입으로 확인됩니다.

`x`에 `boolean`을 할당하면 선언된 타입의 일부가 아니므로 오류가 발생합니다.

```ts
// let x: string | number
let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;

// let x: number
console.log(x);
// 오류: Type 'boolean' is not assignable to type 'string | number'.
x = true;

// let x: string | number
console.log(x);
```

## 제어 흐름 분석

지금까지 몇 가지 예를 통해 타입스크립트가 특정 분기 내에서 어떻게 좁혀지는지 살펴봤습니다. 하지만 단순히 모든 변수에서 거슬러 올라가서 `if`, `while`, 조건문 등을 찾는 것이 아닙니다.

다음 예시를 통해 알아보겠습니다.

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

`padLeft`는 첫 `if` 차단에서 반환됩니다. 타입스크립트는 이 코드를 분석해 `padding`이 `number`이면 본문의 나머지 부분(`return padding + input;`)에 **도달할 수 없다**는 것을 알 수 있습니다. 그 결과 해당 부분에서는 `padding`의 `number` 타입이 제거됩니다. 즉, `string | number`에서 `string`으로 좁힙니다.

도달 가능 여부에 기반하는 이러한 코드 분석을 **제어 흐름 분석**이라고 부릅니다. 타입스크립트는 타입 가드나 할당을 만날 때 이 흐름 분석을 사용해 타입을 좁힙니다. 변수를 분석할 때 제어 흐름이 분리되었다가 다시 병합될 수 있으며, 변수는 각 지점에서 다른 타입으로 관찰될 수 있습니다.

```ts
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  // let x: boolean
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    // let x: string
    console.log(x);
  } else {
    x = 100;
    // let x: number
    console.log(x);
  }

  // let x: string | number
  return x;
}
```

## 타입 단언 사용하기

지금까지 좁히기를 위해 기존 자바스크립트 구문을 이용했지만 때로는 타입 변경을 직접적으로 제어하고 싶을 때가 있습니다.

사용자 정의 타입 가드를 사용하려면 다음과 같이 반환 타입이 **타입 단언(type predicate)**인 함수를 정의하면 됩니다.

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

이 예시에서 `pet is Fish`가 타입 단언입니다. 단언은 `parameterName is Type`의 형식을 가집니다. 여기서 `parameterName`은 현재 함수 시그니처의 매개변수 이름이어야 합니다.

`isFish`에 기존 타입과 호환되는 어떤 변수를 건네주면 타입스크립트는 해당 변수를 특정 타입으로 좁힙니다.

```ts
// 이제 swim과 fly 호출이 모두 가능합니다.
let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

타입스크립트는 `if` 분기 안에서 `pet`이 `Fish`라는 것을 압니다. 그리고 `else` 분기 안에서 `pet`이 `Fish`가 아니므로 `Bird`라는 것을 압니다.

다음과 같이 `isFish` 타입 가드를 이용해 `Fish | Bird` 배열을 필터링해서 `Fish` 배열을 얻는 것도 가능합니다.

```ts
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// 위와 동일합니다.
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// 더 복잡한 예시를 위해 단언을 반복할 수 있습니다.
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

추가로 클래스는 [`this is Type`](../classes/this-types.md#this-기반-타입-가드)을 사용해 타입을 좁힐 수 있습니다.