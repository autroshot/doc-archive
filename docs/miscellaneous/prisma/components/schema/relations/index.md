# 관계

관계는 프리즈마 스키마에서 두 모델 간의 **연결**입니다.

예를 들어 한 사용자가 여러 블로그 게시물을 가질 수 있기 때문에 `User`와 `Post` 사이에는 일대다 관계가 있습니다.

다음 프리즈마 스키마는 `User`과 `Post` 모델 간의 일대다 관계를 정의합니다.

```prisma {2, 6-7}
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}
```

프리즈마 수준에서 `User`와 `Post` 관계는 다음으로 구성됩니다.

- 두 개의 관계 필드 - `author`와 `posts`. 관계 필드는 프리즈마 수준에서 모델 간의 연결을 정의하며 **데이터베이스에는 존재하지 않습니다**. 이 필드는 프리즈마 클라이언트를 생성하는 데 사용됩니다.
- 스칼라 `authorId` 필드 - `@relation` 속성에서 이 필드를 참조합니다. 이 필드는 **데이터베이스에 존재합니다**. `Post`와 `User`를 연결하는 외래 키입니다.

프리즈마 수준에서 두 모델 간의 연결은 항상 관계의 **양쪽**에 있는 관계 필드로 표현됩니다.

## 데이터베이스의 관계

### 관계형 데이터베이스

다음 개체 관계 다이어그램은 관계형 데이터베이스의 `User`와 `Post` 테이블 간에 동일한 일대다 관계를 정의합니다.

![one-to-many](https://user-images.githubusercontent.com/95019875/184476831-d3bcee9e-03bf-48c9-a4bf-b026b20e43e7.png)

SQL에서는 **외래 키**를 사용하여 두 테이블 간의 관계를 생성합니다. 외래 키는 관계의 **한쪽**에 저장됩니다.

위의 예시는 다음으로 구성됩니다.

- `Post` 테이블의 `authorId`라는 외래 키 열
- `User` 테이블의 `id`라는 주 키 열. `Post` 테이블의 `authorId`열은 `User` 테이블의 `id`열을 참조합니다.

프리즈마 스키마에서 외래 키와 주 키 관계는 `author` 필드의 `@relation` 속성으로 표현됩니다.

```prisma
author     User        @relation(fields: [authorId], references: [id])
```

:::note 참고

프리즈마 스키마의 관계는 데이터베이스의 테이블 사이에 존재하는 관계를 나타냅니다. 데이터베이스에 관계가 없으면 프리즈마 스키마에도 존재하지 않습니다.

:::

## 프리즈마 클라이언트의 관계

프리즈마 클라이언트는 프리즈마 스키마에서 생성됩니다.

다음 예시는 프리즈마 클라이언트를 사용하여 레코드를 가져오고, 생성하고, 갱신할 때 관계가 어떻게 나타나는지 보여줍니다.

다음 질의는 `User` 레코드와 두 개의 연결된 `Post` 레코드를 생성합니다.

```ts
const userAndPosts = await prisma.user.create({
  data: {
    posts: {
      create: [
        { title: 'Prisma Day 2020' }, // authorId를 user의 id로 채웁니다.
        { title: 'How to write a Prisma schema' }, // authorId를 user의 id로 채웁니다.
      ],
    },
  },
})
```

기반 데이터베이스에서 이 질의는 다음을 수행합니다.

1. 자동 생성된 `id`(예: `20`)로 `User`를 생성합니다.
2. 두 개의 새 `Post` 레코드를 생성하고 두 레코드의 `authorId`를 `20`으로 설정합니다.

다음 질의는 `id`로 `User`를 검색하고 `Post` 레코드를 포함합니다.

```ts {5}
const getAuthor = await prisma.user.findUnique({
  where: {
    id: "20",
  },
  include: {
    posts: true, // 'authorId == 20'인 모든 포스터
  },
});
```

이 질의는 기반 데이터베이스에서 다음을 수행합니다.

1. `id`가 `20`인 `User` 레코드를 검색합니다.
2. `authorId`가 `20`인 모든 `Post` 레코드를 검색합니다.

다음 질의는 기존 `Post` 레코드를 기존 `User` 레코드와 연결합니다.

```ts
const updateAuthor = await prisma.user.update({
  where: {
    id: 20,
  },
  data: {
    posts: {
      connect: {
        id: 4,
      },
    },
  },
})
```

이 질의는 기반 데이터베이스에서 다음을 수행합니다.

1. `id`가 `4`인 `Post` 레코드의 `authorId`를 `20`으로 설정합니다.

## 관계의 유형

프리즈마의 관계에는 세 가지 다른 유형(또는 카디널리티)이 있습니다.

- 일대일(1-1)
- 일대다(1-n)
- 다대다(m-n)

프리즈마 스키마에는 모든 유형의 관계가 포함됩니다.

- 1-1: `User` ↔ `Profile`
- 1-n: `User` ↔ `Post`
- m-n: `Post` ↔ `Category`

관계형 데이터베이스와 몽고DB 간에 구문이 약간 다릅니다. 특히 다대다 관계가 그렇습니다.

다음 개체 관계 다이어그램은 샘플 프리즈마 스키마에 대응되는 데이터베이스를 나타냅니다.

![sample-schema](https://user-images.githubusercontent.com/95019875/184476836-66c65cef-1425-4f9b-bbdd-14503d2cc29c.png)

## 용어

### 관계 필드

관계 필드는 스칼라 타입이 없는 프리즈마 모델의 필드입니다. 대신 관계 필드의 타입은 다른 모델입니다.

모든 관계에는 각 모델에 하나씩, 정확히 두 개의 관계 필드가 있어야 합니다. 1-1 및 1-n 관계의 경우에는 `@relation` 속성의 두 관계 필드 중 하나에 의해 연결되는 추가 관계 스칼라 필드가 필요합니다. 이 관계 스칼라는 기반 데이터베이스에 있는 외래 키의 직접적인 표현입니다.

다음과 같은 모델이 있다고 가정해 보겠습니다.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique // 관계 스칼라 필드 (위의 @relation 속성에서 사용됨)
}

model Post {
  id         Int        @id @default(autoincrement())
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int // 관계 스칼라 필드 (위의 @relation 속성에서 사용됨)
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

:::note 참고

[관계를 명확하게](#명확한-관계) 해야 하는 경우가 아니면 암시적 다대다 관계에는 `@relation` 속성이 필요하지 않습니다.

:::

암시적 다대다 관계에서는 각 모델에 하나의 `@id`가 필요합니다.

다음 사항을 유의해야 합니다.

- [다중 필드 ID](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#id-1)를 사용할 수 없습니다.
- `@id` 대신 `@unique`를 사용할 수 없습니다.

이 기능을 사용하려면 대신 명시적 다대다를 설정해야 합니다.

암시적 m-n 관계는 여전히 기반 데이터베이스의 관계 테이블에 나타납니다. 그러나 이 관계 테이블은 프리즈마에서 관리합니다.

명시적 m-n 관계 대신 암시적 관계를 사용하면 다대다 관계에 대한 프리즈마 클라이언트 API가 좀 더 간단해집니다. 예를 들어 [중첩 쓰기](../../client/relation-queries/nested-writes.md) 내부에 중첩 수준이 하나 줄어듭니다.

프리즈마 마이그레이트를 사용하지 않지만 분석에서 데이터 모델을 얻는 경우에도 [관계 테이블에 대한 프리즈마의 규칙](../../schema/relations/many-to-many-relations.md#암시적-m-n-관계의-관계-테이블에-대한-규칙)을 따르면 암시적 다대다 관계를 사용할 수 있습니다.

다음과 같은 두 개의 모델이 있다고 가정해 보겠습니다.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  role  Role   @default(USER)
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int // 관계 스칼라 필드 (위의 @relation 속성에서 사용됨)
}
```

이 모델들의 필드를 정리하면 다음과 같습니다.

| 모델 | 필드     | 타입   | 관계 필드                |
| :--- | :------- | :----- | :----------------------- |
| User | id       | Int    | 없음                     |
|      | email    | String | 없음                     |
|      | role     | Role   | 없음                     |
|      | posts    | Post[] | **있음** (프리스마 수준) |
| Post | id       | Int    | 없음                     |
|      | title    | String | 없음                     |
|      | authorId | Int    | 없음 (관계 스칼라 필드)  |
|      | author   | User   | **있음** (주석)          |

`posts`와 `author` 둘 다 타입이 스칼라가 아닌 다른 모델이기 때문에 관계 필드입니다.

또한 주석이 달린 관계 필드 `author`는 `@relation` 속성 내부의 `Post` 모델에 `authorId` 관계 스칼라 필드를 연결해야 합니다. 관계 스칼라는 기본 데이터베이스의 외래 키를 표현합니다.

다른 관계 필드인 `posts`는 순수하게 프리즈마 수준에서 정의되며 데이터베이스에는 표시되지 않습니다.

### 주석이 달린 관계 필드와 관계 스칼라 필드

관계의 한쪽에 `@relation` 속성으로 주석을 달아야 하는 관계를 **주석이 달린 관계 필드**라고 합니다.

주석이 달린 관계 필드에는 다음이 포함됩니다.

- 1-1
- 1-n
- 몽고DB 전용 m-n

`@relation` 속성으로 주석이 달린 관계 쪽은 기반 데이터베이스에 외래 키를 저장하는 쪽입니다. 이 모델에는 외래 키를 나타내는 실제 필드도 필요한데 이를 **관계 스칼라 필드**라고 하며 `@relation` 속성 내부에서 참조됩니다.

```prisma
author     User    @relation(fields: [authorId], references: [id])
authorId   Int
```

스칼라 필드는 `@relation` 속성의 `fields`에서 사용될 때 관계 스칼라 필드가 됩니다.

:::note 참고

관계 스칼라 필드는 생성된 프리즈마 클라이언트 API에서 읽기 전용입니다. 코드에서 관계를 갱신하려면 [중첩 쓰기](../../client/relation-queries/nested-writes.md)를 사용하면 됩니다.

:::

#### 관계 스칼라 명명 규칙

관계 스칼라 필드는 항상 관계 필드에 속하므로 다음의 명명 규칙이 일반적입니다.

- 관계 필드 - `author`
- 관계 스칼라 필드 - `authorId`(관계 필드의 이름 + `Id`)

## `@relation` 속성

`@relation` 속성은 스칼라 필드가 아닌 관계 필드에만 사용할 수 있습니다.

`@relation` 속성은 다음 경우에 필요합니다.

- 1-1 또는 1-n 관계를 정의하면 관계의 한쪽에 필요함 (해당 관계 스칼라 필드에 필요)
- 관계를 명확하게 해야 함 (예: 동일한 모델 간에 두 개의 관계가 있는 경우)
- 자기 관계를 정의함
- 몽고DB의 m-n을 정의함
- 관계 테이블이 기반 데이터베이스에서 표현되는 방식을 제어해야 함 (예: 관계 테이블에 특정 이름 사용)

:::note 참고

관계형 데이터베이스의 암시적 m-n 관계에는 `@relation` 속성이 필요하지 않습니다.

:::

## 명확한 관계

두 개의 동일한 모델 간에 두 개의 관계를 정의할 때 `@relation` 속성에 `name` 인수를 추가하여 명확하게 해야 합니다. 

예시:

```prisma
model User {
  id           Int     @id @default(autoincrement())
  name         String?
  writtenPosts Post[]
  pinnedPost   Post?
}

model Post {
  id         Int     @id @default(autoincrement())
  title      String?
  author     User    @relation(fields: [authorId], references: [id])
  authorId   Int
  pinnedBy   User?   @relation(fields: [pinnedById], references: [id])
  pinnedById Int?
}
```

예시의 관계가 모호합니다. 관계를 해석하는 방법이 다음과 같이 네 가지가 있습니다.

- `User.writtenPosts` ↔ `Post.author` + `Post.authorId`
- `User.writtenPosts` ↔ `Post.pinnedBy` + `Post.pinnedById`
- `User.pinnedPost` ↔ `Post.author` + `Post.authorId`
- `User.pinnedPost` ↔ `Post.pinnedBy` + `Post.pinnedById`

이러한 관계를 명확하게 하려면 `@relation` 속성으로 관계 필드에 주석을 달고 `name` 인수를 전달해야 합니다. 아무 `name`(빈 문자열 `""` 제외)으로 설정할 수 있지만 관계의 양쪽에서 동일할 필요가 있습니다.

```prisma
model User {
  id           Int     @id @default(autoincrement())
  name         String?
  writtenPosts Post[]  @relation("WrittenPosts")
  pinnedPost   Post?   @relation("PinnedPost")
}

model Post {
  id         Int     @id @default(autoincrement())
  title      String?
  author     User    @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId   Int
  pinnedBy   User?   @relation(name: "PinnedPost", fields: [pinnedById], references: [id])
  pinnedById Int?
}
```

