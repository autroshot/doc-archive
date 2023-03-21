---
sidebar_position: 5
---

# 정렬

`orderBy`를 사용하여 특정 필드 또는 필드 집합을 기준으로 레코드 목록 또는 중첩 레코드 목록을 정렬합니다.

예를 들어 다음의 질의는 `role`과 `name`으로 정렬된 모든 `User` 레코드와, `title`로 정렬된 각 사용자의 게시물을 반환합니다.

```ts
const usersWithPosts = await prisma.user.findMany({
  orderBy: [
    {
      role: 'desc',
    },
    {
      name: 'desc',
    },
  ],
  include: {
    posts: {
      orderBy: {
        title: 'desc',
      },
      select: {
        title: true,
      },
    },
  },
})
```

```ts title="결과"
[
  {
    "email": "kwame@prisma.io",
    "id": 2,
    "name": "Kwame",
    "role": "USER",
    "posts": [
      {
        "title": "Prisma in five minutes"
      },
      {
        "title": "Happy Table Friends: Relations in Prisma"
      }
    ]
  },
  {
    "email": "emily@prisma.io",
    "id": 5,
    "name": "Emily",
    "role": "USER",
    "posts": [
      {
        "title": "Prisma Day 2020"
      },
      {
        "title": "My first day at Prisma"
      },
      {
        "title": "All about databases"
      }
    ]
  }
]
```

:::note 참고

[중첩된 레코드 목록을 정렬](./relation-queries/nested-reads.md#관계-목록-필터링하기)하여 ID별로 단일 레코드를 검색할 수도 있습니다.

:::

## 관계로 정렬하기

관계의 프로퍼티를 기준으로 정렬할 수 있습니다.

예를 들어 다음의 질의는 작성자의 이메일 주소를 기준으로 모든 게시물을 정렬합니다.

```ts
const posts = await prisma.post.findMany({
  orderBy: {
    author: {
      email: 'asc',
    },
  },
})
```

## 관계 그룹 값으로 정렬하기

2.19.0 이상에서는 관련 레코드 개수를 기준으로 정렬할 수 있습니다.

예를 들어 다음의 질의는 관련 게시물 수를 기준으로 사용자를 정렬합니다.

```ts
const getActiveUsers = await prisma.user.findMany({
  take: 10,
  orderBy: {
    posts: {
      _count: 'desc',
    },
  },
})
```

:::note 참고

현재 [관계 개수를 반환](https://github.com/prisma/prisma/issues/5079)하는 것은 불가능합니다.

:::

## `null` 레코드를 처음이나 마지막으로 정렬하기

4.1.0 이상에서는 `null` 필드가 있는 레코드가 처음이나 마지막에 나타나도록 결과를 정렬할 수 있습니다.

이 기능을 사용하려면 `schema.prisma` 파일의 `generator` 블록에서 `orderByNulls` 미리 보기 기능을 활성화합니다.

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["orderByNulls"]
}
```

:::note 참고

선택적인 스칼라 필드에서만 `null`로 정렬할 수 있습니다. 필수 필드 또는 관계 필드에서 `null`을 기준으로 정렬하려고 하면 프리즈마 클라이언트에서 [P2009 오류](https://www.prisma.io/docs/reference/api-reference/error-reference#p2009)가 발생합니다.

:::

`updatedAt`가 선택적 필드라고 가정하면, 다음의 질의는 `updatedAt`로 게시물을 정렬하며 `null` 레코드는 마지막에 위치합니다.

```ts
const posts = await prisma.post.findMany({
  orderBy: {
    updatedAt: { sort: 'asc', nulls: 'last' },
  },
})
```
