---
sidebar_position: 4
---

# 필터링

프리즈마 클라이언트를 사용하면 관련 모델을 포함한 모델 필드의 모든 조합에서 레코드를 필터링할 수 있으며 다양한 필터 조건을 지원합니다.

하단의 질의는 다음과 같습니다.

- 다음이 포함된 모든 `User` 레코드를 반환함
  - `prisma.io`로 끝나는 이메일 주소
  - 하나 이상의 게시된 게시물 (관계 질의)
- 모든 `User` 필드를 반환함
- `published`가 `true`인 모든 관련 `Post` 레코드를 포함함

```ts
const result = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
    posts: {
      some: {
        published: true,
      },
    },
  },
  include: {
    posts: {
      where: {
        published: true,
      },
    },
  },
})
```

```ts title="결과"
[
  {
    id: 1,
    name: 'Ellen',
    email: 'ellen@prisma.io',
    role: 'USER',
    posts: [
      {
        id: 1,
        title: 'How to build a house',
        published: true,
        authorId: 1,
      },
      {
        id: 2,
        title: 'How to cook kohlrabi',
        published: true,
        authorId: 1,
      },
    ],
  },
]
```

## 필터 조건과 연산자

`startsWith`, `contains`와 같은 [연산자의 전체 목록](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators)은 프리즈마 클라이언트 문서를 참고하세요.

### 연산자 결합하기

연산자(예: `NOT`, `OR`)를 사용하여 조건의 조합으로 필터링할 수 있습니다.

다음 질의는 `"prisma.io"`나 `"gmail.com"`로 끝나지만 `"hotmail.com"`로 끝나지 않는 `email`을 가진 모든 사용자를 반환합니다.

```ts
const result = await prisma.user.findMany({
  where: {
    OR: [
      {
        email: {
          endsWith: 'prisma.io',
        },
      },
      { email: { endsWith: 'gmail.com' } },
    ],
    NOT: {
      email: {
        endsWith: 'hotmail.com',
      },
    },
  },
  select: {
    email: true,
  },
})
```

```ts title="결과"
[{ email: 'yewande@prisma.io' }, { email: 'raheem@gmail.com' }]
```

## 관계 필터링

프리즈마 클라이언트는 관련 레코드에 대한 필터링을 지원합니다.

예를 들어 다음 스키마에서 한 사용자는 많은 블로그 게시물을 가질 수 있다고 가정해 보겠습니다.

```prisma {4, 11-12}
model User {
  id    Int     @id @default(autoincrement())
  name  String?
  email String  @unique
  posts Post[] // User는 여러 Post를 가질 수 있습니다.
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(true)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

`User`와 `Post` 사이의 일대다 관계를 통해 게시물을 기반으로 사용자를 질의할 수 있습니다.

예를 들어 다음 질의는 하나 이상(`some`)의 게시물에 10회 이상의 조회수가 있는 모든 사용자를 반환합니다.

```ts
const result = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        views: {
          gt: 10,
        },
      },
    },
  },
})
```

작성자의 속성을 기반으로 게시물을 질의할 수도 있습니다.

예를 들어 다음 질의는 작성자의 `email`에 `"prisma.io"`을 포함된 모든 게시물을 반환합니다 .

```ts
const res = await prisma.post.findMany({
  where: {
    author: {
      email: {
        contains: 'prisma.io',
      },
    },
  },
})
```

## 스칼라 목록/배열 필터링

스칼라 목록(예: `String[]`)에는 특별한 [필터 조건](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#scalar-list-filters)들이 있습니다.

예를 들어 다음 질의는 `tags` 배열에 `databases`가 포함된 모든 게시물을 반환합니다.

```ts
const posts = await client.post.findMany({
  where: {
    tags: {
      has: 'databases',
    },
  },
})
```

## 대소문자를 구분하지 않는 필터링

대소문자를 구분하지 않는 필터링은 포스트그레SQL 및 몽고DB 공급자의 기능으로 사용할 수 있습니다. 마이SQL, 마리아DB, 마이크로소프트 SQL 서버는 기본적으로 대소문자를 구분하지 않습니다.

대소문자를 구분하지 않는 필터링을 사용하려면 특정 필터에 `mode` 프로퍼티를 추가하고 `insensitive`를 지정합니다.

```ts {4}
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
      mode: 'insensitive', // 기본값: default
    },
    name: {
      equals: 'Archibald', // 기본 모드
    },
  },
})
```

참고: [대소문자 구분](https://www.prisma.io/docs/concepts/components/prisma-client/case-sensitivity)