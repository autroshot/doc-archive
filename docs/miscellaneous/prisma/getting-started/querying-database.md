---
sidebar_position: 5
---

# 데이터베이스 질의하기

이제 프리즈마 클라이언트를 생성했으므로 데이터베이스에서 데이터를 읽고 쓰기 위한 질의 작성을 시작할 수 있습니다. 여기서는 일반 노드 스크립트를 사용하여 프리즈마 클라이언트의 기본 기능을 몇 가지 알아보겠습니다.

`index.ts`라는 새 파일을 만들고 다음 코드를 추가합니다.

```ts title="index.ts"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... 이곳에 프리즈마 클라이언트 질의를 작성할 것입니다.
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

다음은 코드에 대한 간략한 설명입니다.

1. `@prisma/client` 노드 모듈에서 `PrismaClient` 생성자를 가져옴
2. `PrismaClient` 인스턴스화
3. 데이터베이스에 질의를 보내기 위해 `main`이라는 `async` 함수 정의함
4. `main` 함수 호출함
5. 스크립트 종료 시 데이터베이스 연결을 닫음

`main` 함수 내부에 다음 질의를 추가하여 데이터베이스의 모든 `User` 레코드를 읽고 결과를 출력합니다.

```ts title="index.ts" {2-3}
async function main() {
  // ... 이곳에 프리즈마 클라이언트 질의를 작성할 것입니다.
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}
```

이제 다음 명령으로 코드를 실행합니다.

```bash
npx ts-node index.ts
```

아직 데이터베이스에 `User` 레코드가 없으므로 다음과 같이 빈 배열이 출력됩니다.

```json
[]
```

## 데이터베이스에 데이터 쓰기

위에서 사용한 `findMany` 질의는 데이터베이스에서 데이터를 읽기만 합니다. 이 섹션에서는 `Post`와 `User` 테이블에 새 레코드를 생성하는 질의를 작성하는 방법을 배웁니다.

데이터베이스에 `create` 질의를 보내도록 `main` 함수를 수정합니다.

```ts title="index.ts"
async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
```

이 코드는 중첩 쓰기 질의를 사용하여 새 `Post`, `Profile`과 함께 새 `User` 레코드를 만듭니다. `User` 레코드는 각각 `Post.author` ↔ `User.posts`, `Profile.user` ↔ `User.profile` 관계 필드를 통해 두 레코드에 연결됩니다.

`findMany`에 `include` 옵션을 사용하여 `posts`와 `profile` 관계가 포함된 `User` 객체를 반환하도록 프리즈마 클라이언트에게 지시합니다.

코드 실행 결과는 다음과 같습니다.

```ts
[
  {
    email: 'alice@prisma.io',
    id: 1,
    name: 'Alice',
    posts: [
      {
        content: null,
        createdAt: 2020-03-21T16:45:01.246Z,
        id: 1,
        published: false,
        title: 'Hello World',
        authorId: 1,
      }
    ],
    profile: {
      bio: 'I like turtles',
      id: 1,
      userId: 1,
    }
  }
]
```

질의는 `User`와 `Post` 테이블에 새 레코드를 추가했습니다.

**User**

| id   | email               | name      |
| :--- | :------------------ | --------- |
| `1`  | `"alice@prisma.io"` | `"Alice"` |

**Post**

| id   | createdAt                  | title           | content | published | authorId |
| :--- | :------------------------- | :-------------- | :------ | :-------- | :------- |
| `1`  | `2020-03-21T16:45:01.246Z` | `"Hello World"` | `null`  | `false`   | `1`      |

**Profile**

| id   | bio                | userId |
| :--- | :----------------- | :----- |
| `1`  | `"I like turtles"` | `1`    |

:::note 참고

`Post`의 `authorId` 열과 `Profile`의 `userId` 열의 숫자는 `User` 테이블의 `id` 열을 참조합니다. 따라서 `id` 값 `1` 열은 데이터베이스의 첫 번째(그리고 유일한) `User` 레코드를 참조합니다.

:::

이제 `update` 질의를 사용하여 방금 만든 `Post` 레코드를 게시할 것입니다.

다음과 같이 `main` 함수를 수정합니다.

```ts title="index.ts"
async function main() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}
```

코드 실행 결과는 다음과 같습니다.

```ts
{
  id: 1,
  title: 'Hello World',
  content: null,
  published: true,
  authorId: 1
}
```

데이터베이스에서 `id`가 `1`인 `Post` 레코드가 갱신되었습니다.

**Post**

| **id** | **title**       | **content** | **published** | **authorId** |
| :----- | :-------------- | :---------- | :------------ | :----------- |
| `1`    | `"Hello World"` | `null`      | `true`        | `1`          |

지금까지 프리즈마 클라이언트를 사용하여 데이터베이스에 새 데이터를 작성해 보았습니다.

