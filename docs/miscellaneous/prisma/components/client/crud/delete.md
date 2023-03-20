---
sidebar_position: 5
---

# Delete

## 단일 레코드 삭제하기

다음 질의는 `delete`를 사용하여 단일 `User` 레코드를 삭제합니다.

```ts
const deleteUser = await prisma.user.delete({
  where: {
    email: 'bert@prisma.io',
  },
})
```

모든 `Post`에는 작성자가 필요하므로 하나 이상의 게시물이 있는 사용자를 삭제하려고 하면 오류가 발생합니다. [연속 삭제하기](#연속-삭제하기-관련-레코드-삭제하기)를 참고하세요.

## 여러 레코드 삭제하기

다음 질의는 `deleteMany`를 사용하여 `email`에 `prisma.io`가 포함된 모든 `User` 레코드를 삭제합니다.

```ts
const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
})
```

모든 `Post`에는 작성자가 필요하므로 하나 이상의 게시물이 있는 사용자를 삭제하려고 하면 오류가 발생합니다. [연속 삭제하기](#연속-삭제하기-관련-레코드-삭제하기)를 참고하세요.

## 모든 레코드 삭제하기

다음 질의는 `deleteMany`를 사용하여 모든 `User` 레코드를 삭제합니다.

```ts
const deleteUsers = await prisma.user.deleteMany({})
```

사용자에게 관련 레코드(예: 게시물)가 있으면 이 질의는 실패합니다. 이 경우 [먼저 관련 레코드를 삭제](#연속-삭제하기-관련-레코드-삭제하기)해야 합니다.

## 연속 삭제하기 (관련 레코드 삭제하기)

:::note 참고

2.26.0 이상에서는 [참조 작업](../../schema/relations/referential-actions.md)을 사용하여 연속 삭제를 수행할 수 있습니다.

:::

다음 질의는 `delete`를 사용하여 단일 `User` 레코드를 삭제합니다.

```ts
const deleteUser = await prisma.user.delete({
  where: {
    email: 'bert@prisma.io',
  },
})
```

그러나 예시 스키마에는 `Post`와 `User` 사이에 필수 관계가 있습니다. 즉, 게시물이 있는 사용자는 삭제할 수 없습니다.

```
The change you are trying to make would violate the required relation 'PostToUser' between the `Post` and `User` models.
```

이 오류를 해결하기 위해 다음을 수행할 수 있습니다.

- 관계를 선택적으로 만듬

  ```prisma {2-3}
  model Post {
    id       Int   @id @default(autoincrement())
    author   User? @relation(fields: [authorId], references: [id])
    authorId Int?
  }
  ```

- 사용자를 삭제하기 전에 게시물 작성자를 다른 사용자로 변경함

- 트랜잭션에서 두 개의 개별 질의로 사용자와 모든 게시물을 삭제함 (모든 질의는 성공해야 함)

```ts
const deletePosts = prisma.post.deleteMany({
  where: {
    authorId: 7,
  },
})

const deleteUser = prisma.user.delete({
  where: {
    id: 7,
  },
})

const transaction = await prisma.$transaction([deletePosts, deleteUser])
```

## 모든 테이블에서 모든 레코드 삭제하기

때로는 모든 테이블에서 모든 데이터를 제거하지만 실제 테이블은 유지하고 싶을 때가 있습니다. 이것은 개발 환경과 테스트 중에 특히 유용할 수 있습니다.

다음은 프리즈마 클라이언트와 프리즈마 마이그레이트를 사용하여 모든 테이블에서 모든 레코드를 삭제하는 방법을 보여줍니다.

### `deleteMany`로 모든 데이터 삭제하기

테이블이 삭제되어야 하는 순서를 알면 `deleteMany` 함수를 사용할 수 있습니다. 이것은 `$transaction`에서 동기적으로 실행되며 모든 유형의 데이터베이스와 함께 사용할 수 있습니다.

```ts
const deletePosts = prisma.post.deleteMany()
const deleteProfile = prisma.profile.deleteMany()
const deleteUsers = prisma.user.deleteMany()

// 이 트랜잭션은 동기적으로 실행되므로 deleteUsers가 마지막에 실행되야 합니다.
await prisma.$transaction([deleteProfile, deletePosts, deleteUsers])
```

✅ **장점**

- 스키마의 구조를 미리 알고 있을 때 잘 작동합니다.
- 각 테이블 데이터를 동기적으로 삭제합니다.

❌ **단점**

- 관계형 데이터베이스로 작업할 때, `deleteMany` 함수는 관계형 제약 조건에 관계없이 테이블을 조회하고 `TRUNCATE`하는 보다 일반적인 솔루션에 비해 확장성이 떨어집니다. 이 확장성 문제는 몽고DB 커넥터를 사용할 때는 적용되지 않습니다.

:::note 참고

`$transaction`는 각 모델 테이블에 대해 연속 삭제를 수행하므로 순서대로 호출해야 합니다.

:::

### 원시 SQL로 모든 데이터 삭제하기 / `TRUNCATE`

원시 SQL를 사용하는 것이 익숙하다면 `$executeRawUnsafe`를 이용해 테이블에 `TRUNCATE`를 수행할 수 있습니다.

다음 예시에서 마이SQL 데이터베이스를 사용합니다. 이 경우에는 `TRUNCATE`를 실행하기 전에 제약 조건을 제거해야 합니다. 전체 프로세스는 `$transaction`으로 실행됩니다.

```ts
const transactions: PrismaPromise<any>[] = []
transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`)

const tablenames = await prisma.$queryRaw<
  Array<{ TABLE_NAME: string }>
>`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = 'tests';`

for (const { TABLE_NAME } of tablenames) {
  if (TABLE_NAME !== '_prisma_migrations') {
    try {
      transactions.push(prisma.$executeRawUnsafe(`TRUNCATE ${TABLE_NAME};`))
    } catch (error) {
      console.log({ error })
    }
  }
}

transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`)

try {
  await prisma.$transaction(transactions)
} catch (error) {
  console.log({ error })
}
```

✅ **장점**

- 확장성
- 매우 빠른 속도

❌ **단점**

- 작업을 취소할 수 없음
- 예약된 SQL 키워드를 테이블 이름으로 사용하면 원시 질의를 실행하려고 할 때 문제가 발생할 수 있음

### 프리즈마 마이그레이트로 모든 기록 삭제하기

프리즈마 마이그레이트를 사용한다면 `migrate reset`을 사용할 수 있습니다.

1. 데이터베이스를 삭제함
2. 새 데이터베이스를 만듬
3. 마이그레이션을 적용함
4. 데이터로 데이터베이스를 시드함
