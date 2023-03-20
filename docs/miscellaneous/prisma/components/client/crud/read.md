---
sidebar_position: 3
---

# Read

모든 예시는 [예시 스키마](../example-schema.md)를 기반으로 합니다.

## ID 또는 고유 식별자로 레코드 가져오기

다음 `findUnique` 질의는 고유 식별자 또는 ID로 단일 레코드를 반환합니다.

```ts
// 고유 식별자 사용
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})

// ID 사용
const user = await prisma.user.findUnique({
  where: {
    id: 99,
  },
})
```

## 복합 ID 또는 복합 고유 식별자로 레코드 가져오기

다음 예시는 `@@id` 또는 `@@unique`로 정의된 복합 ID 또는 고유 식별자로 레코드를 검색하는 방법을 보여줍니다.

다음 프리즈마 모델은 복합 ID를 정의합니다.

```prisma {5}
model TimePeriod {
  year    Int
  quarter Int
  total   Decimal

  @@id([year, quarter])
}
```

이 복합 ID로 기간을 검색하려면 `fieldName1_fieldName2` 패턴을 따르는, 생성된 `year_quarter` 필드를 사용합니다.

```ts
const timePeriod = await prisma.timePeriod.findUnique({
  where: {
    year_quarter: {
      quarter: 4,
      year: 2020,
    },
  },
})
```

다음 프리즈마 모델은 커스텀 이름(`timePeriodId`)으로 복합 고유 식별자를 정의합니다.

```prisma {5}
model TimePeriod {
  year    Int
  quarter Int
  total   Decimal

  @@unique(fields: [year, quarter], name: "timePeriodId")
}
```

이 고유 식별자로 기간을 검색하려면 커스텀 `timePeriodId` 필드를 사용합니다.

```ts
const timePeriod = await prisma.timePeriod.findUnique({
  where: {
    timePeriodId: {
      quarter: 4,
      year: 2020,
    },
  },
})
```

## 모든 레코드 가져오기

다음 `findMany` 질의는 모든 `User` 레코드를 반환합니다.

```ts
const users = await prisma.user.findMany()
```

결과에 [페이지를 매길](https://www.prisma.io/docs/concepts/components/prisma-client/pagination) 수도 있습니다.

## 특정 기준과 일치하는 첫 번째 레코드 가져오기

다음 `findFirst` 질의는 좋아요가 100개 이상인 게시물이 하나 이상 있는 가장 최근에 생성된 사용자를 반환합니다.

1. 내림차순 ID로 사용자 정렬함 (가장 큰 것부터) - 가장 큰 ID가 가장 최근 것
2. 좋아요가 100개 이상인 게시물이 하나 이상 있는 첫 번째 사용자를 내림차순으로 반환함

```ts
const findUser = await prisma.user.findFirst({
  where: {
    posts: {
      some: {
        likes: {
          gt: 100
        }
      }
    }
  },
  orderBy: {
    id: "desc"
  }
})
```

## 필터링된 레코드 목록 가져오기

프리즈마 클라이언트는 레코드 필드 및 관련 레코드 필드에 대한 [필터링](https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting)을 지원합니다.

### 단일 필드 값으로 필터링하기

다음 질의는 `"prisma.io"`으로 끝나는 이메일이 있는 모든 `User` 레코드를 반환합니다.

```ts
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: "prisma.io"
    }
  },
}
```

### 여러 필드 값으로 필터링하기

다음 질의는 [연산자](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators) 조합을 사용합니다. 이름이 `E`로 시작하는 사용자 또는 프로필 뷰가 1개 이상 있는 관리자를 반환합니다.

```ts
const users = await prisma.user.findMany({
  where: {
    OR: [
      {
        name: {
          startsWith: 'E',
        },
      },
      {
        AND: {
          profileViews: {
            gt: 0,
          },
          role: {
            equals: 'ADMIN',
          },
        },
      },
    ],
  },
})
```

### 관련 레코드 필드 값으로 필터링하기

다음 질의는 `prisma.io`로 끝나는 이메일이 있고 게시되지 않은 게시물이 하나 이상(`some`) 있는 사용자를 반환합니다.

```ts
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: "prisma.io"
    },
    posts: {
      some: {
        published: false
      }
    }
  },
}
```

관련 필드 값 필터링에 대한 자세한 내용은 [관계 질의](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)를 참고하세요.

## 필드의 하위 집합 선택하기

다음 `findUnique` 질의는 `select`를 사용하여 특정 `User` 레코드의 `email`과 `name` 필드를 반환합니다.

```ts
const user = await prisma.user.findUnique({
  where: {
    email: 'emma@prisma.io',
  },
  select: {
    email: true,
    name: true,
  },
})
```

```ts title="결과"
{ email: 'emma@prisma.io', name: "Emma" }
```

관계 포함에 대한 자세한 내용은 다음을 참고하세요.

- [필드 선택하기](https://www.prisma.io/docs/concepts/components/prisma-client/select-fields)
- [관계 질의](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)

### 관련 레코드 필드의 하위 집합 선택하기

다음 질의는 중첩 `select`를 사용하여 다음을 반환합니다.

- 사용자의 `email`
- 각 게시물의 `likes` 필드

```ts
const user = await prisma.user.findUnique({
  where: {
    email: 'emma@prisma.io',
  },
  select: {
    email: true,
    posts: {
      select: {
        likes: true,
      },
    },
  },
})
```

```ts title="결과"
{ email: 'emma@prisma.io', posts: [ { likes: 0 }, { likes: 0 } ] }
```

## 관련 레코드 포함하기

다음 질의는 모든 `ADMIN` 사용자를 반환하고 결과에 각 사용자의 게시물을 포함합니다.

```ts
const users = await prisma.user.findMany({
  where: {
    role: 'ADMIN',
  },
  include: {
    posts: true,
  },
})
```

```ts title="결과"
{
    "id": 38,
    "name": "Maria",
    "email": "maria@prisma.io",
    "profileViews": 20,
    "role": "ADMIN",
    "coinflips": [
        true,
        false,
        false
    ],
    "posts": []
},
{
    "id": 39,
    "name": "Oni",
    "email": "oni2@prisma.io",
    "profileViews": 20,
    "role": "ADMIN",
    "coinflips": [
        true,
        false,
        false
    ],
    "posts": [
        {
        "id": 25,
        "authorId": 39,
        "title": "My awesome post",
        "published": true,
        "comments": null,
        "views": 0,
        "likes": 0
        }
    ]
}
```
