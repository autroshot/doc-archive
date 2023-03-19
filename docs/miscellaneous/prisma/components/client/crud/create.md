---
sidebar_position: 2
---

# Create

## 단일 레코드 생성하기

다음 질의는 두 개의 필드가 있는 단일 사용자를 생성합니다.

```ts
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
```

```ts title="결과"
{
  id: 22,
  name: 'Elsa Prisma',
  email: 'elsa@prisma.io',
  profileViews: 0,
  role: 'USER',
  coinflips: []
}
```

사용자 `id`는 자동 생성되며 스키마에 따라 필수 필드가 결정됩니다.

### 생성된 타입을 사용하여 단일 레코드 생성하기

다음 예시에서는 동일한 결과를 생성하지만 `create` 질의의 컨텍스트 외부에 `user`라는 이름의 `UserCreateInput` 변수를 생성합니다. 간단한 검사(`create` 질의에 게시물을 포함해야 하는지 여부)를 완료한 후에 `user` 변수가 질의에 전달됩니다.

```ts
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  let includePosts: boolean = false
  let user: Prisma.UserCreateInput

  // 질의에 게시물이 포함되야 하는지를 확인합니다.
  if (includePosts) {
    user = {
      email: 'elsa@prisma.io',
      name: 'Elsa Prisma',
      posts: {
        create: {
          title: 'Include this post!',
        },
      },
    }
  } else {
    user = {
      email: 'elsa@prisma.io',
      name: 'Elsa Prisma',
    }
  }

  // 질의에 user 객체를 전달합니다.
  const createUser = await prisma.user.create({ data: user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

자세한 내용은 [생성된 타입](https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety)을 참고하세요.

## 여러 레코드 생성하기

프리즈마 클라이언트는 2.20.0 이상에서 GA 기능으로 대량 삽입을 지원합니다.

다음 `createMany` 질의는 여러 사용자를 생성하고 중복은 건너뜁니다. (`email`이 고유해야 함)

```ts
const createMany = await prisma.user.createMany({
  data: [
    { name: 'Bob', email: 'bob@prisma.io' },
    { name: 'Bobo', email: 'bob@prisma.io' }, // 중복된 고유 키!
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
  ],
  skipDuplicates: true, // Bobo를 건너뜁니다.
})
```

```ts title="결과"
{
  count: 3
}
```

`createMany`는 복수의 값이 있는 단일 `INSERT INTO`문을 사용합니다. 이는 일반적으로 행별로 `INSERT`하는 것보다 효율적입니다.

```sql
BEGIN
INSERT INTO "public"."User" ("id","name","email","profileViews","role","coinflips","testing","city","country") VALUES (DEFAULT,$1,$2,$3,$4,DEFAULT,DEFAULT,DEFAULT,$5), (DEFAULT,$6,$7,$8,$9,DEFAULT,DEFAULT,DEFAULT,$10), (DEFAULT,$11,$12,$13,$14,DEFAULT,DEFAULT,DEFAULT,$15), (DEFAULT,$16,$17,$18,$19,DEFAULT,DEFAULT,DEFAULT,$20) ON CONFLICT DO NOTHING
COMMIT
SELECT "public"."User"."country", "public"."User"."city", "public"."User"."email", SUM("public"."User"."profileViews"), COUNT(*) FROM "public"."User" WHERE 1=1 GROUP BY "public"."User"."country", "public"."User"."city", "public"."User"."email" HAVING AVG("public"."User"."profileViews") >= $1 ORDER BY "public"."User"."country" ASC OFFSET $2
```

:::note 참고

`$transaction` 내부에 복수의 `create`문이 있으면 복수의 `INSERT`문이 생성됩니다.

:::

## 레코드를 생성하고 관련 레코드를 연결하거나 생성하기

레코드와 하나 이상의 관련 레코드를 동시에 생성하는 방법은 [관계 질의 > 중첩 쓰기](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes)를 참고하세요.