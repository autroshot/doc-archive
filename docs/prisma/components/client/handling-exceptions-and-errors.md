---
sidebar_position: 11
---

# 예외와 오류 처리하기

:::note 참고

몽고DB에서의 오류 처리는 불완전합니다.

:::

다양한 유형의 오류를 처리하기 위해 `instanceof`를 사용하여 어떤 오류인지 확인하고 처리할 수 있습니다.

다음 예시에서는 이미 존재하는 이메일 레코드로 사용자를 생성하려고 합니다. `email` 필드에 `@unique` 속성이 있기 때문에 오류가 발생합니다.

```prisma title="schema.prisma"
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

`Prisma` 이름공간을 사용하여 오류 유형에 접근합니다. 그런 다음 [오류 코드](https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes)를 확인하고 메시지를 출력할 수 있습니다.

```ts
import { PrismaClient, Prisma } from '@prisma/client'

const client = new PrismaClient()

try {
  await client.user.create({ data: { email: 'alreadyexisting@mail.com' } })
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // 타입에 안전하게 '.code' 프로퍼티에 접근할 수 있습니다.
    if (e.code === 'P2002') {
      console.log(
        'There is a unique constraint violation, a new user cannot be created with this email'
      )
    }
  }
  throw e
}
```

고유 제약 조건의 오류 코드는 `P2002`입니다.