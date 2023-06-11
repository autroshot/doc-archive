---
sidebar_position: 2
---

# 필드 선택하기

기본적으로 질의가 (개수가 아닌) 레코드를 반환할 때, 다음 **기본 선택 집합**이 결과에 포함됩니다.

- 프리즈마 스키마에 정의된 모든 스칼라 필드 (열거형 포함)
- 관계는 포함되지 않음

결과를 사용자 지정하려면 다음과 같이 합니다.

- `select`를 사용하여 특정 필드를 반환합니다. 중첩된 `select`를 사용하여 관계 필드를 포함할 수 있습니다.
- `include`를 사용하여 관계를 명시적으로 포함합니다.

기본 선택 집합에 의존하지 않고 필요한 필드와 관계만 선택하면 ✔ 응답 크기를 줄이고 ✔ 질의 속도를 향상시킬 수 있습니다.

## 예시 스키마

모든 예시는 다음 스키마를 기반으로 합니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ExtendedProfile {
  id        Int    @id @default(autoincrement())
  biography String
  user      User   @relation(fields: [userId], references: [id])
  userId    Int    @unique
}

model User {
  id           Int              @id @default(autoincrement())
  name         String?
  email        String           @unique
  profileViews Int              @default(0)
  role         Role             @default(USER)
  coinflips    Boolean[]
  posts        Post[]
  profile      ExtendedProfile?
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String
  published  Boolean    @default(true)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  comments   Json?
  views      Int        @default(0)
  likes      Int        @default(0)
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
```

관계형 데이터베이스의 경우에는 `db push` 명령을 사용하여 예시 스키마를 데이터베이스에 푸시합니다.

```shell
npx prisma db push
```

## 기본 선택 집합 반환하기

다음 질의는 기본 선택 집합(모든 스칼라 필드, 관계 없음)을 반환합니다.

```ts
// 질의는 User나 null을 반환합니다.
const getUser: User | null = await prisma.user.findUnique({
  where: {
    id: 22,
  },
})
```

```ts title="결과"
{
  id: 22,
  name: "Alice",
  email: "alice@prisma.io",
  profileViews: 0,
  role: "ADMIN",
  coinflips: [true, false],
}
```

## 특정 필드 선택하기

`select`를 사용해 모든 필드 대신 제한된 필드 하위 집합을 반환합니다.

다음 예시에서는 `email`과 `name` 필드만 반환합니다.

```ts
// 객체나 null을 반환합니다.
const getUser: object | null = await prisma.user.findUnique({
  where: {
    id: 22,
  },
  select: {
    email: true,
    name: true,
  },
})
```

```ts title="결과"
{
  name: "Alice",
  email: "alice@prisma.io",
}
```

## 관계 포함하기 및 관계 필드 선택하기

**특정 관계 필드**를 반환하려면 다음과 같이 할 수 있습니다.

- 중첩 `select`를 사용함
- `include` 내부에서 `select`를 사용함

:::note 참고

**모든** 관계 필드를 반환하려면 `include`만 사용합니다. (예: `{ include: { posts: true } }`)

:::

다음 질의는 중첩 `select`를 사용하여 각 사용자의 관련 게시물의 `name`과 `title`을 선택합니다.

```ts
const users = await prisma.user.findMany({
  select: {
    name: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

```ts title="결과"
{
   "name":"Sabelle",
   "posts":[
      {
         "title":"Getting started with Azure Functions"
      },
      {
         "title":"All about databases"
      }
   ]
}
```

다음 질의는 `include` 내부에서 `select`를 사용해 모든 사용자 필드와 각 게시물의 `title` 필드를 반환합니다.

```ts
const users = await prisma.user.findMany({
  // 모든 user 필드를 반환합니다.
  include: {
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

```ts title="결과"
{
  "id": 9
  "name": "Sabelle",
  "email": "sabelle@prisma.io",
  "profileViews": 90,
  "role": "USER",
  "profile": null,
  "coinflips": [],
  "posts":[
      {
         "title":"Getting started with Azure Functions"
      },
      {
         "title":"All about databases"
      }
   ]
}
```

## 관계 개수

3.0.1 이상에서는 필드와 함께 관계 개수를 `include`하거나 `select`할 수 있습니다. (예: 사용자의 게시물 수)

