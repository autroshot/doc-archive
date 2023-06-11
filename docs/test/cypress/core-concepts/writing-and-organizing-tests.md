---
sidebar_position: 3
---

# 테스트 작성 및 구성하기

## 폴더 구조

새 프로젝트를 추가하면 사이프러스는 제안된 폴더 구조를 자동으로 생성합니다.

```
E2E:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/e2e.ts

컴포넌트:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/component.ts
/cypress/support/component-index.html

공통:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/e2e.ts
/cypress/support/component.ts
/cypress/support/component-index.html
```

### 폴더 구조 설정하기

테스트, 고정물, 지원 파일의 위치를 별도로 설정하는 것이 가능하지만 첫 프로젝트는 위의 구조로 시작하는 것이 좋습니다.

설정 파일에서 폴더 구성을 수정할 수 있습니다. 자세한 내용은 [사이프러스 설정](https://docs.cypress.io/guides/references/configuration#Folders-Files)에서 확인하세요.

:::info `.gitignore`에 어떤 파일을 추가해야 하나요?

사이프러스는 앱을 테스트하는 동안 촬영한 스크린숏과 비디오를 저장하기 위해 [`screenshotsFolder`](https://docs.cypress.io/guides/references/configuration#Screenshots)와 [`videosFolder`](https://docs.cypress.io/guides/references/configuration#Videos)을 생성합니다. 많은 사용자가 이 폴더를 `.gitignore`에 추가합니다. 또한 사이프러스 설정이나 [`cypress.env.json`](https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypress-env-json)에 민감한 환경 변수를 저장하는 경우에는 해당 파일도 추가해야 합니다.

:::

### 스펙 파일

테스트 파일은 기본적으로 `cypress/e2e`에 있지만 원한다면 다른 디렉터리로 설정할 수 있습니다.

테스트 파일은 다음 확장자를 가질 수 있습니다.

- `.js`
- `.jsx`
- `.ts`
- `.tsx`
- `.coffee`
- `.cjsx`

사이프러스는 기본적으로 `ES2015`도 지원합니다. `ES2015 modules` 또는 `CommonJS modules`를 사용할 수 있습니다. 따라서 npm 패키지와 로컬 관련 모듈을 불러올 때 `import`와 `require`를 모두 사용할 수 있습니다.

### 고정물 파일

고정물(fixture)는 테스트에서 사용할 수 있는 정적 데이터의 외부 조각으로 사용됩니다. 고정물 파일은 기본적으로 `cypress/fixtures`에 있지만 원한다면 다른 디렉터리로 설정할 수 있습니다.

일반적으로 [`cy.fixture()`](https://docs.cypress.io/api/commands/fixture) 명령과 함께 사용하며 [네트워크 요청](https://docs.cypress.io/guides/guides/network-requests)을 스텁할 때 많이 사용합니다.

### 자산 파일

테스트 실행 후에 생성될 수 있는 폴더가 있습니다. 테스트 과정에서 생성된 자산이 이 폴더에 포함됩니다.

자산 폴더를 `.gitignore` 파일에 추가하는 것을 고려할 수 있습니다.

#### 다운로드 파일

앱의 파일 다운로드 기능을 테스트하는 동안 다운로드한 모든 파일은 기본적으로 `cypress/downloads`로 설정된 [`downloadsFolder`](https://docs.cypress.io/guides/references/configuration#Downloads)에 저장됩니다.

```
/cypress
  /downloads
    - records.csv
```

#### 스크린숏 파일

[cy.screenshot()](https://docs.cypress.io/api/commands/screenshot) 명령을 사용하거나, 테스트가 실패했을 때 자동으로 찍힌 스크린숏은 기본적으로 `cypress/screenshots`로 설정된 [`screenshotsFolder`](https://docs.cypress.io/guides/references/configuration#Screenshots)에 저장됩니다.

```
/cypress
  /screenshots
    /app.cy.js
      - Navigates to main menu (failures).png
```

#### 비디오 파일

테스트에서 녹화된 모든 비디오는 기본적으로 `cypress/videos`로 설정된 [`videosFolder`](https://docs.cypress.io/guides/references/configuration#Videos)에 저장됩니다.

#### 자산 파일 경로

생성된 스크린숏과 동영상은 각각 폴더(`cypress/screenshots`, `cypress/videos`)에 저장됩니다. 생성된 파일의 경로는 `specPattern` 옵션에 의해 찾은 모든 스펙 파일 간의 공통 상위 경로가 제거된 경로입니다.

**예시 1:**

- 스펙 파일을 찾음
  - `cypress/e2e/path/to/file/one.cy.js`
- 공통 조상 경로 (런타임에 계산됨)
  - `cypress/e2e/path/to/file`
- 생성된 스크린숏 파일
  - `cypress/screenshots/one.cy.js/your-screenshot.png`
- 생성된 비디오 파일
  - `cypress/videos/one.cy.js.mp4`

**예시 2:**

- 스펙 파일을 찾음
  - `cypress/e2e/path/to/file/one.cy.js`
  - `cypress/e2e/path/to/two.cy.js`
- 공통 조상 경로 (런타임에 계산됨)
  - `cypress/e2e/path/to/`
- 생성된 스크린숏 파일
  - `cypress/screenshots/file/one.cy.js/your-screenshot.png`
  - `cypress/screenshots/two.cy.js/your-screenshot.png`
- 생성된 비디오 파일
  - `cypress/videos/file/one.cy.js.mp4`
  - `cypress/videos/two.cy.js.mp4`

### 플러그인 파일

플러그인 파일은 프로젝트 로드 전, 브라우저 실행 전, 테스트 실행 중에 노드(Node.js)에서 실행되는 특별한 파일입니다. 테스트가 브라우저에서 실행되는 동안 플러그인 파일은 백그라운드 노드 프로세스에서 실행됩니다. 플러그인 파일은 [cy.task()](https://docs.cypress.io/api/commands/task) 명령을 호출하여 파일 시스템과 나머지 운영 체제에 액세스할 수 있는 기능을 테스트에 제공합니다.

전처리기로 스펙 파일을 묶는 방법, 브라우저 런치 API를 통해 브라우저를 찾고 시작하는 방법을 비롯한 기타 멋진 것들을 플러그인 파일에서 정의할 수 있습니다. 자세한 내용과 예제는 [플러그인 안내서](https://docs.cypress.io/guides/tooling/plugins-guide)를 확인하세요.

초기에 가져오는 플러그인 파일을 [다른 파일로 설정](https://docs.cypress.io/guides/references/configuration#Folders-Files)할 수 있습니다.

### 지원 파일

테스트 파일 앞에 코드를 넣으려면 [`supportFile`](https://docs.cypress.io/guides/references/configuration#Testing-Type-Specific-Options) 경로를 지정하면 됩니다. 기본적으로 `supportFile`은 다음 파일을 찾도록 설정되어 있습니다.

**컴포넌트:**

- `cypress/support/component.js`
- `cypress/support/component.jsx`
- `cypress/support/component.ts`
- `cypress/support/component.tsx`

**E2E:**

- `cypress/support/e2e.js`
- `cypress/support/e2e.jsx`
- `cypress/support/e2e.ts`
- `cypress/support/e2e.tsx`

:::danger

주어진 테스트 유형과 일치하는 `supportFile` 파일이 여러 개 있으면 사이프러스가 로드될 때 오류가 발생합니다.

:::

사이프러스 앱은 구성된 각 테스트 유형에 대한 예시 지원 파일을 자동으로 생성하며 여기에는 몇 가지 주석 처리된 예시가 포함되어 있습니다.

지원 파일은 모든 스펙 파일보다 먼저 실행됩니다. 별도로 이 파일을 가져올 필요는 없습니다.

기본적으로 사이프러스는 유형별 지원 파일을 자동으로 포함합니다. E2E의 경우 기본값은 `cypress/support/e2e.{js,jsx,ts,tsx}`이고 컴포넌트 테스트의 경우 `cypress/support/component.{js,jsx,ts,tsx}`입니다.

지원 파일은 모든 스펙 파일에 적용하고 사용할 수 있는 [사용자 정의 명령](https://docs.cypress.io/api/cypress-api/custom-commands)이나 전역 재정의 같은 재사용 가능한 작동을 넣기에 좋은 위치입니다.

처음 가져오는 지원 파일은 다른 파일로 설정하거나 [supportFile](https://docs.cypress.io/guides/references/configuration#Folders-Files) 설정을 사용해 완전히 끌 수 있습니다. 지원 파일에서 `import`나 `require`로 다른 파일을 가져올 수 있습니다.

`cypress/support` 파일 내부의 `before` 또는 `beforeEach`에서 작동을 정의할 수 있습니다.

```js
beforeEach(() => {
  cy.log('I run before every test in every spec file!!!!!!');
});
```

#### 실행

사이프러스는 스펙 파일에 앞서 지원 파일을 먼저 실행합니다. 예를 들어 사이프러스는 `cypress open` 또는 `cypress run`으로 스펙 파일을 실행할 때 다음 순서로 파일을 실행합니다.

**e2e 예시:**

1. `support/e2e.js` (지원 파일)
2. `e2e/spec-a.cy.js` (스펙 파일)

**컴포넌트 예시:**

1. `support/component.js` (지원 파일)
2. `components/Button/Button.cy.js` (스펙 파일)

### 문제 해결하기

어떤 이유로 사이프러스가 스펙 파일을 찾지 못하면 [디버그 로그](https://docs.cypress.io/guides/references/troubleshooting#Print-DEBUG-logs)가 활성화된 상태에서 사이프러스를 열거나 실행하여 논리 문제를 해결할 수 있습니다.

```shell
DEBUG=cypress:server:specs npx cypress open
## 또는
DEBUG=cypress:server:specs npx cypress run
```

## 테스트 작성하기

사이프러스는 [모카](https://docs.cypress.io/guides/references/bundled-libraries#Mocha)와 [차이](https://docs.cypress.io/guides/references/bundled-libraries#Chai)를 기반으로 합니다. 차이의 BDD와 TDD 단언 스타일을 모두 지원합니다. 사이프러스에서 작성하는 테스트는 대부분 이 스타일을 따릅니다.

### 테스트 구조

모카에서 차용한 테스트 인터페이스는 `describe()`, `context()`, `it()`, `specify()`를 제공합니다.

`context()`는 `describe()`와 동일하고, `specify()`는 `it()`과 동일하므로 원하는 것을 선택하면 됩니다.

### 훅

사이프러스는 모카에서 차용한 훅(hook)도 제공합니다.

훅을 이용해 일련의 테스트나 각 테스트 전에 실행할 조건을 설정할 수 있습니다. 또한 일련의 테스트나 각 테스트 후에 상태를 정리하는 데 도움이 됩니다.

```js
before(() => {
  // 루트 레벨 훅
  // 모든 테스트 이전에 한 번 실행됩니다.
});

beforeEach(() => {
  // 루트 레벨 훅
  // 각 테스트 블록 이전에 실행됩니다.
});

afterEach(() => {
  // 각 테스트 블록 이후에 실행됩니다.
});

after(() => {
  // 모든 테스트가 끝나고 한 번 실행됩니다.
});

describe('Hooks', () => {
  before(() => {
    // 블록의 모든 테스트 이전에 한 번 실행됩니다.
  });

  beforeEach(() => {
    // 블록의 각 테스트 이전에 실행됩니다.
  });

  afterEach(() => {
    // 블록의 각 테스트 이후에 실행됩니다.
  });

  after(() => {
    // 블록의 모든 테스트 이후에 한 번 실행됩니다.
  });
});
```

훅과 테스트 실행 순서는 다음과 같습니다.

- 모든 `before()` 훅 실행 (한 번)
- 모든 `beforeEach()` 훅 실행
- 테스트 실행
- 모든 `afterEach()` 훅 실행
- 모든 `after()` 훅 실행 (한 번)

:::danger

`after()`나 `afterEach()`를 작성하기 전에 [`after()`나 `afterEach()`로 상태를 정리하는 안티 패턴](../references/best-practices.md#after나-aftereach-훅-사용하기)을 참고하는 것이 좋습니다.

:::

### 테스트 제외하기와 포함하기

지정된 스위트(복수의 테스트를 묶은 것)나 테스트를 실행하려면 함수에 `.only`를 추가하면 됩니다. 중첩된 모든 스위트도 실행됩니다. 이를 이용하면 한 번에 하나의 테스트를 실행할 수 있으며 테스트 스위트를 작성할 때 권장되는 방식입니다.

```js
// -- 앱 코드의 시작 --
function fizzbuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'fizzbuzz';
  }

  if (num % 3 === 0) {
    return 'fizz';
  }

  if (num % 5 === 0) {
    return 'buzz';
  }
}
// -- 앱 코드의 끝 --

// -- 사이프러스 테스트의 시작 --
describe('Unit Test FizzBuzz', () => {
  function numsExpectedToEq(arr, expected) {
    // 숫자 배열 내부를 반복하며 기대하는 값과 일치하는지 확인합니다.
    arr.forEach((num) => {
      expect(fizzbuzz(num)).to.eq(expected);
    });
  }

  it.only('returns "fizz" when number is multiple of 3', () => {
    numsExpectedToEq([9, 12, 18], 'fizz');
  });

  it('returns "buzz" when number is multiple of 5', () => {
    numsExpectedToEq([10, 20, 25], 'buzz');
  });

  it('returns "fizzbuzz" when number is multiple of both 3 and 5', () => {
    numsExpectedToEq([15, 30, 60], 'fizzbuzz');
  });
});
```

스위트나 테스트를 건너뛰고 싶다면 함수에 `.skip()`를 추가합니다. 중첩된 모든 스위트도 건너뜁니다.

```js
it.skip('returns "fizz" when number is multiple of 3', () => {
  numsExpectedToEq([9, 12, 18], 'fizz');
});
```

### 테스트 설정

[테스트 설정](https://docs.cypress.io/guides/references/configuration#Test-Configuration) 값을 스위트나 테스트에 적용할 수 있습니다. 설정 객체를 테스트나 스위트 함수의 두 번째 인수로 전달하면 됩니다.

이 설정은 지정된 스위트나 테스트 중에 적용되며 스위트나 테스트가 완료된 후에는 이전의 기본값으로 돌아갑니다.

#### 구문

```js
describe(name, config, fn);
context(name, config, fn);
it(name, config, fn);
specify(name, config, fn);
```

#### 허용된 설정값

:::danger

일부 설정값은 읽기 전용이며 테스트 설정을 통해 변경할 수 없습니다. [테스트 설명 옵션](https://docs.cypress.io/guides/references/configuration##Test-Configuration)에서 자세한 내용을 확인하세요.

:::

#### 스위트 설정

특정 브라우저에서 실행할 때만 특정 테스트 스위트를 실행하거나 제외하고 싶다면, 해당 스위트 설정 내에서 `browser` 설정을 재정의하면 됩니다. `browser` 옵션은 [Cypress.isBrowser()](https://docs.cypress.io/api/cypress-api/isbrowser)와 동일한 인수를 허용합니다.

다음 예시에서는 크롬 브라우저에서 해당 테스트 스위트를 건너뜁니다.

```js
describe('When NOT in Chrome', { browser: '!chrome' }, () => {
  it('Shows warning', () => {
    cy.get('[data-testid="browser-warning"]').should(
      'contain',
      'For optimal viewing, use Chrome browser'
    );
  });

  it('Links to browser compatibility doc', () => {
    cy.get('a.browser-compat')
      .should('have.attr', 'href')
      .and('include', 'browser-compatibility');
  });
});
```

다음 테스트 스위트는 파이어폭스 브라우저에서만 실행됩니다. 테스트 중 하나에서 뷰포트 해상도를 덮어쓰고 현재 환경 변수를 제공된 환경 변수와 병합합니다.

```js
describe(
  'When in Firefox',
  {
    browser: 'firefox',
    viewportWidth: 1024,
    viewportHeight: 700,
    env: {
      DEMO: true,
      API: 'http://localhost:9000',
    },
  },
  () => {
    it('Sets the expected viewport and API URL', () => {
      expect(cy.config('viewportWidth')).to.equal(1024);
      expect(cy.config('viewportHeight')).to.equal(700);
      expect(cy.env('API')).to.equal('http://localhost:9000');
    });

    it(
      'Uses the closest API environment variable',
      {
        env: {
          API: 'http://localhost:3003',
        },
      },
      () => {
        expect(cy.env('API')).to.equal('http://localhost:3003');
        // 다른 환병 변수는 변경되지 않습니다.
        expect(cy.env('DEMO')).to.be.true;
      }
    );
  }
);
```

#### 단일 테스트 설정

`cypress run`이나 `cypress open`의 재시도 횟수를 설정할 수 있습니다. 자세한 내용은 [테스트 재시도](https://docs.cypress.io/guides/guides/test-retries)를 확인하세요.

```js
it('should redirect unauthenticated user to sign-in page', {
    retries: {
      runMode: 3,
      openMode: 2
    }
  } () => {
    // 테스트 코드...
  })
})
```

### 동적으로 테스트 생성하기

자바스크립트를 사용하여 동적으로 테스트를 생성할 수 있습니다.

```js
describe('if your app uses jQuery', () => {
  ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
    it('triggers event: ' + event, () => {
      // 앱의 제이쿼리를 사용한다면 이벤트 콜백을 실행하는
      // 제이쿼리 이벤트를 트리거할 수 있습니다.
      cy.get('#with-jquery')
        .invoke('trigger', event)
        .get('[data-testid="messages"]')
        .should('contain', 'the event ' + event + 'was fired');
    });
  });
});
```

위의 코드는 4가지 테스트가 포함된 스위트를 생성합니다.

```
> if your app uses jQuery
  > triggers event: 'mouseover'
  > triggers event: 'mouseout'
  > triggers event: 'mouseenter'
  > triggers event: 'mouseleave'
```

### 단언 스타일

사이프러스는 BDD(`expect`, `should`)와 TDD(`assert`) 스타일의 기본 단언을 모두 지원합니다. [기본 단언](https://docs.cypress.io/guides/references/assertions)에서 자세한 내용을 확인하세요.

```js
it('can add numbers', () => {
  expect(add(1, 2)).to.eq(3);
});

it('can subtract numbers', () => {
  assert.equal(subtract(5, 12), -7, 'these numbers are equal');
});
```

`.should()` 명령과 별칭 `.and()`를 사용하여 단언을 쉽게 연결할 수 있습니다. [단언](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions)에서 자세한 내용을 확인하세요.

```js
cy.wrap(add(1, 2)).should('equal', 3);
```

## 테스트 실행하기

스펙 파일의 이름을 클릭하여 테스트를 실행할 수 있습니다.

## 테스트 상태

사이프러스 스펙이 모든 테스트를 완료하면 테스트는 다음 네 가지 상태 중 하나가 됩니다.

- 통과 (passed)
- 실패 (failed)
- 보류 (pending)
- 건너뜀 (skipped)

### 통과

단언에 실패하지 않고 모든 명령을 성공적으로 완료하면 테스트를 통과합니다.

테스트는 여러 번의 재시도 후에 통과할 수도 있습니다. 이 경우 명령 로그에 몇 가지 실패한 시도가 표시되지만 궁극적으로는 전체 테스트가 성공적으로 완료됩니다.

### 실패

문제가 발생하면 테스트는 실패합니다.

테스트가 실패하면 스크린숏과 비디오가 문제를 찾는 데 도움이 될 수 있습니다.

### 보류

여러 가지 방법으로 플레이스홀더 테스트를 작성할 수 있으며 사이프러스는 해당 테스트를 실행하지 않습니다. 사이프러스는 해당 테스트를 보류로 표시합니다.

다음 세 가지 테스트는 모두 보류로 표시됩니다.

```js
describe('TodoMVC', () => {
  it('is not written yet');

  it.skip('adds 2 todos', function () {
    cy.visit('/');
    cy.get('[data-testid="new-todo"]')
      .type('learn testing{enter}')
      .type('be cool{enter}');
    cy.get('[data-testid="todo-list"] li').should('have.length', 100);
  });

  xit('another test', () => {
    expect(false).to.true;
  });
});
```

### 건너뜀

마지막 테스트 상태는 테스트를 실행하려 했지만 어떤 런타임 오류로 인해 테스트를 건너뛴 것입니다.

예를 들어 어떤 페이지를 방문하는 `beforeEach` 훅을 공유하는 테스트 그룹을 가정해 보겠습니다.

```js
/// <reference types="cypress" />

describe('TodoMVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('hides footer initially', () => {
    cy.get('[data-testid="filters"]').should('not.exist');
  });

  it('adds 2 todos', () => {
    cy.get('[data-testid="new-todo"]')
      .type('learn testing{enter}')
      .type('be cool{enter}');
    cy.get('[data-testid="todo-list"] li').should('have.length', 2);
  });
});
```

`beforeEach` 훅이 완료되고 모든 테스트가 완료되면 두 테스트는 통과한 것입니다.

그러나 `beforeEach` 훅 내부의 명령이 실패하면 어떻게 될까요? 예를 들어 존재하지 않는 페이지를 방문한다고 가정해 보겠습니다.

```js
beforeEach(() => {
  cy.visit('/does-not-exist');
});
```

사이프러스가 첫 번째 테스트를 실행하면 `beforeEach` 훅이 실패합니다. 이제 첫 번째 테스트가 실패로 표시됩니다.

`beforeEach` 훅이 한 번 실패하면 사이프러스는 해당 블록의 나머지 테스트를 건너뜁니다. 동일하게 실패할 것이기 때문입니다.

## 테스트 감시하기

`cypress open`으로 실행하면 사이프러스는 스펙 파일의 변화를 감시합니다. 테스트 추가나 갱신 직후, 사이프러스는 테스트를 다시 로드하고 해당 스펙 파일의 모든 테스트를 실행합니다.

기능을 구현하는 동안 테스트를 추가하거나 편집할 수 있습니다. 사이프러스 사용자 인터페이스는 항상 최신 편집 결과를 반영합니다.

:::note 참고

많은 테스트가 포함된 단일 스펙 파일을 지속적으로 편집할 때는 `.only`로 실행할 테스트를 제한하면 편리합니다. 테스트를 더 작은 파일로 분할하는 것도 좋은 방법입니다.

:::

### 감시되는 것

#### 파일

- [사이프러스 설정](https://docs.cypress.io/guides/references/configuration)
- [cypress.env.json](https://docs.cypress.io/guides/guides/environment-variables)

#### 폴더

- E2E 디렉터리 (기본값은 `cypress/e2e/`)
- 지원 디렉터리 (기본값은 `cypress/support/`)

모든 하위 폴더와 내부 파일이 감시됩니다.

### 감시되지 않는 것

이외의 모든 것이 감시되지 않습니다.

대표적인 것은 다음과 같습니다.

- 앱 코드
- `node_modules`
- `cypress/fixtures/`

최신 JS 기반 웹 앱 스택을 사용하여 개발하는 경우에는 앱 코드(HTML, CSS, JS 등)를 감시하고 변경 사항이 있으면 앱을 다시 투명하게 로딩합니다.

### 설정

파일 감시를 비활성화하려면 [`watchForFileChanges`](https://docs.cypress.io/guides/references/configuration#Global) 설정 프로퍼티를 `false`로 설정하면 됩니다.

:::caution

`cypress run`에서는 아무 것도 감시되지 않습니다.

`watchForFileChanges` 프로퍼티는 `cypress open`을 이용해 사이프러스를 실행할 때만 적용됩니다.

:::

사이프러스에서 파일 감시 작동을 담당하는 것은 [`webpack-preprocessor`](https://github.com/cypress-io/cypress/tree/master/npm/webpack-preprocessor)입니다. 이것은 사이프러스와 함께 패키지된 기본 파일 감시자입니다.

파일 감시 작동에 대한 추가 제어가 필요한 경우에는 이 전처리기를 명시적으로 설정할 수 있습니다. 이는 감시 대상 설정이나, 변경 후 '업데이트' 이벤트 발생 전의 지연과 같은 작동을 설정하는 옵션을 제공합니다.

사이프러스는 다른 [파일 감시 전처리기](https://docs.cypress.io/plugins/directory)도 제공합니다. 사용하려면 명시적으로 설정해야 합니다.

- [사이프러스 감시 전처리기](https://github.com/cypress-io/cypress-watch-preprocessor)
- [사이프러스 웹팩 전처리기](https://github.com/cypress-io/cypress/tree/master/npm/webpack-preprocessor)
