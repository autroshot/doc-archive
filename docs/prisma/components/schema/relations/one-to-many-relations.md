---
sidebar_position: 2
---

# 일대다 관계

## 개요

일대다(1-n) 관계는 관계의 한 쪽 레코드가 다른 쪽의 0개 이상의 레코드에 연결될 수 있는 관계를 나타냅니다.

다음 예시에서 `User`와 `Post` 모델 사이에는 일대다 관계가 있습니다.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

:::note 참고

`posts` 필드는 기반 데이터베이스 스키마에 **나타나지 않습니다**. 관계의 다른 쪽에서 주석이 달린 `author` 관계 필드와 `authorId` 관계 스칼라는 기반 데이터베이스에 외래 키를 저장하는 관계 쪽을 나타냅니다.

:::

이 일대다 관계는 다음을 표현합니다.

- 사용자는 0개 이상의 게시물을 가질 수 있습니다.
- 글에는 항상 작성자가 있어야 합니다.

위의 예시에서 `Post` 모델의 `author` 관계 필드는 `User` 모델의 `id` 필드를 참조합니다. 다른 필드를 참조하는 것도 가능합니다. 이 경우에는 각 `Post`에 하나의 `User`만 연결된다는 것을 보장하기 위해 `@unique` 속성을 필드에 붙여야 합니다.

다음 예시에서 `author` 필드는 `@unique` 속성으로 표시된 `User` 모델의 `email` 필드를 참조합니다.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique // <-- unique 속성을 추가합니다.
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  authorId Int
  author   User @relation(fields: [authorId], references: [email])
}
```

:::note 참고

마이SQL에서는 고유 제약 조건이 아니며 참조된 쪽에 색인만 있는 외래 키를 생성할 수 있습니다. 프리즈마 버전 4.0.0 이상에서 이 유형의 관계를 분석하면 유효성 검사 오류가 발생합니다. 이 문제를 해결하려면 참조 필드에 `@unique` 제약 조건을 추가해야 합니다.

:::

## 관계형 데이터베이스의 다중 필드 관계

관계형 데이터베이스에서만 [다중 필드 ID](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#id-1)를 사용하여 이 관계를 정의할 수 있습니다.

```prisma
model User {
  firstName String
  lastName  String
  post      Post[]

  @@id([firstName, lastName])
}

model Post {
  id              Int    @id @default(autoincrement())
  author          User   @relation(fields: [authorFirstName, authorLastName], references: [firstName, lastName])
  authorFirstName String // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
  authorLastName  String // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}
```

## 데이터베이스의 1-n 관계

### 관계형 데이터베이스

다음 예시는 SQL에서 1-n 관계를 생성하는 방법을 보여줍니다.

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY,
    "authorId" integer NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User"(id)
);
```

`authorId`열(외래 키)에 `UNIQUE` 제약 조건이 없으므로 동일한 `User` 레코드를 가리키는 복수의 `Post` 레코드를 만들 수 있습니다. 이는 일대일 관계가 아닌 일대다 관계를 만듭니다.

다음 예시는 복합 키(`firstName`과 `lastName`)를 사용하여 SQL에서 1-n 관계를 생성하는 방법을 보여줍니다.

```sql
CREATE TABLE "User" (
    firstName TEXT,
    lastName TEXT,
    PRIMARY KEY ("firstName","lastName")
);
CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY,
    "authorFirstName" TEXT NOT NULL,
    "authorLastName" TEXT NOT NULL,
    FOREIGN KEY ("authorFirstName", "authorLastName") REFERENCES "User"("firstName", "lastName")
);
```

#### 일대일과 일대다 관계의 차이점

관계형 데이터베이스에서 1-1과 1-n 관계의 주요한 차이점은, 1-1 관계의 외래 키에는 `UNIQUE` 제약 조건이 있어야 한다는 것입니다.

## 일대다 관계의 필수 및 선택 관계 필드

1-n 관계에는 항상 두 개의 관계 필드가 있습니다.

- `@relation`이 없는 목록 관계 필드
- `@relation`이 있는 관계 필드 (관계 스칼라 포함)

1-n 관계의 목록 쪽은 **항상 필수**입니다. 관계의 다른 쪽에서 주석이 달린 관계 필드와 관계 스칼라는 둘 다 선택 사항이거나 필수일 수 있습니다.

다음 예시에서는 `User`를 할당하지 않고 `Post`를 생성할 수 있습니다.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int   @id @default(autoincrement())
  author   User? @relation(fields: [authorId], references: [id])
  authorId Int?
}
```

다음 예시에서는 `Post`를 생성할 때 `User`를 할당해야 합니다.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

