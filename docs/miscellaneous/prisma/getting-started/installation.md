---
sidebar_position: 1
---

# 설치하기

:::note 참고

이 시작하기에서는 타입스크립트와 플래닛스케일을 사용합니다. 다른 언어나 데이터베이스를 사용한다면 [원문](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)을 확인하세요.

:::

프리즈마를 데이터베이스에 연결하고 데이터베이스 접근를 위한 프리즈마 클라이언트를 생성하여 기존 노드(Node.js) 또는 타입스크립트 프로젝트에 프리즈마를 추가하는 방법을 알아보겠습니다.

다음 자습서에서는 프리즈마 CLI, 프리즈마 클라이언트, 프리즈마 마이그레이트를 소개합니다.

## 필요 조건

- `package.json`이 포함된 기존 노드 프로젝트
- 컴퓨터에 설치된 노드
- 실행 중인 플래닛스케일 데이터베이스 서버

:::note 참고

이 자습서에서는 데이터베이스의 `main` 브랜치로 푸시할 수 있다고 가정합니다. `main` 브랜치가 프로덕션으로 승격된 경우에는 이 작업을 수행하지 말아야 합니다.

:::

## 프로젝트 설정 만들기

첫 번째 단계로 `package.json` 파일이 있는 프로젝트 디렉터리로 이동합니다.

다음으로 프리즈마 CLI를 개발 종속성으로 추가합니다.

```bash
npm install prisma --save-dev
```

프리즈마 프리티어 플러그인은 [prettier-plugin-prisma](https://www.npmjs.com/package/prettier-plugin-prisma)에서 확인할 수 있습니다.

이제 `npx`를 접두사로 붙여 프리즈마 CLI를 호출할 수 있습니다.

```bash
npx prisma
```

다음 명령으로 프리즈마 스키마 파일을 생성하여 프리즈마 프로젝트를 설정합니다.

```bash
npx prisma init
```

이 명령은 두 가지 작업을 수행합니다.

- `prisma`라는 새 디렉터리를 생성합니다. 이 안에는 데이터베이스 연결 변수와 스키마 모델이 있는 프리즈마 스키마가 포함된 `schema.prisma`이라는 파일이 들어 있습니다.
- 프로젝트의 루트 디렉터리에 환경 변수(예: 데이터베이스 연결)를 정의하는 데 사용되는 `.env` 파일을 생성합니다.

