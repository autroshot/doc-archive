---
sidebar_position: 3
---

# 타입스크립트

플레이라이트 테스트는 기본적으로 타입스크립트를 지원합니다. 타입스크립트로 테스트를 작성하면 플레이라이트 테스트가 테스트를 읽고 자바스크립트로 변환하여 실행합니다. [코먼JS 모듈](https://nodejs.org/api/modules.html)과 [ECMA스크립트 모듈](https://nodejs.org/api/esm.html) 모두에서 작동합니다.

## 코먼JS를 사용하는 타입스크립트

[노드](https://nodejs.org/en/)는 **기본적으로** 코먼JS 모듈로 작동합니다. `.mjs` 또는 `.mts` 확장자를 사용하거나, `package.json`에 `type: "module"`을 지정하지 않는 한, 플레이라이트 테스트는 모든 타입스크립트 파일을 코먼JS로 취급합니다. 별도의 확장 없이 평소대로 가져오는 것이 가능합니다.

다음은 타입스크립트로 작성된 도우미 모듈입니다.

```ts title="helper.ts"
export const username = 'John';
export const password = 'secret';
```

평소와 같이 도우미에서 가져올 수 있습니다.

```ts title="example.spec.ts"
import { test, expect } from '@playwright/test';
import { username, password } from './helper';

test('example', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('Password').fill(password);
});
```

## ESM을 사용하는 타입스크립트

`package.json` 파일에서 `type: "module"`을 설정하여 [ECMA스크립트 모듈](https://nodejs.org/api/esm.html)을 선택할 수 있습니다. 플레이라이트 테스트는 `playwright.config.ts` 파일을 읽으면 ESM 모드로 전환되므로 해당 파일이 있는지 확인하세요.

플레이라이트 테스트는 [타입스크립트에서 ESM에 대한 실험적 지원](https://www.typescriptlang.org/docs/handbook/esm-node.html)을 따릅니다. 명세서에 따르면 모듈에서 가져올 때 `.js` 또는 `.ts` 파일 확장자가 필요합니다.

먼저 `package.json`에서 모듈을 활성화합니다.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "type": "module",
}
```

그런 다음 평소와 같이 타입스크립트에 도우미 모듈을 작성합니다.

```ts title="helper.ts"
export const username = 'John';
export const password = 'secret';
```

모듈에서 가져올 때 확장자를 지정하세요.

```ts title="example.spec.ts"
import { test, expect } from '@playwright/test';
import { username, password } from './helper.ts';

test('example', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('Password').fill(password);
});
```

:::note 참고

ESM을 사용하는 타입스크립트에는 노드 16 이상이 필요합니다.

:::

## `tsconfig.json`

플레이라이트는 불러오는 각 소스 파일에 대해 `tsconfig.json`을 선택합니다. 플레이라이트는 `paths`와 `baseUrl` 옵션만 지원합니다.

특히 테스트에 대한 일부 기본 설정을 변경할 수 있도록 테스트 디렉터리에 별도의 `tsconfig.json`을 설정하는 것이 좋습니다.

다음은 디렉터리 구조의 예입니다.

```
src/
    source.ts

tests/
    tsconfig.json  # 테스트 전용 tsconfig
    example.spec.ts

tsconfig.json  # 모든 타입스크립트 소스에 대한 일반적인 tsconfig

playwright.config.ts
```

### `tsconfig` 경로 매핑

플레이라이트는 `tsconfig.json`에 선언된 [경로 매핑](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)을 지원합니다. `baseUrl`도 설정되어 있는지 확인하세요.

다음은 플레이라이트 테스트에서 작동하는 `tsconfig.json`의 예입니다.

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 경로가 존재한다면 지정해야 합니다.
    "paths": {
      "@myhelper/*": ["packages/myhelper/*"] // 이 매핑은 baseUrl에 대한 상대 경로입니다.
    }
  }
}
```

이제 매핑된 경로를 사용하여 가져올 수 있습니다.

```ts title="example.spec.ts"
import { test, expect } from '@playwright/test';
import { username, password } from '@myhelper/credentials';

test('example', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('Password').fill(password);
});
```

## 타입스크립트를 사용하여 수동으로 테스트 컴파일하기

경우에 따라 플레이라이트 테스트는 타입스크립트 코드를 올바르게 변환할 수 없습니다. `tsconfig.json`에 설정된 타입스크립트의 실험적 기능이나 최신 기능을 사용하는 경우가 그 예입니다.

이 경우 플레이라이트에 테스트를 보내기 전에 자체 타입스크립트 컴파일을 수행할 수 있습니다.

먼저 테스트 디렉터리 내에 `tsconfig.json` 파일을 추가합니다.

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "commonjs",
        "moduleResolution": "Node",
        "sourceMap": true,
        "outDir": "../tests-out",
    }
}
```

`package.json`에서 두 개의 스크립트를 추가합니다.

```json
{
  "scripts": {
    "pretest": "tsc --incremental -p tests/tsconfig.json",
    "test": "playwright test -c tests-out"
  }
}
```

`pretest` 스크립트는 테스트에서 타입스크립트를 실행합니다. `test`는 `tests-out` 디렉터리에 생성된 테스트를 실행합니다. `-c` 인수는 테스트 러너가 `tests-out` 디렉터리 내에서 테스트를 찾도록 설정합니다.

이제 `npm run test`는 테스트를 빌드하고 실행합니다.