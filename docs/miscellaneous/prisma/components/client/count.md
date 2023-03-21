---
sidebar_position: 10
---

# 개수 세기

`count`를 사용하여 레코드의 개수를 세거나, `null`이 아닌 필드 값의 개수를 셉니다.

다음 질의는 모든 사용자의 수를 셉니다.

```ts
const userCount = await prisma.user.count()
```

## 관계 카운트

관계를 세는 기능은 버전 2.20.0 이상에서 사용할 수 있습니다.

관계의 개수(예: 사용자의 게시물 수)를 반환하려면 다음과 같이 중첩된 `select`에 `_count` 매개변수를 사용합니다.

```ts
const usersWithCount = await prisma.user.findMany({
  include: {
    _count: {
      select: { posts: true },
    },
  },
})
```

```ts title="결과"
{ id: 1, _count: { posts: 3 } },
{ id: 2, _count: { posts: 2 } },
{ id: 3, _count: { posts: 2 } },
{ id: 4, _count: { posts: 0 } },
{ id: 5, _count: { posts: 0 } }
```

`_count` 매개변수는 다음과 같습니다.

- `include` 또는 `select` 최상위 수준에서 사용 가능함
- 레코드를 반환하는 모든 질의와 함께 사용 가능함 (`delete`, `update`, `findFirst`) 
- 여러 관계의 개수를 반환할 수 있음
- 4.3.0부터는 관계의 개수를 필터링할 수 있음

### `include`를 사용하여 관계의 개수 세기

다음 질의는 결과에 각 사용자의 게시물 수를 포함합니다.

```ts
const usersWithCount = await prisma.user.findMany({
  include: {
    _count: {
      select: { posts: true },
    },
  },
})
```

```ts title="결과"
{ id: 1, _count: { posts: 3 } },
{ id: 2, _count: { posts: 2 } },
{ id: 3, _count: { posts: 2 } },
{ id: 4, _count: { posts: 0 } },
{ id: 5, _count: { posts: 0 } }
```

### `select`를 사용하여 관계의 개수 세기

다음 질의는 `select`를 사용하여 각 사용자의 게시물 수를 반환하고 다른 필드는 반환하지 않습니다.

```ts
const usersWithCount = await prisma.user.findMany({
  select: {
    _count: {
      select: {
        posts: true,
        recipes: true,
      },
    },
  },
})
```

```ts title="결과"
{
  _count: {
    posts: 3,
    recipes: 9
  }
}
```

## `null`이 아닌 필드 값의 개수 세기

2.15.0 이상에서는 모든 레코드와 `null`이 아닌 필드 값의 개수를 셀 수 있습니다.

하단의 질의는 다음의 수를 반환합니다.

- 모든 `User` 레코드 (`_all`)
- `null`이 아닌 모든 `name` 값 (고유 값이 아니라 `null`이 아닌 값)

```ts
const userCount = await prisma.user.count({
  select: {
    _all: true, // 모든 레코드의 개수를 셉니다.
    name: true, // null이 아닌 모든 필드 값을 셉니다.
  },
})
```

```ts title="결과"
{ _all: 30, name: 10 }
```

## 필터링된 개수 세기

`count`는 필터링을 지원합니다.

다음 질의는 프로필 보기가 100개 이상인 모든 사용자를 셉니다.

```ts
const userCount = await prisma.user.count({
  where: {
    profileViews: {
      gte: 100,
    },
  },
})
```

다음 질의는 특정 사용자의 게시물을 셉니다.

```ts
const postCount = await prisma.post.count({
  where: {
    authorId: 29,
  },
})
```
