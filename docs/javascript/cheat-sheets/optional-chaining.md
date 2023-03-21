---
sidebar_position: 5
---

# 선택적 연쇄

선택적 연쇄(optional chaining) `?.`를 사용하면 중간 프로퍼티가 존재하지 않는 경우에도 중첩된 객체의 프로퍼티에 안전하게 접근할 수 있다.

`?.`는 왼쪽에 있는 평가 대상이 `null` 또는 `undefined`이면 평가를 멈추고 `undefined`를 반환한다.

구문:

```
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
```

예시:

```js
const user = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

console.log(user.dog?.name); // undefined
console.log(user.nonExistentMethod?.()); // undefined
```

