---
sidebar_position: 7
---

# 집계

프리즈마 클라이언트를 사용하면 모델의 숫자 필드(`Int`와 `Float` 등)에 `aggregate`를 수행할 수 있습니다.

다음 질의는 모든 사용자의 평균 연령을 반환합니다.

```ts
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
})

console.log('Average age:' + aggregations._avg.age)
```

집계를 필터링 및 정렬과 결합할 수 있습니다.

예를 들어 하단의 질의는 사용자의 평균 연령을 반환합니다.

- `age` 오름차순으로 정렬함
- `email`에는 `prisma.io`가 포함되야 함
- 10명의 사용자로 제한함

```ts
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  orderBy: {
    age: 'asc',
  },
  take: 10,
})

console.log('Average age:' + aggregations._avg.age)
```

## 집계 값은 `null`을 허용한다

2.21.0 이상에서 `null`이 될 수 있는 필드에 대한 집계는 `number`나 `null`를 반환할 수 있습니다. 레코드를 찾지 못하면 항상 `0`을 반환하는 `count`는 제외됩니다.

`age`에 `null`을 허용하는 스키마에서 다음 질의를 사용한다고 가정해 보겠습니다.

```ts
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
  _count: {
    age: true,
  },
})
```

```ts title="결과"
{
  _avg: {
    age: null
  },
  _count: {
    age: 9
  }
}
```

질의는 다음 시나리오 중 하나일 경우, `{ _avg: { age: null } }`을 반환합니다.

- 사용자가 없음
- 모든 사용자의 `age` 필드 값이 `null`임

이를 통해 실제 집계 값(0일 수 있음)과 데이터가 없는 것을 구별할 수 있습니다.
