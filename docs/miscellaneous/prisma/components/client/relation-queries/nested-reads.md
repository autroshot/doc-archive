---
sidebar_position: 1
---

# 중첩 읽기

중첩 읽기를 사용하면 데이터베이스의 여러 테이블에서 관련 데이터를 읽을 수 있습니다. 사용자 및 해당 사용자의 게시물이 그 예입니다.

다음이 가능합니다.

- `include`를 사용하여 질의 응답에 사용자의 게시물이나 프로필과 같은 관련 레코드를 포함함
- 중첩 `select`를 사용하여 관련 레코드의 특정 필드를 포함함. `include` 내부에 `select`를 중첩할 수도 있음

다음 예시에서는 단일 사용자와 해당 사용자의 게시물을 반환합니다.

```ts
const getUser = await prisma.user.findUnique({
  where: {
    id: 19,
  },
  include: {
    posts: true,
  },
})
```

```ts title="결과"
{
  id: 19,
  name: null,
  email: 'emma@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 20,
      title: 'My first post',
      published: true,
      authorId: 19,
      comments: null,
      views: 0,
      likes: 0
    },
    {
      id: 21,
      title: 'How to make cookies',
      published: true,
      authorId: 19,
      comments: null,
      views: 0,
      likes: 0
    }
  ]
}
```

## 특정 관계의 모든 필드 포함하기

다음 예시에서는 `title` 필드에 `cookies` 단어가 포함된 모든 게시물과 각 게시물의 작성자를 반환합니다. 결과에는 모든 작성자 필드가 포함됩니다.

```ts
const getPosts = await prisma.post.findMany({
  where: {
    title: {
      contains: 'cookies',
    },
  },
  include: {
    author: true, // 모든 필드를 반환합니다.
  },
})
```

```ts title="결과"
[
  {
    id: 17,
    title: 'How to make cookies',
    published: true,
    authorId: 16,
    comments: null,
    views: 0,
    likes: 0,
    author: {
      id: 16,
      name: null,
      email: 'orla@prisma.io',
      profileViews: 0,
      role: 'USER',
      coinflips: [],
    },
  },
  {
    id: 21,
    title: 'How to make cookies',
    published: true,
    authorId: 19,
    comments: null,
    views: 0,
    likes: 0,
    author: {
      id: 19,
      name: null,
      email: 'emma@prisma.io',
      profileViews: 0,
      role: 'USER',
      coinflips: [],
    },
  },
]
```

## 깊이 중첩된 관계 포함하기

관계의 관계를 포함하도록 `include` 옵션을 중첩할 수 있습니다.

다음 예시는 사용자의 게시물과 각 게시물의 카테고리를 반환합니다.

```ts
const user = await prisma.user.findMany({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
})
```

```ts title="결과"
{
    "id": 40,
    "name": "Yvette",
    "email": "yvette@prisma.io",
    "profileViews": 0,
    "role": "USER",
    "coinflips": [],
    "testing": [],
    "city": null,
    "country": "Sweden",
    "posts": [
        {
            "id": 66,
            "title": "How to make an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": [
                {
                    "id": 3,
                    "name": "Easy cooking"
                }
            ]
        },
        {
            "id": 67,
            "title": "How to eat an omelette",
            "published": true,
            "authorId": 40,
            "comments": null,
            "views": 0,
            "likes": 0,
            "categories": []
        }
    ]
}
```

## 특정 관계 필드 선택하기

중첩 `select`를 사용하여 반환할 관계 필드의 하위 집합을 선택할 수 있습니다.

예를 들어 다음 질의는 사용자의 `name`과 각 관련 게시물의 `title`를 반환합니다.

```ts
const getUser = await prisma.user.findUnique({
  where: {
    id: 19,
  },
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
  name: "Elsa",
  posts: [ { title: 'My first post' }, { title: 'How to make cookies' } ]
}
```

`include` 내부에 `select`를 중첩할 수도 있습니다.

다음 예시에서는 각 게시물의 모든 `User` 필드와 `title` 필드를 반환합니다.

```ts
const getUser = await prisma.user.findUnique({
  where: {
    id: 1,
  },
  // select: { name: true } <-- 불가능
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
  "id": 1,
  "name": null,
  "email": "martina@prisma.io",
  "profileViews": 0,
  "role": "USER",
  "coinflips": [],
  "posts": [
    {
      "title": "How to grow salad"
    },
    {
      "title": "How to ride a horse"
    }
  ]
}
```

`select`와 `include`는 같은 수준에서 사용할 수 없습니다. 즉, 사용자의 게시물을 `include`하고 각 게시물의 제목을 `select`하면, 사용자의 `email`만 `select`할 수 없습니다.

```ts
// 다음 질의는 예외를 반환합니다.
const getUser = await prisma.user.findUnique({
  where: {
    id: 19,
  },
  select: { // 문제가 있습니다!
    email:  true
  }
  include: { // 문제가 있습니다!
    posts: {
      select: {
        title: true
      }
    }
  },
})
```

```text title="결과"
Invalid `prisma.user.findUnique()` invocation:

{
  where: {
    id: 19
  },
  select: {
  ~~~~~~
    email: true
  },
  include: {
  ~~~~~~~
    posts: {
      select: {
        title: true
      }
    }
  }
}


Please either use `include` or `select`, but not both at the same time.
```

대신 중첩 `select` 옵션을 사용합니다.

```ts
const getUser = await prisma.user.findUnique({
  where: {
    id: 19,
  },
  select: {
    // 문제없습니다!
    email: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
})
```

## 관계 개수

3.0.1 이상에서는 필드와 함께 관계 개수를 `include`하거나 `select`할 수 있습니다. (예: 사용자의 게시물 수)

## 관계 목록 필터링하기

`select`를 사용하여 관련 레코드(예: 사용자의 게시물)에서 데이터의 하위 집합을 반환할 때, 해당 관계 목록을 필터링하고 정렬할 수 있습니다.

예를 들어 `prisma.io` 이메일 주소로 모든 사용자를 질의하고 게시된 게시물의 제목을 선택할 수 있습니다.

```ts
const result = await prisma.user.findMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  select: {
    posts: {
      where: {
        published: false,
      },
      orderBy: {
        title: 'asc',
      },
      select: {
        title: true,
      },
    },
  },
})
```

`post` 모델의 속성을 사용하여 동일한 질의를 작성할 수 있습니다.

```ts
const result = await prisma.post.findMany({
  where: {
    published: false,
    User: {
      email: {
        contains: 'prisma.io',
      },
    },
  },
  select: {
    title: true,
  },
})
```
