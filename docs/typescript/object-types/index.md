# 객체 타입

자바스크립트에서 데이터를 그룹화하고 전달하는 기본적인 방법은 객체를 이용하는 것입니다. 타입스크립트에서는 **객체 타입**을 이용합니다.

객체는 다음과 같이 익명일 수 있습니다.

```ts {0}
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

또는 인터페이스를 사용하여 이름을 지정할 수 있습니다.

```ts {0}
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

또는 타입 별칭일 수 있습니다.

```ts {0}
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

위의 세 가지 예시 모두 프로퍼티 `name`(`string`이어야 함)과 `age`(`number`여야 함)가 포함된 객체를 사용하는 함수를 작성했습니다.