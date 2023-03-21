---
sidebar_position: 6
---

# 고급 질의 예시

모든 예시는 [예시 스키마](./example-schema.md)를 기반으로 합니다.

## 깊이 중첩된 레코드 트리 만들기

- 단일 `User`
- 두 개의 새로운 관련 `Post` 레코드
- 게시물별로 `Category` 연결하거나 생성하기

```ts
const u = await prisma.user.create({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
  data: {
    email: 'emma@prisma.io',
    posts: {
      create: [
        {
          title: 'My first post',
          categories: {
            connectOrCreate: [
              {
                create: { name: 'Introductions' },
                where: {
                  name: 'Introductions',
                },
              },
              {
                create: { name: 'Social' },
                where: {
                  name: 'Social',
                },
              },
            ],
          },
        },
        {
          title: 'How to make cookies',
          categories: {
            connectOrCreate: [
              {
                create: { name: 'Social' },
                where: {
                  name: 'Social',
                },
              },
              {
                create: { name: 'Cooking' },
                where: {
                  name: 'Cooking',
                },
              },
            ],
          },
        },
      ],
    },
  },
})
```

