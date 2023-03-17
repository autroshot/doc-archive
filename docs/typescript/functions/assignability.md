---
sidebar_position: 10
---

# 할당 가능성

## 반환 타입 `void`

함수의 `void` 반환 타입은 비정상적이지만 예상되는 행동을 만들 수 있습니다.

반환 타입이 `void`인 문맥적 타이핑은 함수가 무언가를 반환하지 않도록 **강제하지 않습니다**. 이를 `void` 반환 타입(`type vf = () => void`)을 갖는 문맥적 함수 타입이라고 볼 수 있습니다. 함수는 구현될 때 모든 값을 반환할 수 있지만 해당 값은 무시됩니다.

따라서 `() => void` 타입의 다음 구현은 유효합니다.

```ts
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
```

그리고 이 함수의 반환값을 다른 변수에 할당할 때는 `void` 타입이 유지됩니다.

```ts
const v1 = f1();
 
const v2 = f2();
 
const v3 = f3();
```

이 특성 때문에 `Array.prototype.push`가 숫자를 반환하고 `Array.prototype.forEach` 메서드가 반환 타입이 `void`인 함수를 기대함에도 다음 코드가 유효한 것입니다.

```ts
const src = [1, 2, 3];
const dst = [0];
 
src.forEach((el) => dst.push(el));
```

리터럴 함수 정의에 `void` 반환 타입이 있으면 해당 함수는 아무것도 반환하지 **않아야** 합니다.

```ts
function f2(): void {
  // @ts-expect-error
  return true;
}
 
const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

`void`에 대한 자세한 내용은 다음 문서 항목을 참조하세요.

- [안내서](#void)
- [자주 묻는 질문 - “void를 반환하는 함수가 void가 아닌 값을 반환하는 함수에 할당 가능한 이유는 무엇인가요?”](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)

