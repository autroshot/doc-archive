---
sidebar_position: 8
---

# 그룹화

프리즈마 클라이언트의 `groupBy`를 사용하면 하나 이상의 필드 값(예: `country`, `country`와 `city`)을 기준으로 **레코드를 그룹화**하고 특정 도시에 거주하는 사람들의 평균 연령을 찾는 것과 같이 각 그룹에 대한 **집계를 수행**할 수 있습니다. `groupBy`는 2.20.0 이상에서 GA(Generally Available)입니다.

다음 예시에서는 모든 사용자를 `country` 필드별로 그룹화하고 각 국가의 총 프로필 조회 수를 반환합니다.

```ts
const groupUsers = await prisma.user.groupBy({
  by: ['country'],
  _sum: {
    profileViews: true,
  },
})
```

```ts title="결과"
[
  { country: 'Germany', _sum: { profileViews: 126 } },
  { country: 'Sweden', _sum: { profileViews: 0 } },
]
```

`groupBy`를 사용하여 대륙별 코로나19 확진자 수를 요약하는 예시를 [유튜브](https://youtu.be/BdlCPdPaorY)에서 확인할 수 있습니다.

## `groupBy`와 필터링

`groupBy`는 두 가지 수준의 필터링, `where`과 `having`을 지원합니다.

### `where`로 레코드 필터링하기

`where`을 사용하여 **그룹화하기 전에** 모든 레코드를 필터링할 수 있습니다.

다음 예시는 국가별로 사용자를 그룹화하고 프로필 보기를 합산하지만, 이메일 주소에 `prisma.io`가 들어있는 사용자만 포함합니다.

```ts {2-6}
const groupUsers = await prisma.user.groupBy({
  by: ['country'],
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  _sum: {
    profileViews: true,
  },
})
```

### `having`으로 그룹 필터링하기

`having`을 사용하여 개별 레코드가 아닌 필드의 합계 또는 평균과 같은 집계 값으로 **전체 그룹**을 필터링합니다.

예를 들어 다음 질의는 평균 `profileViews`가 100보다 큰 그룹만 반환합니다. 

```ts {10-16}
const groupUsers = await prisma.user.groupBy({
  by: ['country'],
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  _sum: {
    profileViews: true,
  },
  having: {
    profileViews: {
      _avg: {
        gt: 100,
      },
    },
  },
})
```

#### `having` 사용 사례

`having`의 주요 사용 사례는 집계를 필터링하는 것입니다. 그룹화 하기 전에 `where`을 사용하여 데이터 세트의 크기를 최대한 줄이는 것이 좋습니다. 이렇게 하면 ✔ 데이터베이스가 반환해야 하는 레코드 수가 줄어들고 ✔ 색인이 사용되기 때문입니다.

예를 들어 다음 질의는 스웨덴이나 가나 출신이 아닌 모든 사용자를 그룹화합니다.

```ts {3-5}
const fd = await prisma.user.groupBy({
  by: ['country'],
  where: {
    country: {
      notIn: ['Sweden', 'Ghana'],
    },
  },
  _sum: {
    profileViews: true,
  },
  having: {
    profileViews: {
      _min: {
        gte: 10,
      },
    },
  },
})
```

다음 질의는 동일한 결과를 달성하지만 그룹화 후에 가나의 사용자를 제외합니다. 이는 어떤 이점도 제공하지 않으며 권장되지 않습니다.

```ts {3-5, 11-13}
const groupUsers = await prisma.user.groupBy({
  by: ['country'],
  where: {
    country: {
      not: 'Sweden',
    },
  },
  _sum: {
    profileViews: true,
  },
  having: {
    country: {
      not: 'Ghana',
    },
    profileViews: {
      _min: {
        gte: 10,
      },
    },
  },
})
```

:::note 참고

`having` 내에서는 `by`에서 사용 가능한 집계 값 또는 필드만 필터링할 수 있습니다.

:::

## `groupBy`와 `orderBy`

`groupBy`와 `orderBy`를 같이 사용할 때 다음과 같은 제약 조건이 있습니다.

- `by`에 있는 필드에 `orderBy`할 수 있습니다.
- 집계를 `orderBy`할 수 있습니다. (2.21.0 이상에서 미리 보기 기능)
- `skip`, `take`와 함께 `groupBy`를 사용하는 경우, 질의에 반드시 `orderBy`가 포함되야 합니다.

### 집계 그룹별 정렬하기

집계 그룹별로 정렬할 수 있습니다. 버전 2.21.0에서는 관계형 데이터베이스의 집계된 그룹과 함께 `orderBy`를 사용하는 것이 지원되고, 3.4.0에서는 몽고DB에서도 지원됩니다.

다음 예시에서는 해당 그룹의 사용자 수를 기준으로 각 `city` 그룹을 정렬합니다. (가장 큰 그룹이 앞에 옴)

```ts
const groupBy = await prisma.user.groupBy({
  by: ['city'],
  _count: {
    city: true,
  },
  orderBy: {
    _count: {
      city: 'desc',
    },
  },
})
```

```ts title="결과"
[
  { city: 'Berlin', count: { city: 3 } },
  { city: 'Paris', count: { city: 2 } },
  { city: 'Amsterdam', count: { city: 1 } },
]
```

### 필드별 정렬하기

다음 질의는 국가별로 그룹을 정렬하는데, 처음 두 그룹은 건너뛰고 세 번째와 네 번째 그룹을 반환합니다.

```ts
const groupBy = await prisma.user.groupBy({
  by: ['country'],
  _sum: {
    profileViews: true,
  },
  orderBy: {
    country: 'desc',
  },
  skip: 2,
  take: 2,
})
```

## 자주 묻는 질문

### `groupBy`와 `select`를 함께 사용할 수 있나요?

불가능합니다. 그러나 `by`에 포함된 모든 필드는 자동으로 반환됩니다.

### `where`을 사용하는 것과 `groupBy`와 `having`을 사용하는 것의 차이점은 무엇인가요?

`where`는 그룹화하기 전에 모든 레코드를 필터링합니다. `having`은 전체 그룹을 필터링하며 해당 그룹에 있는 특정 필드의 평균 또는 합계와 같은 집계 필드 값에 대한 필터링을 지원합니다.

### `groupby`와 `distinct`의 차이점은 무엇인가요?

`distinct`, `groupBy` 둘 다 하나 이상의 고유한 필드 값으로 레코드를 그룹화합니다. `groupBy`는 각 그룹 내에서 데이터를 집계할 수 있습니다. 덴마크 게시물의 평균 조회수를 반환하는 것이 그 예입니다. 반면 `distinct`는 그렇지 않습니다.