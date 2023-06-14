---
sidebar_position: 1
---

# 주석

플레이라이트 테스트는 실패, 불안정, 건너뜀, 집중, 테스트 태그를 처리하기 위한 테스트 주석을 지원합니다.

- [`test.skip()`](https://playwright.dev/docs/api/class-test#test-skip-1) - 테스트를 관련이 없는 것으로 표시합니다. 플레이라이트 테스트는 해당 테스트를 실행하지 않습니다. 일부 설정에서 테스트를 적용할 수 없을 때 이 주석을 사용하세요.
- [`test.fail()`](https://playwright.dev/docs/api/class-test#test-fail-1) - 테스트를 실패로 표시합니다. 플레이라이트 테스트는 해당 테스트를 실행하고 실제로 실패하는지 확인합니다. 테스트가 실패하지 않으면 플레이라이트 테스트에서 불만을 제기합니다.
- [`test.fixme()`](https://playwright.dev/docs/api/class-test#test-fixme-1) - 테스트를 실패로 표시합니다. 플레이라이트 테스트는 `fail` 주석과 반대로 해당 테스트를 실행하지 않습니다. 테스트 실행 속도가 느리거나 충돌할 때 `fixme`를 사용하세요.
- [`test.slow()`](https://playwright.dev/docs/api/class-test#test-slow-1) - 테스트가 느리다고 표시하고 테스트 시간 제한을 세 배로 늘립니다.

주석은 단일 테스트 또는 테스트 그룹에서 사용할 수 있습니다. 주석은 조건부일 수 있으며, 이 경우 조건이 참 같은 값(truthy)일 때 적용됩니다. 주석은 테스트 고정물에 따라 달라질 수 있습니다. 동일한 테스트에 다른 설정으로 여러 주석이 있을 수 있습니다.

## 테스트 집중하기

일부 테스트에 집중할 수 있습니다. 집중된 테스트가 있으면 해당 테스트만 실행됩니다.

```ts
test.only('focus this test', async ({ page }) => {
  // 전체 프로젝트에서 집중된 테스트만 실행합니다.
});
```

## 테스트 건너뛰기

테스트를 건너뜀으로 표시합니다.

```ts
test.skip('skip this test', async ({ page }) => {
  // 이 테스트는 실행되지 않습니다.
});
```

## 조건부로 테스트 건너뛰기

조건에 따라 특정 테스트를 건너뛸 수 있습니다.

```ts
test('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});
```

## 테스트 그룹화하기

테스트를 그룹화하여 논리적 이름을 지정하거나 그룹에 `before`/`after` 훅을 설정할 수 있습니다.

```ts
import { test, expect } from '@playwright/test';

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

## 테스트에 태그 달기

테스트에 `@fast` 또는 `@slow` 태그를 지정하고 특정 태그가 있는 테스트만 실행하고 싶을 때가 있습니다. 이때 `--grep`과 `--grep-invert` 명령줄 플래그를 사용할 수 있습니다.

```ts
import { test, expect } from '@playwright/test';

test('Test login page @fast', async ({ page }) => {
  // ...
});

test('Test full report @slow', async ({ page }) => {
  // ...
});
```

다음 명령어로 특정 태그의 테스트만 실행할 수 있습니다.

```bash
npx playwright test --grep @fast
```

또는 반대로 특정 태그의 테스트만 건너뛸 수 있습니다.

```bash
npx playwright test --grep-invert @slow
```

## 조건부로 테스트 그룹 건너뛰기

예를 들어 콜백을 전달하여 크로미움에서만 테스트 그룹을 실행할 수 있습니다.

```ts title="example.spec.ts"
test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test.beforeAll(async () => {
    // 이 훅은 크로미움에서만 실행됩니다.
  });

  test('test 1', async ({ page }) => {
    // 이 테스트는 크로미움에서만 실행됩니다.
  });

  test('test 2', async ({ page }) => {
    // 이 테스트는 크로미움에서만 실행됩니다.
  });
});
```

## `beforeEach` 훅에서 `fixme` 사용하기

`beforeEach` 훅을 실행하지 않으려면 훅 자체에 주석을 추가할 수 있습니다.

```ts title="example.spec.ts"
test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, 'Settings page does not work in mobile yet');

  await page.goto('http://localhost:3000/settings');
});

test('user profile', async ({ page }) => {
  await page.getByText('My Profile').click();
  // ...
});
```

## 커스텀 주석

테스트에 주석 형식으로 커스텀 메타데이터를 추가할 수도 있습니다. 주석은 [`test.info().annotations`](https://playwright.dev/docs/api/class-testinfo#test-info-annotations)을 통해 접근할 수 있는 키/값 쌍입니다. 많은 보고서가 `html`과 같은 주석을 표시합니다.

```ts title="example.spec.ts"
test('user profile', async ({ page }) => {
  test.info().annotations.push({ type: 'issue', description: 'https://github.com/microsoft/playwright/issues/<some-issue>' });
  // ...
});
```
