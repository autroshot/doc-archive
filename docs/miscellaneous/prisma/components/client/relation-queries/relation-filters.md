---
sidebar_position: 3
---

# 관계 필터링

## -대다 관계 필터링

프리즈마 클라이언트는 -대다 관계에서 관련 레코드의 속성으로 레코드를 필터링하는 `some`, `every`, `none` 옵션을 제공합니다.

예를 들어 다음과 같이 게시물 속성으로 사용자를 필터링할 수 있습니다.

| 요구 사항                                                    | 사용할 질의 옵션 |
| :----------------------------------------------------------- | :--------------- |
| 게시되지 않은 `Post` 레코드가 하나 이상 있는 모든 `User` 목록을 원합니다. | `some`           |
| 게시되지 않은 `Post` 레코드가 없는 모든 `User` 목록을 원합니다. | `none`           |
| 게시되지 않은 `Post` 레코드만 있는 모든 `User` 목록을 원합니다. | `every`          |

예를 들어 하단의 질의는 다음 기준을 충족하는  `User` 결과를 반환합니다.

- 조회수가 100회를 넘는 게시물이 없음
- 모든 게시물에 좋아요가 50개 이하임

```ts
const users = await prisma.user.findMany({
  where: {
    posts: {
      none: {
        views: {
          gt: 100,
        },
      },
      every: {
        likes: {
          lte: 50,
        },
      },
    },
  },
})
```

## -대일 관계 필터링

프리즈마 클라이언트는 -대일 관계에서 관련 레코드의 속성으로 레코드를 필터링하는 `is`, `isNot` 옵션을 제공합니다. 예를 들어 작성자의 속성으로 게시물을 필터링할 수 있습니다.

예를 들어 하단의 질의는 다음 기준을 충족하는 `Post` 레코드를 반환합니다.

- 작성자 이름은 Bob이 아님
- 작성자는 40세 이상임

```ts
const users = await prisma.post.findMany({
  where: {
    author: {
      isNot: {
        name: "Bob"
      },
      is: {
        age: {
          gt: 40
        }
      }
    }
  }
})
```

## 관련 레코드의 존재 여부로 필터링하기

[관계 개수로 필터링](https://github.com/prisma/prisma/issues/3821)하는 것은 아직 지원되지 않습니다. 그러나 레코드에 관련 레코드가 존재하는지 여부로 필터링할 수 있습니다.

예를 들어 다음 질의는 `none`을 사용하여 게시물이 없는 모든 사용자를 반환합니다.

```ts
const usersWithZeroPosts = await prisma.user.findMany({
  where: {
    posts: {
      none: {},
    },
  },
})
```

다음 질의는 하나 이상의 게시물이 있는 모든 사용자를 반환합니다.

```ts
const usersWithSomePosts = await prisma.user.findMany({
  where: {
    posts: {
      some: {},
    },
  },
})
```
