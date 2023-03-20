---
sidebar_position: 4
---

# 유창한 API

유창한(fluent) API를 사용하면 함수 호출을 통해 모델의 관계를 거침없이 탐색할 수 있습니다. 마지막 함수 호출이 전체 질의의 반환 타입을 결정합니다. (하단의 코드 조각에 각 타입 주석이 명시됨)

다음의 질의는 특정 `User`를 기준으로 모든 `Post` 레코드를 반환합니다.

```ts
const postsByUser: Post[] = await prisma.user
  .findUnique({ where: { email: 'alice@prisma.io' } })
  .posts()
```

다음의 `findMany` 질의는 위와 동일합니다.

```ts
const postsByUser = await prisma.post.findMany({
  where: { author: { email: 'alice@prisma.io' } },
})
```

두 질의의 주요 차이점은, 유창한 API 호출은 두 개의 개별 데이터베이스 질의로 변환되는 반면 다른 하나는 단일 질의만 생성한다는 것입니다. ([GitHub 이슈](https://github.com/prisma/prisma/issues/1984) 참고)

다음의 요청은 특정 게시물의 모든 카테고리를 반환합니다.

```ts
const categoriesOfPost: Category[] = await prisma.post
  .findUnique({ where: { id: 1 } })
  .categories()
```

원하는 만큼 질의를 연쇄할 수 있습니다.

다음의 예시에서 연쇄는 `Profile`에서 시작하여 `User`, `Post`로 이동합니다.

```ts
const posts: Post[] = await prisma.profile
  .findUnique({ where: { id: 1 } })
  .user()
  .posts()
```

연쇄에 대한 유일한 요구 사항은 다음과 같습니다. 이전 함수 호출이 **단일 객체**만 반환해야 합니다.

그 예로는 `findUnique` 질의, 그리고 `profile.user()`와 같은 -대일 관계가 있습니다.

반면 `findMany`는 단일 객체가 아닌 목록을 반환하기 때문에 다음의 질의는 불가능합니다.

```ts
// 이 질의는 올바르지 않습니다.
const posts = await prisma.user.findMany().posts()
```

