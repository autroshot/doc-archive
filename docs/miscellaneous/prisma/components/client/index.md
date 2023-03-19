# 프리즈마 클라이언트

프리즈마 클라이언트는 데이터에 맞게 자동 생성되며 타입에 안전한 질의 작성기입니다.

## 설정하기

### 1. 필요 조건

프리즈마 클라이언트를 설정하려면 데이터베이스 연결, 프리즈마 클라이언트 생성기, 하나 이상의 모델이 있는 프리즈마 스키마 파일이 필요합니다.

```prisma title="schema.prisma"
datasource db {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
```

또한 프리즈마 CLI를 설치해야 합니다.

```shell
npm install prisma --save-dev
npx prisma
```

### 2. 설치

다음 명령을 사용하여 프로젝트에 프리즈마 클라이언트를 설치합니다.

```shell
npm install @prisma/client
```

이 명령은 `prisma generate` 명령도 실행하여 `node_modules/.prisma/client` 디렉터리에 프리즈마 클라이언트를 생성합니다.

### 3. 프리즈마 클라이언트를 사용하여 데이터베이스에 질의 보내기

```js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// 앱에서 prisma를 사용해 DB의 데이터를 읽고 씁니다.
```

`PrismaClient`를 인스턴스화한 후에는 코드에서 질의 보내기를 시작할 수 있습니다.

```js
// async 함수 안에서 동작합니다.
const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
})

const users = await prisma.user.findMany()
```

:::note 참고

질의는 `await`와 함께 사용하거나 `.then()`으로 연쇄한 경우에만 작동합니다. [`$transaction`](https://www.prisma.io/docs/concepts/components/prisma-client/transactions)을 사용하면 클라이언트가 모든 질의를 [질의 엔진](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine)에 트랜잭션으로 전달할 수 있습니다.

:::

:::note 참고

클라이언트 메서드는 [thenable](https://masteringjs.io/tutorials/fundamentals/thenable)입니다. `await`를 사용하거나 `.then()`으로 연쇄한 질의를 제외하고는, 자바스크립트 프라미스처럼 구현된 프리즈마 프라미스를 반환합니다.

:::

### 4. 애플리케이션의 진화

프리즈마 스키마에 반영된 데이터베이스를 변경할 때마다, 프리즈마 클라이언트를 수동으로 다시 생성하여 `node_modules/.prisma/client` 디렉터리에서 생성된 코드를 갱신해야 합니다.

```shell
prisma generate
```