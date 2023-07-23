---
sidebar_position: 2
---

# 타입 확장하기

다른 타입의 보다 구체적인 타입을 만드는 것은 매우 흔합니다.

예를 들어 미국에서 편지와 소포를 보낼 때 필요한 필드를 묘사하는 `BasicAddress` 타입이 있다고 가정해 보겠습니다.

```ts twoslash
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

일부 상황에서는 이것만으로 충분하지만 주소에 연결된 단위 번호가 존재하는 경우가 있습니다. 그러면 다음과 같이 `AddressWithUnit`으로 묘사할 수 있습니다.

```ts twoslash
interface AddressWithUnit {
  name?: string;
  unit: string;
//^^^^^^^^^^^^^
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

`AddressWithUnit`의 문제는 `BasicAddress`의 모든 필드가 반복된다는 것입니다. 이는 변경 사항이 순전히 추가 사항이기 때문입니다.

대신 다음과 같이 기존 `BasicAddress` 타입을 확장하고 `AddressWithUnit`만의 새 필드를 추가할 수 있습니다.

```ts twoslash
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

`interface`의 `extends` 키워드를 사용하면 다른 명명된 타입의 멤버를 효과적으로 복사하고 새 멤버를 추가할 수 있습니다. 이는 새로 작성해야 하는 타입 선언 상용구의 양을 줄입니다. 그리고 동일한 프로퍼티의 여러 다른 선언이 관련될 수 있다는 의도를 전달할 수 있습니다.

예를 들어 `AddressWithUnit`는 `street` 프로퍼티를 반복할 필요가 없습니다. 그리고 `street`가 `BasicAddress`에서 유래했기 때문에 두 타입이 어떤 식으로든 관련이 있음을 알 수 있습니다.

`interface`는 복수의 타입에서 확장할 수도 있습니다.

```ts twoslash
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```
