---
sidebar_position: 1
---

# 소개

## 프리즈마는 무엇인가요?

프리즈마는 차세대 ORM으로 오픈 소스입니다.

다음으로 구성됩니다.

- **프리즈마 클라이언트** - 노드 및 타입스크립트를 위한 자동 생성되며 타입에 안전한 쿼리 작성기

- **프리즈마 마이그레이트** - 마이그레이션 시스템
- **프리즈마 스튜디오** - 데이터베이스의 데이터를 보고 편집하는 GUI

프리즈마 클라이언트는 대부분의 노드나 타입스크립트 백엔드 애플리케이션(서버리스 앱과 마이크로서비스 포함)에서 사용할 수 있습니다. REST API, GraphQL API, gRPC API를 비롯해 데이터베이스가 필요한 모든 곳에서 사용할 수 있습니다.

## 프리즈마는 어떻게 작동하나요?

### 프리즈마 스키마

프리즈마 툴킷의 도구를 사용하는 모든 프로젝트는 [프리즈마 스키마 파일](./components/schema/index.md)로 시작합니다. 개발자는 프리즈마 스키마를 이용하여 직관적인 데이터 모델링 언어로 앱 모델을 정의할 수 있습니다. 스키마에는 데이터베이스 연결과 제너레이터 정의가 포함됩니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

:::note 참고

프리즈마 스키마에는 강력한 데이터 모델링 기능이 있습니다. 예를 들어 [프리즈마 클라이언트 API의 관계 작업](./components/client/relation-queries/index.md)을 더 쉽게 만들어주는 프리즈마 수준의 [관계 필드](./components/schema/relations/index.md)를 정의할 수 있습니다.

위의 예시에서 `User`의 `posts` 필드는 프리즈마 수준에서만 정의됩니다. 즉, 기반 데이터베이스에서 외래 키로 명시되지 않습니다.

:::

이 스키마에서는 다음 세 가지를 설정합니다.

- **데이터 소스** - 환경 변수를 통해 데이터베이스 연결을 지정함
- **제너레이터** - 프리즈마 클라이언트를 생성함
- **데이터 모델** - 앱 모델을 정의함

### 프리즈마 데이터 모델

이 페이지에서는 데이터 모델에 중점을 둡니다. 각 문서 페이지에서 [데이터 소스](./components/schema/data-sources.md) 및 [제너레이터](./components/schema/generators.md)에 대해 자세히 알아볼 수 있습니다.

#### 프리즈마 모델의 기능

데이터 모델은 [모델](./components/schema/data-model.md#모델-정의하기)의 집합입니다.

모델에는 두 가지 주요 기능이 있습니다.

- 관계형 데이터베이스의 테이블 또는 몽고DB의 컬렉션을 나타냄
- 프리즈마 클라이언트 API에서 쿼리의 기반을 제공함

#### 데이터 모델 가져오기

데이터 모델을 프리즈마 스키마로 가져오기 위한 두 가지 주요 워크플로가 있습니다.

- 데이터 모델을 직접 작성하고 [프리즈마 마이그레이트](https://www.prisma.io/docs/concepts/components/prisma-migrate)를 사용하여 데이터베이스에 매핑함
- 데이터베이스를 [분석](https://www.prisma.io/docs/concepts/components/introspection)하여 데이터 모델 생성함

데이터 모델이 정의되면 모델에 대한 CRUD를 비롯한 더 많은 쿼리를 표시하는 [프리즈마 클라이언트를 생성](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)할 수 있습니다. 타입스크립트를 사용하는 경우에는 모든 쿼리에 대해 완전한 타입 안전성을 얻을 수 있습니다. 이는 모델 필드의 하위 집합만 검색하는 경우에도 적용됩니다.

### 프리즈마 클라이언트로 데이터베이스에 접근하기

#### 프리즈마 클라이언트 생성하기

프리즈마 클라이언트를 사용하기 위한 첫 번째 단계는 `@prisma/client` npm 패키지를 설치하는 것입니다.

```bash
$npm install @prisma/client
```

`@prisma/client` 패키지를 설치하면 프리즈마 스키마를 읽고 프리즈마 클라이언트 코드를 생성하는 `prisma generate` 명령이 호출됩니다. 코드는 [기본적으로 `node_modules/.prisma/client` 폴더에 생성됩니다](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#the-prismaclient-npm-package).

데이터 모델을 변경한 후에는 프리즈마 클라이언트를 수동으로 다시 생성하여 `node_modules/.prisma/client` 내부의 코드를 갱신해야 합니다.

```bash
$prisma generate
```

#### 프리즈마 클라이언트를 사용하여 데이터베이스에 쿼리 보내기

프리즈마 클라이언트가 생성되면 코드로 가져와서 데이터베이스에 쿼리를 보낼 수 있습니다.

설정 코드는 다음과 같습니다.

##### 프리즈마 클라이언트 가져오기 및 인스턴스화

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

이제 생성된 프리즈마 클라이언트 API를 통해 쿼리 전송을 시작할 수 있습니다.

모든 프리즈마 클라이언트 쿼리는 오래된 순수 자바스크립트 객체를 반환합니다.

[프리즈마 클라이언트 API 참고](./components/client/index.md)에서 가능한 작업을 확인할 수 있습니다.

#### 타입스크립트와 함께 사용하기

타입스크립트를 사용할 때 쿼리의 결과는 정적으로 입력되므로 존재하지 않는 속성에 실수로라도 접근할 수 없게 됩니다. 그리고 모든 오타는 컴파일 타임에 포착됩니다. [생성된 타입의 고급 사용법](https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types) 문서에서 프리즈마 클라이언트의 생성된 타입을 활용하는 방법을 확인할 수 있습니다.

