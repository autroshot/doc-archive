---
sidebar_position: 2
---

# 호출 시그니처

자바스크립트에서 함수는 호출 가능할 뿐만 아니라 프로퍼티를 가질 수 있습니다. 그러나 함수 타입 표현식 구문은 프로퍼티 선언을 허용하지 않습니다.

프로퍼티가 있고 호출 가능한 것을 묘사하려면 다음과 같이 객체 타입으로 **호출 시그니처**를 작성할 수 있습니다.

```ts twoslash
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

함수 타입 표현식과 구문이 약간 다른 것을 알 수 있습니다. 매개변수 목록과 반환 타입 사이에 `=>`가 아닌 `:`을 사용했습니다.