---
sidebar_position: 7
---

# 합집합 타입

타입스크립트의 타입 시스템에서는 다양한 연산자를 사용하여 기존 타입에서 새로운 타입을 만들 수 있습니다. 이제 몇 가지 타입을 작성하는 방법을 알았으므로 타입을 흥미로운 방식으로 **결합**할 차례입니다.

## 합집합 타입 정의하기

타입을 결합하는 첫 번째 방법은 **합집합** 타입입니다. 합집합 타입은 두 개 이상의 다른 타입으로 구성된 타입으로, 해당 타입 중 **하나**가 될 수 있는 값을 나타냅니다. 여기서 각 타입을 조합의 **멤버**라고 부릅니다.

문자열이나 숫자를 받을 수 있는 함수를 작성해 보겠습니다.

```ts twoslash
// @errors: 2345
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// 문제없습니다.
printId(101);
// 문제없습니다.
printId("202");
// 오류가 발생합니다.
printId({ myID: 22342 });
```

## 합집합 타입으로 작업하기

합집합 타입과 일치하는 값을 **제공**하는 것은 쉽습니다. 합집합의 멤버와 일치하는 타입을 제공하기만 하면 됩니다. 합집합 타입의 값이 생겼다면 사용을 어떻게 할까요?

타입스크립트는 합집합의 **모든** 멤버에 대해 유효한 경우에만 연산을 허용합니다. 예를 들어 합집합 `string | number`인 경우, `string`에서만 사용할 수 있는 메서드는 사용할 수 없습니다.

```ts twoslash
// @errors: 2339
function printId(id: number | string) {
  console.log(id.toUpperCase());
}
```

해결책은 타입 주석이 없는 자바스크립트에서 사용하는 방법과 동일하게, 코드로 합집합을 **좁히는** 것입니다. **좁히기(narrowing)**는 타입스크립트가 코드 구조를 기반으로 값에 대해 보다 구체적인 타입을 추론할 수 있을 때 발생합니다.

예를 들어 타입스크립트는 `typeof` 값으로 `"string"`을 갖는 것은 `string`뿐이라는 것을 알고 있습니다.

```ts twoslash
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서 id는 string 타입입니다.
    console.log(id.toUpperCase());
  } else {
    // 여기서 id는 number 타입입니다.
    console.log(id);
  }
}
```

또 다른 예는 `Array.isArray`와 같은 함수를 사용하는 것입니다.

```ts twoslash
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기서 x는 'string[]'입니다.
    console.log("Hello, " + x.join(" and "));
  } else {
    // 여기서 x는 string입니다.
    console.log("Welcome lone traveler " + x);
  }
}
```

`else` 분기에서는 특별한 작업을 수행할 필요가 없습니다. `x`가 `string[]`이 아니면 `string`이기 때문입니다.

때로는 모든 멤버가 공통 요소를 가진 합집합이 있을 수 있습니다. 예를 들어 배열과 문자열에는 모두 `slice` 메서드가 있습니다. 합집합의 모든 멤버가 공통 프로퍼티를 가지고 있는 경우, 좁히기를 사용하지 않고 해당 프로퍼티를 사용할 수 있습니다.

```ts twoslash
// 반환 타입은 'number[] | string'으로 추론됩니다.
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

:::note 참고

타입의 **합집합**이 해당 타입 프로퍼티의 **교집합**을 갖는 것이 혼란스러울 수 있습니다. 이는 우연이 아닙니다. 합집합(union)이라는 이름은 유형 이론(type theory)에서 유래했습니다. 합집합 `number | string`은 각 타입에서 **값**의 합집합을 취하여 구성됩니다. 각 집합에 해당하는 사실이 있는 두 집합이 주어지면, 해당 사실의 교집합만 집합 자체의 합집합에 적용됩니다.

예를 들어, 모자를 쓴 키 큰 사람들의 방과 모자를 쓴 스페인어 사용자들의 방이 있다고 가정해 보겠습니다. 이 방들을 합친 후 **모든** 사람에 대해 알 수 있는 유일한 정보는 그들이 모자를 쓰고 있다는 것입니다.

:::