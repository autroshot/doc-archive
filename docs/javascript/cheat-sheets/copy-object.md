---
sidebar_position: 3
---

# 객체 복사하기

원시형(숫자, 문자열 등)이 아닌 객체를 복사하면 참좃값이 복사된다. 

```js
const user = { name: "John" };

const admin = user; // 참좃값이 복사된다.
```

참좃값이 아닌 실젯값을 복사하는 방법은 다음과 같다.

## 얕은 복사

전개 구문을 사용한다.

```js
const obj = { a: 1, b: 2, c: 3 };
const arr = [1, 2, 3];

const objCopy = { ...obj };
const arrCopy = [ ...arr ];
```

## 깊은 복사

`JSON.stringify()`와 `JSON.parse()`를 활용한다.

```js
const ingredientsList = ['noodles', { list: ['eggs', 'flour', 'water'] }];

const ingredientsListCopy = JSON.parse(JSON.stringify(ingredientsList));
```

이 방법에서는 함수, 심볼형, `undefined`, `Date` 등의 값이 손실되거나 변형된다.

대신 [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)이나 로대시의 [`cloneDeep`](https://lodash.com/docs#cloneDeep)을 사용할 수 있다.

