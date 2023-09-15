---
sidebar_position: 5
---

# 설정과 해제

테스트 실행 전에 수행해야 하는 설정 작업과, 테스트 실행 후에 수행해야 하는 마무리 작업이 자주 있습니다. 제스트는 이를 처리하기 위한 도우미 함수를 제공합니다.

## 설정 반복하기

여러 테스트에서 반복적으로 수행해야 하는 작업이 있다면 `beforeEach`와 `afterEach` 훅을 사용할 수 있습니다.

예를 들어 여러 테스트가 도시 데이터베이스와 상호 작용한다고 가정해 보겠습니다. 각 테스트 전에 호출해야 하는 `initializeCityDatabase()` 메서드와 각 테스트 후에 호출해야 하는 `clearCityDatabase()` 메서드가 있습니다. 테스트를 다음과 같이 작성할 수 있습니다.

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

`beforeEach`와 `afterEach`는 [테스트가 비동기 코드를 처리하는 방법](./asynchronous.md)과 동일한 방법으로 비동기 코드를 처리할 수 있습니다. 즉, `done` 매개변수를 사용하거나 프라미스를 반환할 수 있습니다.

예를 들어 `initializeCityDatabase()`가 데이터베이스가 초기화될 때 이행된 프라미스를 반환하면, 해당 프라미스를 반환하고자 합니다.

```js
beforeEach(() => {
  return initializeCityDatabase();
});
```

## 일회성 설정

어떤 경우에는 파일의 시작 부분에서 한 번만 설정하면 됩니다. 이는 설정이 비동기식일 때 특히 성가실 수 있으므로 인라인으로 수행할 수 없습니다. 제스트는 이런 상황을 처리하는 `beforeAll`과 `afterAll` 훅을 제공합니다.

예를 들어 `initializeCityDatabase()`와 `clearCityDatabase()`가 모두 프라미스를 반환하고 테스트 간에 도시 데이터베이스를 재사용할 수 있다면 테스트 코드를 다음과 같이 변경할 수 있습니다.

```js
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

## 범위 지정하기

기본적으로 `beforeAll`과 `afterAll` 블록은 파일의 모든 테스트에 적용됩니다. `describe` 블록을 사용하여 테스트와 함께 그룹화할 수도 있습니다. `beforeAll`과 `afterAll`은 `describe` 블록 안에 있으면 해당 `describe` 블록 내의 테스트에만 적용됩니다.

예를 들어 도시 데이터베이스뿐만 아니라 음식 데이터베이스도 있다고 가정해 보겠습니다. 다음과 같이 테스트마다 다른 설정을 할 수 있습니다.

```js
// 이 파일의 모든 테스트에 적용됩니다.
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // 이 describe 블록의 테스트에만 적용됩니다.
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

최상위 `beforeEach`는 `describe` 블록 내의 `beforeEach` 이전에 실행됩니다. 다음 예시를 보면 모든 훅의 실행 순서를 이해하는 데 도움이 될 것입니다.

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## 실행 순서

제스트는 실제 테스트를 실행하기 **전에(before)** 테스트 파일의 모든 `describe` 처리기를 실행합니다. 따라서 `describe` 블록이 아닌 `before*`와 `after*` 처리기 내부에서 설정과 해제 작업을 수행하는 것이 좋습니다. `describe` 블록이 완료되면 제스트는 기본적으로 수집 단계에서 만난 순서대로 모든 테스트를 연속적으로 실행합니다. 각 테스트가 완료되고 정리될 때까지 기다렸다가 다음 단계로 이동합니다.

예시:

```js
describe('describe outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3
```

`describe`와 `test` 블록처럼 제스트는 선언 순서대로 `before*`과 `after*` 훅을 호출합니다. 내부 범위의 `after*` 훅이 먼저 호출됩니다.

다음은 서로 종속되는 자원을 설정하고 해제하는 예시입니다.

```js
beforeEach(() => console.log('connection setup'));
beforeEach(() => console.log('database setup'));

afterEach(() => console.log('database teardown'));
afterEach(() => console.log('connection teardown'));

test('test 1', () => console.log('test 1'));

describe('extra', () => {
  beforeEach(() => console.log('extra database setup'));
  afterEach(() => console.log('extra database teardown'));

  test('test 2', () => console.log('test 2'));
});

// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown
```

:::note 참고

`jasmine2` 테스트 러너를 사용한다면 선언의 역순으로 `after*` 훅을 호출합니다. 동일한 출력을 얻으려면 위의 예시를 다음과 같이 변경해야 합니다.

```diff
  beforeEach(() => console.log('connection setup'));
+ afterEach(() => console.log('connection teardown'));

  beforeEach(() => console.log('database setup'));
+ afterEach(() => console.log('database teardown'));

- afterEach(() => console.log('database teardown'));
- afterEach(() => console.log('connection teardown'));

  // ...
```

:::

## 일반적인 조언

테스트가 실패하면 가장 먼저 확인할 것 중 하나는 테스트가 혼자 실행될 때도 실패하는지 여부입니다. 제스트에서 하나의 테스트만 실행하려면 해당 `test` 명령을 잠시 `test.only`로 변경하면 됩니다.

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

더 큰 스위트의 일부로 실행할 때는 자주 실패하지만 혼자 실행할 때는 실패하지 않는다면, 다른 테스트의 무언가가 해당 테스트를 방해하고 있을 확률이 높습니다. `beforeEach`로 일부 공유 상태를 제거하면 이 문제가 종종 해결되곤 합니다. 어떤 공유 상태가 변경되는지 확실하지 않다면 데이터를 기록하는 `beforeEach`를 시도해 볼 수 있습니다.