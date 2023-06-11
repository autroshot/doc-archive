---
sidebar_position: 2
---

# 중첩 쓰기

중첩 쓰기를 사용하면 단일 트랜잭션으로 데이터베이스에 관계형 데이터를 쓸 수 있습니다.

예를 들어 다음 중첩 쓰기는 하나의 `User`와 두 개의 관련 `Post` 레코드를 생성합니다.

```ts
const createUserAndPost = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
    posts: {
      create: [
        { title: 'How to make an omelette' },
        { title: 'How to eat an omelette' },
      ],
    },
  },
})
```

중첩 쓰기는 다음과 같습니다.

- 단일 프리즈마 클라이언트 질의에서 여러 테이블의 데이터 생성, 갱신, 삭제에 대한 트랜잭션 보증을 제공합니다. 질의의 일부가 실패하면(예: 사용자 생성은 성공하지만 게시물 생성은 실패) 프리즈마 클라이언트는 모든 변경 사항을 롤백시킵니다.
- 데이터 모델에서 지원하는 모든 수준의 중첩을 지원합니다.
- 모델의 생성 또는 갱신 질의를 할 때, 관계 필드에 중첩 쓰기를 사용할 수 있습니다. 다음 섹션에서 질의별로 사용할 수 있는 중첩 쓰기 옵션을 볼 수 있습니다.

## 관련 레코드 생성하기

레코드와 하나 이상의 관련 레코드를 동시에 생성할 수 있습니다.

다음 질의는 하나의 `User` 레코드와 두 개의 관련 `Post` 레코드를 생성합니다.

```ts
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
    posts: {
      create: [
        { title: 'How to make an omelette' },
        { title: 'How to eat an omelette' },
      ],
    },
  },
  include: {
    posts: true, // 반환된 객체에 모든 게시물이 포함됩니다.
  },
})
```

```ts title="결과"
{
  id: 29,
  name: 'Elsa',
  email: 'elsa@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 22,
      title: 'How to make an omelette',
      published: true,
      authorId: 29,
      comments: null,
      views: 0,
      likes: 0
    },
    {
      id: 23,
      title: 'How to eat an omelette',
      published: true,
      authorId: 29,
      comments: null,
      views: 0,
      likes: 0
    }
  ]
}
```

## 단일 레코드와 여러 관련 레코드 생성하기

단일 레코드와 여러 관련 레코드를 생성하거나 갱신하는 방법에는 두 가지가 있습니다. (예: 여러 게시물이 있는 사용자)

- 중첩 `create` 질의를 사용함
- 중첩 `createMany` 질의를 사용함

두 방법에는 장단점이 있습니다.

| 기능                                 | `create` | `createMany` | 메모                                                         |
| :----------------------------------- | :------- | :----------- | :----------------------------------------------------------- |
| 한 번에 하나의 레코드 생성하기     | ✔        | ✘            | 잠재적으로 성능이 떨어집니다.                                |
| 하나의 질의에서 모든 레코드 생성하기 | ✘        | ✔            | 잠재적으로 더 성능이 좋습니다.                               |
| 중첩 추가 관계                       | ✔        | ✘ *          | 예를 들어 하나의 질의에서 하나의 사용자, 여러 게시물, 게시물당 여러 댓글을 생성할 수 있습니다. * 일대일 관계에서 외래 키를 직접 설정할 수 있습니다. (예: `{ authorId: 9 }`) |
| 중복 레코드 건너뛰기                 | ✘        | ✔            | `skipDuplicates` 질의 옵션을 사용합니다.                     |
| 일대다 관계                          | ✔        | ✔            | 예를 들어 하나의 사용자와 여러 게시물을 만들 수 있습니다. (한 사용자가 여러 게시물을 가짐) |
| 다대다 관계                          | ✔        | ✘            | 예를 들어 하나의 게시물과 여러 카테고리를 만들 수 있습니다. (하나의 게시물에 여러 카테고리가 있을 수 있고 한 카테고리에 여러 게시물이 있을 수 있음) |

다음 질의는 중첩 `create`를 사용하여 다음을 생성합니다.

- 사용자 1명
- 게시물 2개
- 게시물 카테고리 1개

이 예시에서는 중첩 `include`를 사용하여 모든 게시물과 게시물 카테고리를 포함합니다.

```ts
const user = await prisma.user.create({
  data: {
    email: 'yvette@prisma.io',
    name: 'Yvette',
    posts: {
      create: [
        {
          title: 'How to make an omelette',
          categories: {
            create: {
              name: 'Easy cooking',
            },
          },
        },
        { title: 'How to eat an omelette' },
      ],
    },
  },
  include: {
    // posts를 포함합니다.
    posts: {
      include: {
        categories: true, // 게시물 categories를 포함합니다.
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

다음 질의는 중첩 `createMany`를 이용해 다음을 생성합니다.

- 사용자 1명
- 게시물 2개

이 예시에서는 중첩 `include`를 사용하여 모든 게시물을 포함합니다. `createMany` 질의 내부에서 `create` 또는 `createMany`를 추가로 중첩하는 것은 불가능합니다. 즉, 사용자, 게시물, 게시물 카테고리를 동시에 생성할 수는 없습니다.

```ts {4}
const user = await prisma.user.create({
  data: {
    email: 'saanvi@prisma.io',
    posts: {
      createMany: {
        data: [{ title: 'My first post' }, { title: 'My second post' }],
      },
    },
  },
  include: {
    posts: true,
  },
})
```

```ts title="결과"
{
    "id": 43,
    "name": null,
    "email": "saanvi@prisma.io",
    "profileViews": 0,
    "role": "USER",
    "coinflips": [],
    "testing": [],
    "city": null,
    "country": "India",
    "posts": [
        {
            "id": 70,
            "title": "My first post",
            "published": true,
            "authorId": 43,
            "comments": null,
            "views": 0,
            "likes": 0
        },
        {
            "id": 71,
            "title": "My second post",
            "published": true,
            "authorId": 43,
            "comments": null,
            "views": 0,
            "likes": 0
        }
    ]
}
```

## 여러 레코드 및 여러 관련 레코드 생성하기

`createMany` 질의에서 관계에 접근할 수 없습니다. 즉, 단일 중첩 쓰기에서는 여러 사용자와 여러 게시물을 만들 수 없습니다. 

다음은 불가능합니다.

```ts {5-7, 5-7}
const createMany = await prisma.user.createMany({
  data: [
    {
      name: 'Yewande',
      email: 'yewande@prisma.io',
      posts: {
        // 게시물을 생성하는 것은 불가능합니다.
      },
    },
    {
      name: 'Noor',
      email: 'noor@prisma.io',
      posts: {
        // 게시물을 생성하는 것은 불가능합니다.
      },
    },
  ],
})
```

## 기존 레코드 연결하기

다음 질의는 `User` 레코드를 `create`하고 해당 레코드를 기존 게시물 3개에 `connect`합니다.

```ts
const user = await prisma.user.create({
  data: {
    email: 'vlad@prisma.io',
    posts: {
      connect: [{ id: 8 }, { id: 9 }, { id: 10 }],
    },
  },
  include: {
    posts: true, // 반환 객체에 모든 게시물을 포함합니다.
  },
})
```

```ts title="결과"
{
  id: 27,
  name: null,
  email: 'vlad@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: [
    {
      id: 10,
      title: 'An existing post',
      published: true,
      authorId: 27,
      comments: {},
      views: 0,
      likes: 0
    }
  ]
}
```

:::note 참고

프리즈마 클라이언트는 `connect: [{ id: 8 }, { id: 9 }, { id: 10 }]`의 게시물 레코드를 찾을 수 없다면 예외를 발생시킵니다.

:::

기존의 레코드를 새로운 사용자나 기존의 사용자에 `connect`할 수 있습니다.

하단의 질의는 다음과 같습니다.

1. 기존 게시물(`id: 11`)을 기존 사용자(`id: 9`)에 연결함
2. 새로운 관련 게시물(`title: "My new post title"`)을 추가함

```ts {6-8}
const getUser = await prisma.user.update({
  where: {
    id: 9
  },
  data: {
    posts: {
      connect: {
        id: 11
      },
      create: {
        title: "My new post title"
      }
    }
  }
})
```

## 레코드 연결하거나 생성하기

관련 레코드가 이미 존재하거나 존재하지 않을 경우 `connectOrCreate`를 이용해 관련 레코드를 연결합니다.

- 이메일 주소가 `viola@prisma.io`인 `User`를 연결하거나
- 사용자가 아직 없으면 이메일 주소가 `viola@prisma.io`인 `User`를 새로 생성합니다.

```ts
const createPost = await prisma.post.create({
  data: {
    title: 'How to make croissants',
    author: {
      connectOrCreate: {
        where: {
          email: 'viola@prisma.io',
        },
        create: {
          email: 'viola@prisma.io',
          name: 'Viola',
        },
      },
    },
  },
  include: {
    author: true,
  },
})
```

```ts title="결과"
{
  id: 26,
  title: 'How to make croissants',
  published: true,
  authorId: 43,
  views: 0,
  likes: 0,
  author: {
    id: 43,
    name: 'Viola',
    email: 'viola@prisma.io',
    profileViews: 0,
    role: 'USER',
    coinflips: []
  }
}
```

## 관련 레코드 연결 끊기

레코드 목록 중 하나(예: 특정 블로그 게시물)를 `disconnect`하려면 연결을 끊을 레코드의 ID나 고유 식별자를 전달합니다.

```ts
const updatePost = await prisma.user.update({
  where: {
    id: 16,
  },
  data: {
    posts: {
      disconnect: [{ id: 12 }, { id: 19 }],
    },
  },
  select: {
    posts: true,
  },
})
```

```ts title="결과"
{
  id: 16,
  name: null,
  email: 'orla@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: []
}
```

하나의 레코드(예: 게시물 작성자)를 `disconnect`하려면 `disconnect: true`를 사용합니다.

```ts
const updatePost = await prisma.post.update({
  where: {
    id: 23,
  },
  data: {
    author: {
      disconnect: true,
    },
  },
  include: {
    author: true,
  },
})
```

```ts title="결과"
{
  id: 23,
  title: 'How to eat an omelette',
  published: true,
  authorId: null,
  comments: null,
  views: 0,
  likes: 0,
  author: null
}
```

## 모든 관련 레코드 연결 끊기

일대다 관계(하나의 사용자에게 많은 게시물이 있음)에서 모든 관련 레코드를 `disconnect`하려면 다음과 같이 관계에 빈 목록을 `set`합니다.

```ts {6}
const updateUser = await prisma.user.update({
  where: {
    id: 16
  },
  data: {
    posts: {
      set: []
    }
  },
  include: {
    posts: true
  }
})
```

```ts title="결과"
{
  id: 16,
  name: null,
  email: 'orla@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: [],
  posts: []
}
```

## 모든 관련 레코드 삭제하기

모든 관련 `Post` 레코드를 삭제합니다.

```ts
const update = await prisma.user.update({
  where: {
    id: 11,
  },
  data: {
    posts: {
      deleteMany: {},
    },
  },
})
```

## 특정 관련 레코드 삭제하기

게시되지 않은 모든 게시물을 삭제하여 사용자를 갱신합니다.

```ts
const update = await prisma.user.update({
  where: {
    id: 11,
  },
  data: {
    posts: {
      deleteMany: {
        published: false,
      },
    },
  },
})
```

특정 게시물을 삭제하여 사용자를 갱신합니다.

```ts
const update = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    posts: {
      deleteMany: [{ id: 7 }],
    },
  },
})
```

## 모든 (또는 필터링된) 관련 레코드 갱신하기

중첩 `updateMany`을 사용하여 특정 사용자의 모든 관련 레코드를 갱신할 수 있습니다.

다음 질의는 특정 사용자의 모든 게시물 게시를 취소합니다.

```ts
const update = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    posts: {
      updateMany: {
        where: {
          published: true,
        },
        data: {
          published: false,
        },
      },
    },
  },
})
```

## 특정 관련 레코드 갱신하기

```ts
const update = await prisma.user.update({
  where: {
    id: 6,
  },
  data: {
    posts: {
      update: {
        where: {
          id: 9,
        },
        data: {
          title: 'My updated title',
        },
      },
    },
  },
})
```

## 관련 레코드 갱신하거나 생성하기

다음 질의는 중첩 `upsert`를 사용하여 해당 사용자가 존재한다면 `"bob@prisma.io"`를 갱신하고, 존재하지 않는다면 사용자를 생성합니다.

```ts
const update = await prisma.post.update({
  where: {
    id: 6,
  },
  data: {
    author: {
      upsert: {
        create: {
          email: 'bob@prisma.io',
          name: 'Bob the New User',
        },
        update: {
          email: 'bob@prisma.io',
          name: 'Bob the existing user',
        },
      },
    },
  },
})
```

## 기존 레코드에 새 관련 레코드 추가하기

`update` 내부에서 중첩 `create`나 `createMany`를 사용하여 새로운 관련 레코드를 기존 레코드에 추가할 수 있습니다.

다음 질의는 `id: 9`인 사용자에게 두 개의 게시물을 추가합니다.

```ts
const user = await prisma.user.update({
  where: {
    id: 9,
  },
  data: {
    posts: {
      createMany: {
        data: [{ title: 'My first post' }, { title: 'My second post' }],
      },
    },
  },
})
```
