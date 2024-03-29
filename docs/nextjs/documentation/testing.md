---
sidebar_position: 6
---

# 테스트

## 사이프러스

사이프러스는 E2E(End-to-End) 및 통합 테스트에 사용되는 테스트 러너입니다.

### 빠른 시작

[with-cypress 예시](https://github.com/vercel/next.js/tree/canary/examples/with-cypress)와 `create-next-app`을 사용하여 빠르게 시작할 수 있습니다.

```bash
npx create-next-app@latest --example with-cypress with-cypress-app
```

### 수동 설정

사이프러스를 시작하려면 다음과 같이 `cypress` 패키지를 설치합니다.

```bash
npm install --save-dev cypress
```

`package.json` 스크립트 필드에 사이프러스를 추가합니다.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "cypress": "cypress open",
}
```

사이프러스를 처음 실행하여 권장 폴더 구조를 사용하는 예시를 생성합니다.

```bash
npm run cypress
```

생성된 예시와 사이프러스 문서의 [첫 번째 테스트 작성하기](https://docs.cypress.io/guides/getting-started/writing-your-first-test)를 살펴보며 사이프러스에 익숙해질 수 있습니다.

테스트 파일의 끝에 `export {}`를 추가해 모듈로 만들어 오류를 막습니다.

### 첫 번째 사이프러스 통합 테스트 만들기

다음과 같은 두 개의 넥스트 페이지가 있다고 가정해 보겠습니다.

```jsx title="pages/index.js"
import Link from 'next/link';

export default function Home() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  );
}
```

```jsx title="pages/about.js"
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
```

탐색이 올바르게 작동하는지 확인하는 테스트를 추가합니다.

```jsx title="cypress/integration/app.spec.js"
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // 색인 페이지에서 시작합니다.
    cy.visit('http://localhost:3000/');

    // "about"을 포함하는 href 속성을 가진 링크를 찾고 클릭합니다.
    cy.get('a[href*="about"]').click();

    // 새 url은 "/about"을 포함해야 합니다.
    cy.url().should('include', '/about');

    // 새 페이지는 "About Page"가 있는 h1을 포함해야 합니다.
    cy.get('h1').contains('About Page');
  });
});
```

`cypress.json` 설정 파일에 `"baseUrl": "http://localhost:3000"`을 추가하면 `cy.visit("http://localhost:3000/")` 대신 `cy.visit("/")`을 사용할 수 있습니다.

### 사이프러스 테스트 실행하기

사이프러스는 실제 넥스트 앱을 테스트하므로 사이프러스를 시작하기 전에 넥스트 서버가 실행 중이어야 합니다. 앱이 작동하는 방식과 더 유사하도록 프로덕션 코드에 대해 테스트를 실행하는 것이 좋습니다.

`npm run build`와 `npm run start`를 실행한 다음 다른 터미널 창에서 `npm run cypress`을 실행하여 사이프러스를 시작합니다.

:::note 참고

또는 `start-server-and-test` 패키지를 설치하고 `package.json` 스크립트 필드에 `"test": "start-server-and-test start http://localhost:3000 cypress"`를 추가하여 사이프러스와 함께 넥스트 프로덕션 서버를 시작할 수 있습니다. 새로운 변경 사항 후에는 앱을 다시 빌드해야 합니다.

:::

### 지속적 통합(CI) 준비하기

지금까지 사이프러스를 실행하면 CI 환경에 적합하지 않은 대화형 브라우저가 열렸습니다. `cypress run` 명령을 사용하여 헤드리스로 사이프러스를 실행할 수도 있습니다.

```json title="package.json"
"scripts": {
  //...
  "cypress": "cypress open",
  "cypress:headless": "cypress run",
  "e2e": "start-server-and-test start http://localhost:3000 cypress",
  "e2e:headless": "start-server-and-test start http://localhost:3000 cypress:headless"
}
```

[사이프러스 지속적 통합 문서](https://docs.cypress.io/guides/continuous-integration/introduction)에서 사이프러스와 지속적 통합에 대해 자세히 알아보세요.
