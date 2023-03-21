---
sidebar_position: 4
---

# 비동기 코드 테스트하기

자바스크립트에서는 코드가 비동기적으로 실행되는 것이 일반적입니다. 비동기식으로 실행되는 코드가 있는 경우, 제스트는 테스트 중인 코드가 완료되는 시점을 알아야 다른 테스트로 넘어갈 수 있습니다.

이를 처리하는 몇 가지 방법이 있습니다.

## 프라미스

테스트에서 프라미스를 반환하면 제스트는 해당 프라미스가 이행될 때까지 기다립니다. 프라미스가 거부되면 테스트는 실패합니다.

예를 들어 `fetchData`가 `'peanut butter'` 문자열로 이행되어야 하는 프라미스를 반환한다고 가정해 보겠습니다. 테스트를 다음과 같이 작성할 수 있습니다.

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

## `async`와 `await`

테스트에서 `async`와 `await`를 사용할 수 있습니다. 비동기 테스트를 작성하려면 `test`에 전달된 함수 앞에 `async` 키워드를 사용합니다.

예를 들어 동일한 `fetchData` 시나리오를 다음과 같이 테스트할 수 있습니다.

```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

`async`와 `await`를 `.resolves` 또는 `.rejects`와 결합할 수 있습니다.

```js
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```

이 경우 `async`와 `await`는 앞에서 사용한 프라미스와 동일한 논리를 가지는 효과적인 구문 설탕입니다.

:::caution

반드시 프라미스를 반환하거나 `await`를 사용해야 합니다. 그러지 않으면 `fetchData`에서 반환된 프라미스가 이행되거나 거부되기 전에 테스트가 완료됩니다.

:::

프라미스가 거부될 것으로 기대되면 `.catch` 메서드를 사용합니다. `expect.assertions`를 추가하여 특정한 수의 단언이 호출되는지 확인합니다. 그러지 않으면 이행된 약속이 테스트에 실패하지 않습니다.

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

## 콜백

프라미스를 사용하지 않는다면 대신 콜백을 사용할 수 있습니다.

예를 들어 `fetchData`가 프라미스를 반환하는 대신 콜백을 기대한다고 가정해 보겠습니다. 즉, 어떤 데이터를 가져오고 가져오기가 완료되면 `callback(null, data)`을 호출합니다. 반환된 데이터가 `'peanut butter'` 문자열인지 테스트하려고 합니다.

기본적으로 제스트 테스트는 실행의 끝에 도달하면 완료됩니다. 따라서 다음 테스트는 의도한 대로 작동하지 않습니다.

```js
// 이렇게 작성하지 마세요!
test('the data is peanut butter', () => {
  function callback(error, data) {
    if (error) {
      throw error;
    }
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

문제는 콜백 호출 전에, `fetchData`가 완료되는 즉시 테스트가 끝난다는 것입니다.

이를 해결할 수 있는 `test`의 대체 방법이 있습니다. 빈 인수를 가진 함수에 테스트를 넣는 대신 `done`이라는 단일 인수를 사용합니다. 제스트는 테스트를 완료하기 전에 `done` 콜백이 호출될 때까지 기다립니다.

```js
test('the data is peanut butter', done => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

`done()`이 호출되지 않으면 원래 의도대로 (시간 제한 오류와 함께) 테스트가 실패합니다.

`expect`문이 실패하면 오류가 발생하고 `done()`이 호출되지 않습니다. 테스트 로그에서 실패 이유를 보려면 `expect`를 `try` 블록으로 감싸고 `catch` 블록에서 `done`에 오류를 전달해야 합니다. 그러지 않으면 `expect(data)`에서 받은 값이 표시되지 않는 불분명한 시간 제한 오류가 발생합니다.

:::caution

제스트는 동일한 테스트 함수가 `done()` 콜백을 통과하고 프라미스를 반환하는 경우에 오류가 발생합니다. 이는 테스트에서 메모리 누수를 방지하기 위한 예방 조치입니다.

:::

## `.resolves`와 `.rejects`

`expect`문에 `.resolves` 매처를 사용할 수도 있습니다. 그러면 제스트는 해당 프라미스가 이행(resolve)될 때까지 기다립니다. 프라미스가 거부되면 테스트는 자동으로 실패합니다.

```js
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

단언을 반환해야 합니다. `return`문을 생략하면 `fetchData`에서 반환된 프라미스가 이행되고 `then()`이 콜백을 실행하기 전에 테스트가 완료됩니다.

프라미스가 거부될 것으로 기대되면 `.rejects` 매처를 사용합니다. 이 매처는 `.resolves` 매처와 유사하게 작동합니다. 프라미스가 이행되면 테스트는 자동으로 실패합니다.

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

특별히 더 우수한 방법은 없습니다. 단지 어떤 스타일로 테스트를 단순하게 만드느냐에 달려 있습니다.

코드베이스 전체 또는 단일 파일에서 이 방법들을 혼합하고 일치시킬 수 있습니다.