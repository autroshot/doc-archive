---
sidebar_position: 1
---

# 배열과 메서드

## 길이

`arr.length`로 배열의 길이를 얻을 수 있다.

`arr.length = 0`으로 배열을 간단하게 비우는 것이 가능하다.

## 병합

전개 문법을 활용한다.

```js
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e', 'f'];

const mergedArr = [...arr1, ...arr2];
```

또는 [`array.concat()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)을 사용할 수 있다.

## for문

예시:

```js
const arr = ['사과', '오렌지', '배'];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

인덱스가 필요한 상황이 아니라면 `forEach` 메서드를 사용한다.

## 메서드

자주 사용되는 배열 메서드는 다음과 같다.

### `forEach`

각 요소에 대해 콜백 함수를 실행한다.

문법:

```js
arr.forEach(callback(value[, index[, array]])[, thisArg])
```

예시:

```js
const array = ['a', 'b', 'c'];

array.forEach(element => console.log(element));
// a
// b
// c
```

### `map`

콜백 함수의 실행 결과로 이루어진 새로운 배열을 만든다.

문법:

```js
arr.map(callback(value[, index[, array]])[, thisArg])
```

예시:

```js
const array = [1, 4, 9, 16];

const map = array.map((x) => x * 2);

console.log(map); // [2, 8, 18, 32]
```

### `reduce`

반환값이 다음 요소에 전달된다.

문법:

```js
arr.reduce(callback(accumulator, value[, index[, array]])[, initialValue])
```

`initialValue`는 선택 사항이지만 항상 명시하는 것이 좋다.

예시:

```js
const arr = [1, 2, 3, 4, 5];

const result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

### `includes`

특정 요소가 포함되어 있는지 판별한다. 판별에서 일치 연산자(`===`)를 사용한다.

문법:

```js
arr.includes(valueToFind[, fromIndex])
```

예시:

```js
const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat')); // true
console.log(pets.includes('at')); // false
```

### `filter`

조건에 해당하는 요소로 이루어진 배열을 만든다.

문법:

```js
arr.filter(callback(value[, index[, array]])[, thisArg])
```

예시:

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result); // ['exuberant', 'destruction', 'present']
```

### `sort`

:::caution

이 메서드는 원본 배열이 보존되지 않는다.

:::

요소를 정렬한다.

정렬 함수를 지정하지 않으면 문자의 유니코드 값에 따라 정렬된다.

오름차순으로 정렬하려면 `a`가 `b`보다 클 때 양수를 반환하면 된다.

문법:

```js
arr.sort([compare(a, b)])
```

예시:

```js
const arr = [4, 2, 5, 1, 3];

arr.sort((a, b) => a - b);

console.log(arr);  // [1, 2, 3, 4, 5]
```

### `some`

조건에 해당하는 요소가 하나라도 있는지 확인한다.

해당 요소를 발견하면 즉시 `true`를 반환한다.

문법:

```js
arr.some(callback(value[, index[, array]])[, thisArg])
```

예시:

```js
const arr = [1, 2, 3, 4, 5];

const result = arr.some((element) => element % 2 === 0);

console.log(result); // true
```

### `every`

모든 요소가 조건에 해당하는지 확인합니다.

조건에 해당되지 않는 요소를 발견하면 즉시 `false`를 반환한다.

문법:

```js
arr.every(callback(value[, index[, array]])[, thisArg])
```

예시:

```js
const arr = [1, 30, 39, 29, 10, 13];

const result = arr.every((value) => value < 40);

console.log(result); // true
```

기타 메서드는 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4_%EB%A9%94%EC%84%9C%EB%93%9C)을 참고한다.