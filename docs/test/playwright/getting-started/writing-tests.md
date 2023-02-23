---
sidebar_position: 2
---

# 테스트 작성

플레이라이트 테스트는 간단합니다.

- **작업을 수행하고**
- **기대하는 상태를 단언합니다.**

작업을 수행하기 전에 아무것도 기다릴 필요가 없습니다. 플레이라이트는 각 작업을 수행하기 전에 광범위한 [실행 가능성](https://playwright.dev/docs/actionability) 검사가 통과할 때까지 자동으로 기다립니다.

또한 검사를 수행할 때 경주 조건을 처리할 필요가 없습니다. 플레이라이트 단언은 궁극적으로 충족되어야 하는 상태를 묘사하는 방식으로 설계되었습니다.

이러한 디자인 선택 덕분에 플레이라이트 사용자는 테스트에서 불안정한 시간 초과 및 정확하지 않은 검사를 걱정할 필요가 없습니다.

이곳에서 배우는 것은 다음과 같습니다.

- [첫 테스트 작성 방법](#첫-테스트)
- [작업 수행 방법](#작업)
- [단언 사용 방법](#단언)
- [테스트가 격리되어 실행되는 방식](#테스트-격리)
- [테스트 훅 사용 방법](#테스트-훅-사용)

## 첫 테스트

다음 예시에서 테스트를 작성하는 방법을 확인하세요.

```js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // 하위 문자열을 포함하는 제목을 기대합니다.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Get started 링크를 클릭합니다.
  await page.getByRole('link', { name: 'Get started' }).click();

  // URL에 intro가 포함될 것으로 예상합니다.
  await expect(page).toHaveURL(/.*intro/);
});
```

:::note 참고

자동 타입 검사를 받으려면 VS 코드에서 자바스크립트를 사용할 때 각 테스트 파일의 시작 부분에 `// @ts-check`를 추가하세요.

:::

## 작업

### 내비게이션

대부분의 테스트는 페이지를 URL로 이동하는 것부터 시작됩니다. 그런 다음 테스트는 페이지 요소와 상호 작용할 수 있습니다.

```js
await page.goto('https://playwright.dev/');
```

플레이라이트는 계속 진행하기 전에 페이지가 로드 상태에 도달할 때까지 기다립니다. [`page.goto()`](https://playwright.dev/docs/api/class-page#page-goto)에서 자세한 옵션을 확인하세요.

### 상호 작용

작업 수행은 요소를 찾는 것으로 시작됩니다. 플레이라이트는 요소를 찾을 때 [탐지기 API](https://playwright.dev/docs/locators)를 사용합니다. 탐지기로 언제든지 페이지에서 요소를 찾을 수 있습니다. 탐지기의 다양한 유형을 [탐지기 API](https://playwright.dev/docs/locators)에서 확인하세요. 플레이라이트는 작업을 수행하기 전에 요소가 [작업 가능할](https://playwright.dev/docs/actionability) 때까지 기다립니다.

```js
// 탐지기를 생성합니다.
const getStarted = page.getByRole('link', { name: 'Get started' });
// 클릭합니다.
await getStarted.click();
```

대부분 다음과 같이 한 줄로 작성합니다.

```js
await page.getByRole('link', { name: 'Get started' }).click();
```

### 기본 작업

가장 많이 사용하는 플레이라이트 작업 목록입니다. [탐지기 API](https://playwright.dev/docs/api/class-locator) 섹션에서 더 많은 작업을 확인하세요.

| 작업 | 설명 |
| ------------------------------------------------------------ | --------------------------------------- |
| [locator.check()](https://playwright.dev/docs/api/class-locator#locator-check) | 입력 체크박스를 체크하기 |
| [locator.click()](https://playwright.dev/docs/api/class-locator#locator-click) | 요소 클릭하기 |
| [locator.uncheck()](https://playwright.dev/docs/api/class-locator#locator-uncheck) | 입력 체크박스의 체크 해제하기 |
| [locator.hover()](https://playwright.dev/docs/api/class-locator#locator-hover) | 요소에 마우스 놓기 |
| [locator.fill()](https://playwright.dev/docs/api/class-locator#locator-fill) | 폼 필드 채우기 (빠름) |
| [locator.focus()](https://playwright.dev/docs/api/class-locator#locator-focus) | 요소에 초점 맞추기 |
| [locator.press()](https://playwright.dev/docs/api/class-locator#locator-press) | 하나의 키 누르기 |
| [locator.setInputFiles()](https://playwright.dev/docs/api/class-locator#locator-set-input-files) | 업로드할 파일 선택하기 |
| [locator.selectOption()](https://playwright.dev/docs/api/class-locator#locator-select-option) | 드롭다운에서 옵션 선택하기 |
| [locator.type()](https://playwright.dev/docs/api/class-locator#locator-type) | 한 글자씩 텍스트 입력하기 (느림) |

## 단언

플레이라이트 테스트는 `toEqual`, `toContain`, `toMatch`, `toBe`와 같은 매처를 제공하는 [테스트 단언](https://playwright.dev/docs/test-assertions)에 [`expect`](https://jestjs.io/docs/expect) 라이브러리를 사용합니다. 또한 예상 조건이 충족될 때까지 대기하는 편리한 비동기 매처로 이 라이브러리를 확장합니다. 이러한 매처를 사용하면 테스트를 안정적이고 탄력적으로 만들 수 있습니다.

예를 들어 이 코드는 페이지가 `Playwright`를 포함하는 제목을 얻을 때까지 기다립니다.

```js
await expect(page).toHaveTitle(/Playwright/);
```

다음은 가장 많이 사용하는 비동기 단언 목록입니다. [테스트 단언](https://playwright.dev/docs/test-assertions)에서 더 많은 단언을 확인하세요.

| 단언 | 설명 |
| ------------------------------------------------------------ | --------------------------------- |
| [expect(locator).toBeChecked()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-checked) | 체크박스가 선택됨 |
| [expect(locator).toBeEnabled()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-enabled) | 제어가 활성화됨 |
| [expect(locator).toBeVisible()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible) | 요소가 보임 |
| [expect(locator).toContainText()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-contain-text) | 요소의 텍스트에 해당 텍스트가 포함됨 |
| [expect(locator).toHaveAttribute()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-attribute) | 요소에 해당 속성이 있음 |
| [expect(locator).toHaveCount()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-count) | 요소 목록이 해당 길이를 가짐 |
| [expect(locator).toHaveText()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-text) | 요소의 텍스트가 해당 텍스트와 일치함 |
| [expect(locator).toHaveValue()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-value) | 입력 요소에 해당 값이 있음 |
| [expect(page).toHaveTitle()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-title) | 페이지에 해당 제목이 있음 |
| [expect(page).toHaveURL()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-url) | 페이지에 해당 URL이 있음 |
| [expect(page).toHaveScreenshot()](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1) | 페이지에 해당 스크린숏이 있음 |

### 테스트 격리

플레이라이트 테스트는 테스트에 전달되는 [내장 페이지 고정물](https://playwright.dev/docs/test-fixtures#built-in-fixtures)과 같은 [테스트 고정물](https://playwright.dev/docs/test-fixtures)의 개념을 기반으로 합니다. 단일 브라우저에서 여러 테스트가 실행되는 경우에도 테스트 간에 페이지가 격리됩니다. 이는 모든 테스트가 새로운 환경을 얻는 완전히 새로운 브라우저 프로필과 동일한 브라우저 컨텍스트 덕분입니다.

```js
test('basic test', async ({ page }) => {
  ...
```

### 테스트 훅 사용

`test.describe`와 같은 다양한 [테스트 훅](https://playwright.dev/docs/api/class-test)을 사용하여 테스트 그룹을 선언하고 각 테스트 전후에 실행되는 `test.beforeEach`와 `test.afterEach`를 사용할 수 있습니다. 다른 훅으로는 `test.beforeAll`와 `test.afterAll`이 있으며 모든 테스트 전후에 작업자당 한 번씩 실행됩니다.

```js
import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 시작 URL로 이동합니다.
    await page.goto("https://playwright.dev/");
  });

  test("main navigation", async ({ page }) => {
    // 단언은 expect API를 사용합니다.
    await expect(page).toHaveURL("https://playwright.dev/");
  });
});
```
