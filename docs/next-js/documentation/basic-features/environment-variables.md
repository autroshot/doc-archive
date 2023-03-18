---
sidebar_position: 8
---

# 환경 변수

넥스트는 기본적으로 환경 변수를 지원하며 다음을 수행할 수 있습니다.

- `.env.local`을 이용해 환경 변수를 로드하기
- `NEXT_PUBLIC_` 접두사로 환경 변수를 브라우저에 노출시키기

## 환경 변수 로드하기

넥스트는 환경 변수를 `.env.local`에서 `process.env`로 로드하는 내장 기능을 갖추고 있습니다.

다음은 `.env.local` 예시입니다.

```bash
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

이제 `process.env.DB_HOST`, `process.env.DB_USER`, `process.env.DB_PASS`가 노드 환경에 자동으로 로드되서 넥스트 데이터 가져오기 메서드와 API 경로에서 사용할 수 있게 됩니다.

예를 들어 `getStaticProps`에서 다음과 같이 사용할 수 있습니다.

```js title="pages/index.js"
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  // ...
}
```

:::note 참고

서버 전용 비밀을 안전하게 보호하기 위해 환경 변수는 빌드 타임에 평가되므로 실제로 사용된 환경 변수만 포함됩니다. `process.env`는 표준 자바스크립트 객체가 아니므로 [객체 분해](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)를 사용할 수 없습니다. 환경 변수는 `const { PUBLISHABLE_KEY } = process.env`가 아닌 `process.env.PUBLISHABLE_KEY`로 참조해야 합니다.

:::

:::note 참고

넥스트는 `.env*` 파일 내부의 변수(`$VAR`)를 자동으로 확장합니다. 이렇게 하면 다음과 같이 다른 비밀을 참조할 수 있게 됩니다.

```bash
# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
```

변수 값에서 `$`를 사용하고 싶다면 `\$`와 같이 이스케이프해야 합니다.

예시:

```bash
# .env
A=abc

# preabc가 됩니다.
WRONG=pre$A

# pre$A가 됩니다.
CORRECT=pre\$A
```

:::

:::note 참고

`/src` 폴더를 사용하는 경우, 넥스트는 `/src` 폴더가 아닌 상위 폴더에서만 `.env` 파일을 로드한다는 점을 주의해야 합니다.

:::

## 브라우저에 환경 변수 노출시키기

기본적으로 환경 변수는 노드 환경에서만 사용할 수 있습니다. 즉, 브라우저에 노출되지 않습니다.

브라우저에 변수를 노출하려면 변수에 `NEXT_PUBLIC_` 접두사를 붙여야 합니다.

예시:

```bash
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

이제 `process.env.NEXT_PUBLIC_ANALYTICS_ID`는 노드 환경에 자동으로 로드되어 코드의 어디에서나 사용할 수 있게 되었습니다. 값은 `NEXT_PUBLIC_` 접두사로 인해 브라우저로 전송되는 자바스크립트에 인라인됩니다 . 이 인라인은 빌드 타임에 발생하므로 프로젝트를 빌드할 때 다양한 `NEXT_PUBLIC_` 환경을 설정해야 합니다.

```jsx title="pages/index.js"
import setupAnalyticsService from '../lib/my-analytics-service';

// NEXT_PUBLIC_ANALYTICS_ID에는 NEXT_PUBLIC_ 접두사가 있으므로 여기서 사용이 가능합니다.
// 이 코드는 빌드 타임에 setupAnalyticsService('abcdefghijk')로 변환됩니다.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);

function HomePage() {
  return <h1>Hello World</h1>;
}

export default HomePage;
```

다음과 같은 동적 조회는 인라인되지 않습니다.

```js
// 변수를 사용하므로 인라인되지 않습니다.
const varName = 'NEXT_PUBLIC_ANALYTICS_ID';
setupAnalyticsService(process.env[varName]);

// 변수를 사용하므로 인라인되지 않습니다.
const env = process.env;
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID);
```

## 기본 환경 변수

일반적으로 `.env.local` 파일은 하나만 필요합니다. 그러나 때로는 `development`(`next dev`)나 `production`(`next start`) 환경에 대한 기본값을 추가해야 할 수도 있습니다.

넥스트를 사용하면 `.env`(모든 환경), `.env.development`(개발 환경), `.env.production`(프로덕션 환경)에서 기본값을 설정할 수 있습니다.

`.env.local`은 항상 기본 설정을 재정의합니다.

:::note 참고

`.env`, `.env.development`, `.env.production` 파일은 기본값을 정의하므로 저장소에 포함되어야 합니다. `.env*.local` 파일은 무시되어야 하므로 `.gitignore`에 추가해야 합니다. `.env.local`은 비밀을 저장할 수 있는 곳입니다.

:::

## 베르셀의 환경 변수

넥스트 앱을 베르셀(Vercel)에 배포할 때 환경 변수는 [프로젝트 설정](https://vercel.com/docs/environment-variables)에서 설정할 수 있습니다.

모든 유형의 환경 변수가 여기에 설정되어야 합니다. 개발에 사용되는 환경 변수도 나중에 [로컬 장치에 다운로드 할 수 있습니다](https://vercel.com/docs/environment-variables#development-environment-variables).

[개발 환경 변수](https://vercel.com/docs/environment-variables#development-environment-variables)를 설정한 경우, 다음 명령을 사용하면 해당 환경 변수를 로컬 시스템에서 사용하기 위해 `.env.local`로 가져올 수 있습니다.

```bash
vercel env pull .env.local
```

베르셀 CLI를 사용하여 배포할 때는 업로드해서는 안 되는 파일이 포함된 [`.vercelignore`](https://vercel.com/guides/prevent-uploading-sourcepaths-with-vercelignore?query=vercelignore#allowlist) 파일을 추가해야 합니다. 이는 일반적으로 `.gitignore`에 포함된 것과 동일합니다.

## 테스트 환경 변수

`development`와 `production` 환경 외에도 세 번째 옵션을 사용할 수 있습니다. 바로 `test` 환경입니다.

개발이나 프로덕션 환경에 대한 기본값을 설정하는 것과 동일한 방식으로, `testing` 환경에 대한 `.env.test` 파일을 만들 수 있습니다(이 파일은 이전 두 개만큼 일반적이지는 않습니다). 넥스트는 `testing` 환경에서 `.env.development`나 `.env.production`의 환경 변수를 로드하지 않습니다.

이것은 테스트 목적으로만 특정 환경 변수를 설정해야 하는 `jest`나 `cypress` 같은 도구로 테스트를 실행할 때 유용합니다. `NODE_ENV`가 `test`로 설정되어 있으면 테스트 기본값이 로드되지만, 보통은 테스트 도구에서 이를 처리하므로 별도로 설정하지 않아도 됩니다.

`test`와 `development`, `production` 환경 간에는 약간의 차이가 존재합니다. 테스트가 모든 사람에게 동일한 결과를 줘야 하기 때문에 `.env.local`이 로드되지 않습니다. 이는 모든 테스트 실행이 기본 세트를 재정의하는 `.env.local`을 무시하여 동일한 환경 기본값을 사용하게 만듭니다.

:::note 참고

기본 환경 변수와 유사하게 `.env.test` 파일은 저장소에 포함되어야 하며 `.env.test.local`는 포함되지 말아야 합니다. `.env*.local`가 `.gitignore`를 통해 무시되어야 하기 때문입니다.

:::

단위 테스트를 실행하는 동안 `@next/env` 패키지의 `loadEnvConfig` 함수를 활용하여 넥스트와 동일한 방식으로 환경 변수를 로드할 수 있습니다.

```jsx
// 테스트 설정을 위해 Jest 글로벌 설정 파일이나 이와 유사한 파일에
// 다음과 같은 코드를 작성할 수 있습니다.
import { loadEnvConfig } from '@next/env';

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
```

## 환경 변수 로드 순서

환경 변수는 다음 순서대로 조회되며 변수가 발견되면 조회가 중지됩니다.

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (`NODE_ENV`가 `test`일 때는 확인하지 않음)
4. `.env.$(NODE_ENV)`
5. `.env`

예를 들어 `NODE_ENV`가 `development`이고 환경 변수를 `.env.development.local`과 `.env` 모두에 정의하면 `.env.development.local`의 값이 사용됩니다.

:::note 참고

`NODE_ENV`에 허용되는 값은 `production`, `development`, `test`입니다.

:::
