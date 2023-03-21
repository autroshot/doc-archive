---
sidebar_position: 6
---

# 널 같은 값 병합 연산자

널 같은 값 병합 연산자(nullish coalescing operator) `??`를 사용하면 여러 피연산자 중 그 값이 확정되어 있는 변수를 찾을 수 있다. `null` 또는 `undefined`가 아닌 값을 왼쪽부터 찾는다.

모든 피연산자가 `null` 또는 `undefined`이면 가장 오른쪽 피연산자를 반환한다.

구문:

```js
leftExpr ?? rightExpr
```

예시:

```js
let firstName = null;
let lastName = undefined;
let nickName = '바이올렛';

console.log(firstName ?? lastName ?? nickName ?? '익명의 사용자'); // 바이올렛
```

만약 세 변수 모두 값이 없다면 `익명의 사용자`가 출력된다.

