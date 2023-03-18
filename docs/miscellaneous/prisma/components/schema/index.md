# 스키마

**프리즈마 스키마 파일(스키마 파일, 프리즈마 스키마, 스키마)**은 프리즈마 설정을 위한 기본 설정 파일입니다. 일반적으로 `schema.prisma`라고 부르며 다음으로 구성됩니다.

- **데이터 소스** - 프리즈마가 연결해야 하는 데이터 소스의 세부 정보를 지정함 (예: 포스트그레SQL 데이터베이스)
- **생성기** - 데이터 모델을 기반으로 생성되어야 하는 클라이언트를 지정함 (예: 프리즈마 클라이언트)
- **데이터 모델 정의** - 앱 모델(데이터 소스별 데이터의 형태)과 그 관계를 지정함

자세한 내용은 [프리즈마 스키마 API 참고](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)를 확인하세요.

`prisma` 명령이 호출될 때마다 CLI는 일반적으로 스키마 파일에서 정보를 읽습니다.

다음은 그 예시입니다.

- `prisma generate` - 프리즈마 스키마에서 위에서 언급한 모든 정보를 읽어 올바른 데이터 소스 클라이언트 코드(예: 프리즈마 클라이언트)를 생성함
- `prisma migrate dev` - 데이터 소스와 데이터 모델 정의를 읽어 새로운 마이그레이션을 생성함

또한 스키마 파일 내의 [환경 변수를 사용](https://www.prisma.io/docs/concepts/components/prisma-schema#accessing-environment-variables-from-the-schema)하여 CLI 명령이 호출될 때 설정 옵션을 제공할 수 있습니다.

## 예시

다음을 지정하는 프리즈마 스키마 파일 예시가 하단에 있습니다.

- 데이터 소스 (포스트그레SQL 또는 몽고DB)
- 생성기 (프리즈마 클라이언트)
- 두 개의 모델(하나의 관계 포함)과 하나의 `enum`이 있는 데이터 모델 정의
- 여러 [기본 데이터 타입 속성](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#native-type-mapping) (`@db.VarChar(255)`, `@db.ObjectId`)

```prisma
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
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}
```

## 명명

스키마 파일의 기본 이름은 `schema.prisma`입니다. 스키마 파일의 이름이 기본값이면 프리즈마 CLI는 CLI 명령을 호출한 디렉터리(또는 해당 하위 디렉터리)에서 스키마를 자동으로 감지합니다.

파일 이름이 다른 경우 프리즈마 CLI에 스키마 파일 경로와 함께 `--schema` 인수를 건네줄 수 있습니다.

예시:

```bash
prisma generate --schema ./database/myschema.prisma
```

## 구문

스키마 파일은 PSL(Prisma Schema Language, 프리즈마 스키마 언어)로 작성됩니다.

### VS 코드

PSL에 대한 구문 강조 표시는 [VS 코드 확장](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)에서 사용할 수 있습니다. 이를 통해 프리즈마 스키마의 내용을 자동으로 포맷팅하고 구문 오류를 표시할 수 있습니다. [편집기에서 프리즈마 설정하기](https://www.prisma.io/docs/guides/development-environment/editor-setup)에서 자세한 내용을 확인하세요.

### 깃허브

깃허브의 PSL 코드 조각은 `.prisma` 파일 확장자를 사용하거나 마크다운의 분리된 코드 블록에 `prisma` 주석을 추가하여 구문 강조 표시를 렌더링할 수 있습니다.

~~~markdown
```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
```
~~~

## 프리즈마 스키마 파일의 위치

프리즈마 CLI는 다음 순서로 해당 위치에서 프리즈마 스키마 파일을 찾습니다.

1. `introspect`, `generate`, `migrate`, `studio` 명령에서 사용 가능한 [`--schema` 플래그](https://www.prisma.io/docs/reference/api-reference/command-reference)에 지정된 위치

    ```bash
    prisma generate --schema=./alternative/schema.prisma
    ```

2. `package.json` 파일에 지정된 위치 (버전 2.7.0 이상)

    ```json
    "prisma": {
      "schema": "db/schema.prisma"
    }
    ```

3. 기본 위치
   - `./prisma/schema.prisma`
   - `./schema.prisma`

프리즈마 CLI는 사용할 스키마 파일의 경로를 출력합니다.

다음 예시는 `prisma db pull`에 대한 터미널 출력을 보여줍니다.

```text {1}
Environment variables loaded from prisma/.env
Prisma Schema loaded from prisma/schema.prisma

Introspecting based on datasource defined in prisma/schema.prisma …

✔ Introspected 4 models and wrote them into prisma/schema.prisma in 239ms

Run prisma generate to generate Prisma Client.
```

## 스키마에서 환경 변수 접근하기

CLI 명령이 호출되거나 프리즈마 클라이언트 질의가 실행될 때 환경 변수를 사용하여 설정 옵션을 제공할 수 있습니다.

스키마에서 환경 변수를 사용하면 **스키마 파일 외부에 비밀을 유지**할 수 있어서 다른 환경에서 스키마를 사용할 수 있게 됩니다. 그 결과 **스키마의 이식성이 향상**됩니다.

`env()` 함수를 사용하여 환경 변수에 접근할 수 있습니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`env()` 함수는 다음 위치에서 사용할 수 있습니다.

- 데이터 소스 URL
- 생성기 이진 대상

자세한 내용은 [환경 변수](https://www.prisma.io/docs/guides/development-environment/environment-variables)를 참고하세요.

## 주석

스키마 파일에는 두 가지 유형의 주석이 있습니다.

- `// comment` - 이 주석은 읽는 사람의 이해를 돕기 위한 것으로 스키마 파일의 AST(Abstract Syntax Tree, 추상 구문 트리)에는 존재하지 않습니다.
- `/// comment` - 이 주석은 스키마 파일의 AST에 AST 노드에 대한 설명으로 표시됩니다. 이렇게 하면 도구에서 주석을 사용하여 추가 정보를 제공할 수 있습니다. 모든 주석은 사용 가능한 노드 옆에 첨부됩니다. [프리 플로팅 주석](https://github.com/prisma/prisma/issues/3544)은 지원되지 않으며 AST에 포함되지 않습니다.

예시:

```prisma
/// 이 주석은 AST의 User 노드에 첨부됩니다.
model User {
  /// 이 주석은 AST의 id 노드에 첨부됩니다.
  id     Int   @default(autoincrement())
  // 이 주석은 개발자를 위한 것입니다.
  weight Float /// 이 주석은 weight 노드에 첨부됩니다.
}

// 이 주석은 개발자를 위한 것입니다.
// AST에 나타나지 않습니다.

/// 이 주석은 Customer 노드에 첨부됩니다.
model Customer {}
```

## 자동 포맷팅

프리즈마는 자동으로 `.prisma` 파일을 포맷팅합니다. `.prisma` 파일을 포맷하는 방법은 두 가지가 있습니다.

- [`prisma format`](https://www.prisma.io/docs/reference/api-reference/command-reference#forma) 명령을 실행함
- [프리즈마 VS 코드 확장](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)을 설치하고 [VS 코드 포맷 작업](https://code.visualstudio.com/docs/editor/codebasics#_formatting)을 수동으로 호출하거나 저장할 때 호출함

설정 옵션은 없습니다. 포맷팅 규칙은 고정되어 있습니다. 이는 고랭의 `gofmt`과 유사하고 자바스크립트의 `prettier`와는 다릅니다.

포맷팅 규칙은 [문서](https://www.prisma.io/docs/concepts/components/prisma-schema#formatting-rules)를 참고하세요.

