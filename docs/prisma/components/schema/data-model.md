---
sidebar_position: 3
---

# 데이터 모델

프리즈마 스키마의 데이터 모델 정의 부분은 애플리케이션 모델(**프리즈마 모델**이라고도 부름)을 정의합니다.

모델의 역할은 다음과 같습니다.

- 앱 도메인의 **개체**를 나타냄
- 데이터베이스의 **테이블**(포스트그레SQL과 같은 관계형 데이터베이스)에 매핑됨
- 생성된 [프리즈마 클라이언트 API](../client/index.md)에서 사용 가능한 **질의**의 기초를 형성함
- 타입스크립트와 함께 사용하면, 프리즈마 클라이언트는 모델과 모델의 [변형](https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types)에 대한 생성된 **타입 정의**를 제공함. 그 결과 데이터베이스 접근을 타입에 완전히 안전하게 만듬

다음 스키마는 블로그 플랫폼을 묘사합니다.

```prisma {9-45}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}

model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[] @relation(references: [id])
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[] @relation(references: [id])
}

enum Role {
  USER
  ADMIN
}
```

데이터 모델 정의는 다음으로 구성됩니다.

- 모델 간의 관계를 포함하여 여러 필드를 정의하는 모델
- 열거형 (커넥터가 지원하는 경우)
- 필드와 모델의 동작을 변경하는 속성과 함수

데이터베이스의 모습은 다음과 같습니다.

![sample-database](https://user-images.githubusercontent.com/95019875/184317156-1bcc4bdc-d95e-44d6-8e33-14399d21d6e5.png)

하단의 질의는 이 데이터 모델에서 생성된 프리즈마 클라이언트를 사용하여 다음을 생성합니다.

- `User` 레코드
- 두 개의 중첩 `Post` 레코드
- 세 개의 중첩 `Category` 레코드

```ts
const user = await prisma.user.create({
  data: {
    email: 'ariadne@prisma.io',
    name: 'Ariadne',
    posts: {
      create: [
        {
          title: 'My first day at Prisma',
          categories: {
            create: {
              name: 'Office',
            },
          },
        },
        {
          title: 'How to connect to a SQLite database',
          categories: {
            create: [{ name: 'Databases' }, { name: 'Tutorials' }],
          },
        },
      ],
    },
  },
})
```

데이터 모델은 앱 도메인을 반영합니다.

예시:

- 전자 상거래 앱에는 `Customer`, `Order`, `Item`, `Invoice`와 같은 모델이 존재할 수 있음
- 소셜 미디어 앱에는 `User`, `Post`, `Photo`, `Message`와 같은 모델이 존재할 수 있음

## 분석과 마이그레이션

데이터 모델을 정의하는 방법은 두 가지가 있습니다.

- **데이터 모델을 직접 작성하고 프리즈마 마이그레이트 사용하기** - 데이터 모델을 직접 작성하고 [프리즈마 마이그레이트](https://www.prisma.io/docs/concepts/components/prisma-migrate)를 사용하여 데이터베이스에 매핑할 수 있습니다. 이 경우 데이터 모델은 앱 모델에 대한 단일 진실 공급원입니다.
- **분석을 통해 데이터 모델 생성하기** - 기존 데이터베이스가 있거나 데이터베이스 스키마를 SQL로 마이그레이션하는 것을 선호하는 경우 데이터베이스를 [분석](https://www.prisma.io/docs/concepts/components/introspection)하여 데이터 모델을 생성합니다. 이 경우 데이터베이스 스키마는 앱 모델에 대한 단일 진실 공급원입니다.

## 모델 정의하기

모델은 앱 도메인의 개체를 나타냅니다. 모델은 `model` 블록으로 표현되며 여러 필드를 정의합니다. 예시 데이터 모델의 `User`, `Profile`, `Post`, `Category`가 모델입니다.

블로그 플랫폼에 다음 모델을 추가하여 확장할 수 있습니다.

```prisma
model Comment {
  // 필드
}

model Tag {
  // 필드
}
```

### 테이블에 모델 이름 매핑하기

프리즈마 모델의 [명명 규칙(단수형, PascalCase)](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#naming-conventions)은 데이터베이스의 테이블 이름과 항상 일치하지는 않습니다. 데이터베이스에서 테이블의 이름을 짓는 일반적인 방식은 복수형과 [snake_case](https://en.wikipedia.org/wiki/Snake_case) 표기법을 사용하는 것입니다(예: `comments`). 이름이 `comments`인 테이블이 있는 데이터베이스를 분석한 프리즈마 모델 결과는 다음과 같습니다.

```prisma
model comments {
  // 필드
}
```

그러나 [`@@map`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#map-1) 속성을 사용하여 기반 데이터베이스의 원래 테이블 이름인 `comments`을 바꾸지 않고도 명명 규칙을 계속 준수하는 것이 가능합니다.

```prisma
model Comment {
  // 필드

  @@map("comments")
}
```

이 모델 정의를 이용해 프리즈마는 `Comment` 모델을 기반 데이터베이스의 `comments` 테이블에 자동으로 매핑합니다.

:::note 참고

열 이름과 열거형 값을 [`@map`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#map)으로 매핑하고 열거형을 `@@map`으로 매핑할 수 있습니다.

:::

`@map`과 `@@map`을 사용하여 기반 데이터베이스의 테이블과 열 이름에서 모델과 필드 이름을 분리하여 [프리즈마 클라이언트 API의 모양을 조정할 수 있습니다](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/use-custom-model-and-field-names#using-map-and-map-to-rename-fields-and-models-in-the-prisma-client-api).

## 필드 정의하기

모델의 속성을 필드라고 하며, 필드는 다음으로 구성됩니다.

- 필드 이름
- 필드 타입
- 선택적 타입 수정자
- [원시 데이터베이스 타입 속성](#원시-타입-매핑)을 포함한 선택적 속성

필드 타입은 구조를 결정하며 다음 두 범주 중 하나에 속합니다.

- 데이터베이스의 열(관계형 데이터베이스)에 매핑되는 스칼라 타입(열거형 포함)입니다. 그 예로는 `String`이나 `Int`가 있습니다.
- 모델 타입(이 필드를 관계 필드라고 함)입니다. 그 예로는 `Post`나 `Comment[]`가 있습니다.

### 스칼라 필드

다음 예시는 여러 스칼라 타입으로 `Comment`와 `Tag` 모델을 확장합니다. 일부 필드에는 속성이 포함됩니다.

```prisma {1-3, 7}
model Comment {
  id      Int    @id @default(autoincrement())
  title   String
  content String
}

model Tag {
  name String @id
}
```

[스칼라 필드 타입의 전체 목록](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types)을 참고하세요.

### 관계 필드

관계 필드의 타입은 다른 모델입니다.

예를 들어 하나의 게시물(`Post`)에는 여러 댓글(`Comment[]`)이 존재할 수 있습니다.

```prisma {3, 9}
model Post {
  id       Int       @id @default(autoincrement())
  // 다른 필드
  comments Comment[] // 하나의 게시물은 여러 댓글을 가질 수 있습니다.
}

model Comment {
  id     Int
  // 다른 필드
  Post   Post? @relation(fields: [postId], references: [id]) // 하나의 댓글은 하나의 게시물을 가질 수 있습니다.
  postId Int?
}
```

모델 간의 관계에 대한 자세한 예시와 정보는 [관계 문서](./relations/index.md)를 참고하세요.

### 원시 타입 매핑

버전 2.17.0 이상은 기반 데이터베이스 타입을 설명하는 원시 데이터베이스 타입 속성을 지원합니다.

```prisma {2}
model Post {
  id      Int    @id
  title   String @db.VarChar(200)
  content String
}
```

타입 속성의 사용법은 다음과 같습니다.

- 기반 제공자에 따라 다릅니다. (예: 포스트그레SQL은 `Boolean`으로 `@db.Boolean`를 사용하지만 MySQL은 `@db.TinyInt(1)`을 사용함)
- PascalCase로 작성합니다. (예: `VarChar` 또는 `Text`)
- 접두사가 `@db`입니다. 여기서 `db`는 스키마의 `datasource` 블록의 이름입니다.

또한 분석 과정 동안, 기반 원시 타입이 기본 타입이 아닌 경우에만 타입 속성이 스키마에 추가됩니다.

예를 들어 포스트그레SQL 제공자를 사용하는 경우, 기반 원시 타입이 `text`인 `string` 필드에는 타입 속성이 없습니다.

[스칼라 타입 및 제공자별 원시 데이터베이스 타입 속성의 전체 목록](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types)을 참고하세요.

#### 이점과 작업 흐름

- 프리즈마 마이그레이트가 데이터베이스에서 생성하는 정확한 원시 타입을 제어합니다. 예를 들어 `String`은 `@db.VarChar(200)`이나 `@db.Char(50)`가 될 수 있습니다.
- 분석할 때 풍부한 스키마를 볼 수 있습니다.

### 타입 수정자

필드 타입은 다음 두 수정자 중 하나를 추가하여 수정할 수 있습니다.

- `[]` - 필드를 목록으로 만듬
- `?` - 필드를 선택 사항으로 만듬

:::note 참고

타입 수정자를 결합하는 것은 불가능합니다. 선택적 목록은 지원되지 않습니다.

:::

#### 목록

다음 예시에는 스칼라 목록과 관련 모델의 목록이 포함되어 있습니다.

```prisma {3-4}
model Post {
  id       Int       @id @default(autoincrement())
  // 다른 필드
  comments Comment[] // 댓글 목록
  keywords String[] // 스칼라 목록
}
```

:::note 참고

스칼라 목록은 데이터베이스 커넥터가 원시 수준이나 프리즈마 수준에서 지원하는 경우에만 사용 가능합니다.

:::

#### 선택적 필드와 필수 필드

```prisma {3}
model Comment {
  id      Int     @id @default(autoincrement())
  title   String
  content String?
}

model Tag {
  name String @id
}
```

`?` 타입 수정자가 필드에 달려 있지 않으면 모델의 모든 레코드에 필드가 필요합니다. 이것은 두 가지 수준에 영향을 줍니다.

- **데이터베이스** - 필수 필드는 기반 데이터베이스의 `NOT NULL` 제약 조건을 통해 표시됨
- **프리즈마 클라이언트** - 앱 코드에서 모델을 나타내는 프리즈마 클라이언트의 생성된 타입스크립트 타입은, 런타임에서 항상 값을 전달하도록 해당 필드를 필요에 따라 정의함

:::note 참고

선택적 필드의 기본값은 `null`입니다.

:::

### 지원되지 않는 타입

관계형 데이터베이스를 분석할 때 지원되지 않는 타입은 [`Unsupported`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unsupported)로 추가됩니다.

```prisma
location    Unsupported("polygon")?
```

`Unsupported` 속성을 사용하면 프리즈마에서 아직 지원하지 않는 데이터베이스 타입에 대해 프리즈마 스키마의 필드를 정의할 수 있습니다.

예를 들어 MySQL의 `POLYGON` 타입은 현재 프리즈마에서 지원되지 않지만 이제 `Unsupported("polygon")` 타입을 사용하여 프리즈마 스키마에 추가하는 것이 가능합니다.

`Unsupported` 필드는 생성된 프리즈마 클라이언트 API에서 사용할 수 없지만 여전히 프리즈마의 [원시 데이터베이스 접근](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access) 기능을 사용하여 해당 필드를 질의할 수 있습니다.

:::note 참고

어떤 모델에 필수 `Unsupported` 필드가 있다면, 생성된 클라이언트에는 해당 모델의 `create`나 `update` 메서드가 포함되지 않습니다.

:::

## 속성 정의하기

속성은 필드나 모델 블록의 동작을 변경합니다.

다음 예시에서는 세 가지 필드 속성(`@id`, `@default`, `@unique`)과 한 가지 블록 속성(`@@unique`)을 사용합니다.

```prisma
model User {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  email     String  @unique
  isAdmin   Boolean @default(false)

  @@unique([firstName, lastName])
}
```

일부 속성은 인수를 허용합니다.

예를 들어 `@default`는 `true`나 `false`를 허용합니다.

```prisma
isAdmin   Boolean @default(false) // @default(value: false)의 짧은 형식입니다.
```

[필드와 블록 속성의 전체 목록](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attributes)을 참고하세요.

### ID 필드 정의하기

ID는 모델의 개별 레코드를 고유하게 식별합니다. 모델은 하나의 ID만 가질 수 있습니다.

관계형 데이터베이스에서 ID는 단일 필드이거나, 복수의 필드로 구성될 수 있습니다. 모델에 `@id`나 `@@id`가 없으면 대신 필수 `@unique` 필드나 `@@unique` 블록을 정의해야 합니다.

#### 관계형 데이터베이스에서 ID 정의하기

관계형 데이터베이스에서 ID는 `@id` 속성을 사용하는 단일 필드나, `@@id` 속성을 사용하는 복수의 필드로 정의할 수 있습니다.

##### 단일 필드 ID

다음 예시에서 `User` ID는 `id` 정수 필드로 표현됩니다.

```prisma {1}
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}
```

##### 복합 ID

다음 예시에서 `User` ID는 `firstName`과 `lastName` 필드의 조합으로 표현됩니다.

```prisma {6}
model User {
  firstName String
  lastName  String
  email     String  @unique
  isAdmin   Boolean @default(false)

  @@id([firstName, lastName])
}
```

##### 고유 식별자 `@unique` 필드

다음 예시에서 사용자는 `@unique` 필드로 고유하게 식별됩니다. `email` 필드는 모델의 고유 식별자 역할(프리즈마에 필요함)을 하므로 필수 필드여야 합니다.

```prisma {1}
model User {
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}
```

:::note 관계형 데이터베이스의 제약 조건의 이름

원한다면 기반 데이터베이스의 [주 키 제약 조건의 이름을 사용자 지정](https://www.prisma.io/docs/concepts/components/prisma-schema/names-in-underlying-database#constraint-and-index-names)할 수 있습니다.

:::

### 기본값 정의하기

`@default` 속성을 사용하여 모델의 스칼라 필드에 대한 기본값을 정의할 수 있습니다.

```prisma {2, 4}
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[] @relation(references: [id])
}
```

`@default` 속성은 다음 중 하나가 가능합니다.

- 기반 데이터베이스(관계형 데이터베이스만 해당)의 `DEFAULT` 값을 표현합니다.
- 프리즈마 수준 함수를 사용합니다. 예를 들어 `cuid()`와 `uuid()`는 모든 커넥터에 프리즈마의 [질의 엔진](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine)에서 제공됩니다.

기본값은 다음이 될 수 있습니다.

- 필드 타입에 해당하는 정적 값 - `5`(`Int`), `Hello`(`String`), `false`(`Boolean`)
- 정적 값의 목록 - 버전 `4.0.0` 이상, 지원되는 데이터베이스(포스트그레SQL, CockroachDB, 몽고DB)에서 가능합니다. (예: `[5, 6, 8]`(`Int[]`), `["Hello", "Goodbye"]`(`String[]`))
- 함수 - `now()`, `uuid()`

:::note 참고

함수에 대한 커넥터 지원은 [속성 함수 참고 문서](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attribute-functions)를 참고하세요.

:::

### 고유 필드 정의하기

모델에 고유 속성을 추가하여 해당 모델의 개별 레코드를 고유하게 식별할 수 있습니다. 고유 속성은 단일 필드에 `@unique` 속성을 사용하거나 복수의 필드(복합 고유 제약 조건으로도 불림)에 `@@unique` 속성을 사용하여 정의될 수 있습니다.

다음 예시에서 `email` 필드의 값은 고유해야 합니다.

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

다음 예시에서 `authorId`와 `title`의 조합은 고유해야 합니다.

```prisma {9}
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[] @relation(references: [id])

  @@unique([authorId, title])
}
```

:::note 관계형 데이터베이스의 제약 조건의 이름

원한다면 기반 데이터베이스의 [제약 조건의 이름을 사용자 지정](https://www.prisma.io/docs/concepts/components/prisma-schema/names-in-underlying-database#constraint-and-index-names)할 수 있습니다.

:::

### 색인 정의하기

`@@index`를 이용해 모델의 하나 또는 여러 필드에 대한 색인을 정의할 수 있습니다.

다음 예시는 `title`과 `content` 필드를 기반으로 다중 열 색인을 정의합니다.

```prisma {5}
model Post {
  id      Int     @id @default(autoincrement())
  title   String
  content String?

  @@index([title, content])
}
```

:::note 관계형 데이터베이스의 제약 조건의 이름

원한다면 기반 데이터베이스의 [색인의 이름을 사용자 지정](https://www.prisma.io/docs/concepts/components/prisma-schema/names-in-underlying-database#constraint-and-index-names)할 수 있습니다.

:::

## 열거형 정의하기

[열거형이 원시 수준이나 프리즈마 수준에서, 데이터베이스 커넥터에서 지원](https://www.prisma.io/docs/reference/database-reference/database-features#misc)된다면 데이터 모델에서 열거형을 정의할 수 있습니다.

열거형은 프리즈마 데이터 모델에서 스칼라 타입으로 간주됩니다. 따라서 기본적으로 프리즈마 클라이언트 질의에 반환값으로 포함됩니다.

열거형은 `enum` 블록으로 정의됩니다.

예를 들어 `User`에는 열거형 `Role`이 있습니다.

```prisma {4, 7-10}
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  role  Role    @default(USER)
}

enum Role {
  USER
  ADMIN
}
```

## 함수 사용하기

프리즈마 스키마는 여러 함수를 지원합니다. 이 함수를 모델의 필드에서 기본값을 지정하는 데 사용할 수 있습니다.

예를 들어 다음 `createdAt`의 기본값은 `now()`입니다.

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
}
```

`cuid()`와 `uuid()`는 프리즈마에 의해 구현되므로 기반 데이터베이스 스키마에서 **보이지 않습니다**. 직접 프리즈마 스키마를 변경하고 프리즈마 클라이언트를 생성하여 분석을 사용할 때도 이 함수를 사용할 수 있습니다. 이 경우에 값은 프리즈마의 질의 엔진에 의해 생성됩니다.

`autoincrement()`, `now()`, `dbgenerated()`에 대한 지원은 데이터베이스마다 다릅니다.

관계형 데이터베이스 커넥터는 데이터베이스 수준에서 `autoincrement()`, `dbgenerated()`, `now()`를 구현합니다. 몽고DB 커넥터는 `autoincrement()`, `dbgenerated()`를 지원하지 않으며 `now()`는 프리즈마 수준에서 구현됩니다. `auto()` 함수는 `ObjectId`를 생성하는 데 사용됩니다.

## 관계

모델 간의 관계에 대한 자세한 예시와 정보는 [관계 문서](./relations/index.md)를 참고하세요.

## 프리즈마 클라이언트의 모델

### 질의(CRUD)

데이터 모델 정의의 모든 모델은 생성된 프리즈마 클라이언트 API에서 여러 CRUD 질의를 생성합니다.

- `findMany`
- `findUnique`
- `create`
- `update`
- `upsert`
- `delete`
- `updateMany`
- `deleteMany`

프리즈마 클라이언트 인스턴스에서 생성된 프로퍼티를 통해 작업에 접근할 수 있습니다. 기본적으로 프로퍼티의 이름은 모델 이름의 소문자 형식입니다. (예: `User` 모델은 `user`, `Post` 모델은 `post`)

다음 예시에서는 프리즈마 클라이언트 API에서 `user` 프로퍼티를 사용합니다.

```ts
const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
  },
})
const allUsers = await prisma.user.findMany()
```

### 타입 정의

프리즈마 클라이언트는 모델 구조를 반영하는 **타입 정의**를 생성합니다. 이는 생성된 [`@prisma/client`](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#the-prismaclient-npm-package) 노드 모듈의 일부입니다.

타입스크립트를 사용할 때, 타입 정의는 모든 데이터베이스 질의가 타입에 완전히 안전하게 만듭니다. 그리고 타입 정의는 컴파일 타임에 유효성을 확인하는 데 사용됩니다. 이는 `select`나 `include`를 사용하는 부분적인 질의에도 적용됩니다.

순수 자바스크립트를 사용하는 경우에도 타입 정의는 여전히 `@prisma/client` 노드 모듈에 포함되어 편집기의 인텔리센스나 자동 완성과 같은 기능을 활성화합니다.

:::note 참고

실제 타입은 `.prisma/client` 폴더에 저장됩니다. `@prisma/client/index.d.ts`는 이 폴더의 내용을 내보냅니다.

:::

예를 들어 위의 `User` 모델에 대한 타입 정의는 다음과 같습니다.

```ts
export type User = {
  id: number
  email: string
  name: string | null
  role: string
}
```

관계 필드 `posts`와 `profile`은 기본적으로 타입 정의에 포함되지 않습니다. 그러나 `User` 타입의 변형이 필요하다면 프리즈마 클라이언트에서 생성한 일부 도우미 타입을 사용하여 정의할 수 있습니다. 이 경우, 도우미 타입은 `UserGetIncludePayload`와 `UserGetSelectPayload`라고 부릅니다.
