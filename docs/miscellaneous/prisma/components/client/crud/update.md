---
sidebar_position: 4
---

# Update

## 단일 레코드 갱신하기

다음 질의는 `update`를 사용하여 `email`로 단일 `User` 레코드를 찾고 갱신합니다.

```ts
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})
```

```ts title="결과"
{
   "id": 43,
   "name": "Viola the Magnificent",
   "email": "viola@prisma.io",
   "profileViews": 0,
   "role": "USER",
   "coinflips": [],
}
```

## 여러 레코드 갱신하기

다음 질의는 `updateMany`를 사용하여 `prisma.io`를 포함하는 모든 `User` 레코드를 갱신합니다.

```ts
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  data: {
    role: 'ADMIN',
  },
})
```

```ts title="결과"
{
   "count": 19
}
```

## 레코드 갱신하거나 생성하기

다음 질의는 `upsert`를 사용하여 특정 이메일 주소에 해당하는 `User` 레코드를 갱신하거나, 해당 `User` 레코드가 없다면 생성합니다.

```ts
const upsertUser = await prisma.user.upsert({
  where: {
    email: 'viola@prisma.io',
  },
  update: {
    name: 'Viola the Magnificent',
  },
  create: {
    email: 'viola@prisma.io',
    name: 'Viola the Magnificent',
  },
})
```

```ts title="결과"
{
   "id": 43,
   "name": "Viola the Magnificent",
   "email": "viola@prisma.io",
   "profileViews": 0,
   "role": "ADMIN",
   "coinflips": [],
}
```

## 숫자 필드 갱신하기

[원자 숫자 연산](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#atomic-number-operations)을 사용하여 현재 값을 기반으로 숫자 필드를 갱신합니다. (예: 증가 또는 곱하기)

다음 질의는 `views`와 `likes` 필드를 `1` 증가시킵니다.

```ts
const updatePosts = await prisma.post.updateMany({
  data: {
    views: {
      increment: 1,
    },
    likes: {
      increment: 1,
    },
  },
})
```
