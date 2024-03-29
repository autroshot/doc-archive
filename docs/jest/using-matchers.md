---
sidebar_position: 3
---

# 매처 사용하기

제스트는 **매처(matcher)**를 사용하여 다양한 방식으로 값을 테스트할 수 있습니다.

이 문서에서는 일반적으로 사용되는 몇 가지 매처를 소개합니다. 전체 목록은 [`expect` API 문서](https://github.com/facebook/jest/blob/main/website/versioned_docs/version-29.2/ExpectAPI.md)를 확인하세요.

## 일반 매처

값을 테스트하는 가장 간단한 방법은 일치를 사용하는 것입니다.

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

이 코드에서 `expect(2 + 2)`는 **기대(expectation)** 객체를 반환합니다. 일반적으로 기대 객체에는 호출 매처를 제외하면 많은 작업을 수행하지 않습니다.

이 코드에서 `.toBe(4)`가 매처입니다. 제스트가 실행되면 모든 실패한 매처를 추적하여 멋진 오류 메시지를 출력할 수 있습니다.

`toBe`는 `Object.is`를 사용하여 일치를 확인합니다. 객체의 값을 확인하려면 대신 `toEqual`를 사용합니다.

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

`toEqual`은 객체나 배열의 모든 필드를 재귀적으로 확인합니다.

매처의 반대를 테스트할 수도 있습니다.

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## 참 같은 값

테스트에서 `undefined`, `null`, `false`를 구별해야 할 때도 있고 그러지 않을 때도 있습니다. 제스트에는 원하는 것을 명시할 수 있는 도우미가 포함되어 있습니다.

- `toBeNull`은 `null`만 일치시킴
- `toBeUndefined`는 `undefined`만 일치시킴
- `toBeDefined`는 `toBeUndefined`의 반대
- `toBeTruthy`는 `if`문이 `true`로 판단하는 모든 것과 일치시킴
- `toBeFalsy`는 `if`문이 `false`로 판단하는 모든 것과 일치시킴

예시:

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

코드에서 수행하려는 작업과 가장 정확하게 일치하는 매처를 사용해야 합니다.

## 숫자

숫자를 비교하는 대부분의 방법과 대응되는 매처가 존재합니다.

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe와 toEqual은 숫자에 대해 동일합니다.
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

부동 소수점 일치에서는 테스트에 작은 반올림 오차가 생기지 않도록 `toEqual` 대신 `toBeCloseTo`를 사용합니다.

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); // 반올림 오차 때문에 작동하지 않습니다.
  expect(value).toBeCloseTo(0.3); // 잘 작동합니다.
});
```

## 문자열

`toMatch`를 사용하면 정규 표현식으로 문자열을 확인할 수 있습니다.

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## 배열과 반복 가능한 객체

`toContain`을 사용하여 배열 또는 반복 가능한 객체(iterable)에 특정 항목이 포함되어 있는지 확인할 수 있습니다.

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```

## 예외

특정 함수가 호출될 때 오류가 발생하는지 테스트하려면 `toThrow`를 사용합니다.

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // 오류 메시지 또는 정규 표현식에 포함되어야 하는 문자열을 사용할 수도 있습니다.
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // 또는 다음과 같은 정규 표현식을 사용하여 정확한 오류 메시지를 일치시킬 수 있습니다.
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

:::tip

예외를 던지는 함수는 래퍼 함수 내에서 호출되어야 합니다. 그러지 않으면 `toThrow` 단언이 실패합니다.

:::

## 기타

지금까지 살펴본 매처는 일부분일 뿐입니다. 매처의 전체 목록은 [참고 문서](https://jestjs.io/docs/29.1/expect)를 확인하세요.

지원 매처를 학습한 후에는 [비동기 코드 테스트](./asynchronous.md)를 확인하는 것을 추천합니다.