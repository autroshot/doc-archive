---
sidebar_position: 2
---

# 단언

플레이라이트는 `expect` 함수의 형태로 테스트 단언을 포함합니다. 단언을 하려면 `expect(value)`를 호출하고 기대를 반영하는 매처를 선택합니다. 모든 조건을 단언하는 데 사용 가능한 `toEqual`, `toContain`, `toBeTruthy`와 같은 많은 [일반 매처](https://playwright.dev/docs/api/class-genericassertions)가 있습니다.

```js
expect(success).toBeTruthy();
```

플레이라이트에는 예상 조건이 충족될 때까지 기다리는 웹 관련 [비동기 매처](https://playwright.dev/docs/api/class-locatorassertions)도 있습니다.

```js
await expect(page.getByTestId('status')).toHaveText('Submitted');
```

플레이라이트는 테스트 ID가 `status`인 요소에 `Submitted` 텍스트가 있을 때까지 다시 테스트합니다. 조건이 충족되거나 시간 제한에 도달할 때까지 요소를 다시 가져오고 반복해서 확인합니다. 시간 제한을 별도로 전달하거나 테스트 설정의 [`testConfig.expect`](https://playwright.dev/docs/api/class-testconfig#test-config-expect) 값으로 한 번에 설정할 수 있습니다.

기본적으로 단언의 시간 제한은 5초입니다. [다양한 시간 제한](https://playwright.dev/docs/test-timeouts)에서 자세한 내용을 확인하세요.

## 단언 목록

| 단언 | 설명 |
| ------------------------------------------------------------ | --------------------------------- |
| [expect(locator).toBeChecked()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-checked) | 확인란이 선택됨 |
| [expect(locator).toBeDisabled()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-disabled) | 요소가 비활성화됨 |
| [expect(locator).toBeEditable()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-editable) | 요소가 활성화됨 |
| [expect(locator).toBeEmpty()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-empty) | 컨테이너가 비어 있음 |
| [expect(locator).toBeEnabled()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-enabled) | 요소가 활성화됨 |
| [expect(locator).toBeFocused()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-focused) | 요소가 초점을 얻음 |
| [expect(locator).toBeHidden()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-hidden) | 요소가 보이지 않음 |
| [expect(locator).toBeInViewport()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-in-viewport) | 요소가 뷰포트와 교차됨 |
| [expect(locator).toBeVisible()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible) | 요소가 보임 |
| [expect(locator).toContainText()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-contain-text) | 요소의 텍스트에 해당 텍스트가 포함됨 |
| [expect(locator).toHaveAttribute()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-attribute) | 요소에 해당 DOM 속성이 있음 |
| [expect(locator).toHaveClass()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-class) | 요소에 해당 클래스 속성이 있음 |
| [expect(locator).toHaveCount()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-count) | 목록의 자식의 수가 해당 수와 일치함 |
| [expect(locator).toHaveCSS()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-css) | 요소에 해당 CSS 속성이 있음 |
| [expect(locator).toHaveId()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-id) | 요소에 해당 ID가 있음 |
| [expect(locator).toHaveJSProperty()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-js-property) | 요소에 해당 자바스크립트 프로퍼티가 있음 |
| [expect(locator).toHaveScreenshot()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot-1) | 요소에 해당 스크린숏이 있음 |
| [expect(locator).toHaveText()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-text) | 요소의 텍스트가 해당 텍스트와 일치함 |
| [expect(locator).toHaveValue()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-value) | 입력에 해당 값이 있음 |
| [expect(locator).toHaveValues()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-values) | 해당 옵션들이 선택됨 |
| [expect(page).toHaveScreenshot()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1) | 페이지에 해당 스크린숏이 있음 |
| [expect(page).toHaveTitle()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-title) | 페이지에 해당 제목이 있음 |
| [expect(page).toHaveURL()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-url) | 페이지에 해당 URL이 있음 |
| [expect(apiResponse).toBeOK()](https://playwright.dev/docs/api/class-apiresponseassertions#api-response-assertions-to-be-ok) | 응답이 OK 상태를 가짐 |

## 부정 매처

일반적으로 매처 앞에 `.not`을 추가하면 그 반대가 참이 될 것으로 예상할 수 있습니다.

```js
expect(value).not.toEqual(0);
await expect(locator).not.toContainText("some text");
```

## 느슨한 단언

기본적으로 단언이 실패하면 테스트 실행이 종료됩니다. 플레이라이트는 **느슨한 단언**도 지원합니다. 느슨한 단언은 실패해도 테스트 실행을 종료하지 않지만 테스트를 실패로 표시합니다.

```js
// 실패해도 테스트가 중지되지 않는 몇 가지 검사를 수행합니다.
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

// 더 많은 것을 확인하기 위해 테스트를 계속합니다.
await page.getByRole('link', { name: 'next page' }).click();
await expect.soft(page.getByRole('heading', { name: 'Make another order' })).toBeVisible();
```

테스트 실행 중에 언제든지 느슨한 단언 실패가 있었는지 확인할 수 있습니다.

```js
// 실패해도 테스트가 중지되지 않는 몇 가지 검사를 수행합니다.
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

// 느슨한 단언에 실패가 있었다면 다음은 실행되지 않습니다.
expect(test.info().errors).toHaveLength(0);
```

느슨한 단언은 플레이라이트 테스트 러너에서만 작동합니다.

## 커스텀 `expect` 메시지

커스텀 오류 메시지를 `expect` 함수의 두 번째 인수에서 지정할 수 있습니다. 예를 들면 다음과 같습니다.

```js
await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
```

오류는 다음과 같습니다.

```bash
    Error: should be logged in

    Call log:
      - expect.toBeVisible with timeout 5000ms
      - waiting for "getByText('Name')"


      2 |
      3 | test('example test', async({ page }) => {
    > 4 |   await expect(page.getByText('Name'), 'should be logged in').toBeVisible();
        |                                                                  ^
      5 | });
      6 |
```

느슨한 단언에서도 동일하게 작동합니다.

```js
expect.soft(value, 'my soft assertion').toBe(56);
```

## 폴링

`expect.poll`을 사용하여 모든 동기 `expect`를 비동기 폴링으로 변환할 수 있습니다.

다음 메서드는 HTTP 상태 200을 반환할 때까지 지정된 함수를 폴링합니다.

```js
await expect.poll(async () => {
  const response = await page.request.get('https://api.example.com');
  return response.status();
}, {
  // 커스텀 오류 메시지 (선택 사항)
  message: 'make sure API eventually succeeds', // 커스텀 오류 메시지
  // 10초 동안 폴링합니다. 기본값은 5초입니다. 시간 제한을 비활성화하려면 0을 전달합니다.
  timeout: 10000,
}).toBe(200);
```

폴링 간격을 사용자 지정할 수도 있습니다.

```js
await expect.poll(async () => {
  const response = await page.request.get('https://api.example.com');
  return response.status();
}, {
  // 프로브, 1초 대기, 프로브, 2초 대기, 프로브, 10초 대기, 프로브, 10초 대기, 프로브, ... (기본값은 [100, 250, 500, 1000])
  intervals: [1_000, 2_000, 10_000],
  timeout: 60_000
}).toBe(200);
```

## 재시도

테스트가 성공할 때까지 코드 블록을 다시 시도할 수 있습니다.

```js
await expect(async () => {
  const response = await page.request.get('https://api.example.com');
  expect(response.status()).toBe(200);
}).toPass();
```

재시도 간격의 시간 제한을 사용자 지정할 수도 있습니다.

```js
await expect(async () => {
  const response = await page.request.get('https://api.example.com');
  expect(response.status()).toBe(200);
}).toPass({
  // 프로브, 1초 대기, 프로브, 2초 대기, 프로브, 10초 대기, 프로브, 10초 대기, 프로브, ... (기본값은 [100, 250, 500, 1000])
  intervals: [1_000, 2_000, 10_000],
  timeout: 60_000
});
```
