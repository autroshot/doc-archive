---
sidebar_position: 6
---

import offsetSkipTake from '/img/docs/prisma/pagination/offset-skip-take.png';
import cursor1 from '/img/docs/prisma/pagination/cursor-1.png';
import cursor2 from '/img/docs/prisma/pagination/cursor-2.png';
import cursor3 from '/img/docs/prisma/pagination/cursor-3.png';

# 페이지 매김

프리즈마 클라이언트는 오프셋 페이지 매김과 커서 기반 페이지 매김을 모두 지원합니다.

## 오프셋 페이지 매김

오프셋 페이지 매김은 `skip`과 `take`를 사용하여 특정 수의 결과를 건너뛰고 제한된 범위를 선택합니다.

다음 질의는 처음 3개의 `Post` 레코드를 건너뛰고 레코드 4 - 7을 반환합니다.

```ts
const results = await prisma.post.findMany({
  skip: 3,
  take: 4,
})
```

<Image img={offsetSkipTake} alt='오프셋의 skip과 take' />

결과 페이지를 구현하려면 페이지 수에 페이지당 표시할 결과 수를 곱한 값을 `skip`하면 됩니다.

### ✔ 오프셋 페이지 매김의 장점

- 모든 페이지로 즉시 이동할 수 있습니다.

  예를 들어 200개의 레코드를 `skip`하고  10개의 레코드를 `take`할 수 있으며 결과 집합의 21페이지로 바로 이동하는 것을 시뮬레이트합니다. (기반 SQL은 `OFFSET`을 사용) 커서 기반 페이지 매김에서는 불가능합니다.

- 동일한 결과 집합에 원하는 정렬 순서로 페이지를 매길 수 있습니다.

  예를 들어 이름별로 정렬된 `User` 레코드 목록의 21페이지로 이동할 수 있습니다. 이는 고유한 순차 열을 기준으로 정렬해야 하는 커서 기반 페이지 매김에서는 불가능합니다.

### ✘ 오프셋 페이지 매김의 단점

- 오프셋 페이지 매김은 데이터베이스 수준에서 확장되지 않습니다.

  예를 들어 200,000개의 레코드를 건너뛰고 처음 10개를 가져오는 경우, 데이터베이스는 요청한 10개를 반환하기 전에 여전히 처음 200,000개의 레코드를 순회해야 합니다. 이는 성능에 부정적인 영향을 미칩니다.

### 오프셋 페이지 매김의 사용 사례

- 작은 결과 집합의 얕은 페이지 매김

  예를 들어 작성자별로 `Post` 레코드를 필터링하고 결과에 페이지를 매길 수 있는 블로그 인터페이스가 있습니다.

#### 예시: 필터링 및 오프셋 페이지 매김

다음 질의는 `email` 필드에 `prisma.io`가 포함된 모든 레코드를 반환합니다. 질의는 처음 40개 레코드를 건너뛰고 레코드 41 - 50을 반환합니다.

```ts
const results = await prisma.post.findMany({
  skip: 40,
  take: 10,
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
})
```

#### 예시: 정렬 및 오프셋 페이지 매김

다음 질의는 `email` 필드에 `Prisma`가 포함된 모든 레코드를 반환하고 `title` 필드를 기준으로 결과를 정렬합니다. 질의는 처음 200개의 레코드를 건너뛰고 레코드 201 - 220을 반환합니다.

```ts
const results = await prisma.post.findMany({
  skip: 200,
  take: 20,
  where: {
    email: {
      contains: 'Prisma',
    },
  },
  orderBy: {
    title: 'desc',
  },
})
```

## 커서 기반 페이지 매김

커서 기반 페이지 매김은 `cursor`와 `take`를 사용하여 주어진 **커서** 전후의 제한된 결과들을 반환합니다. 커서는 ID 또는 타임스탬프와 같은 고유하고 순차적인 열이어야 하며, 결과 집합에서 현재 위치를 책갈피로 지정합니다.

다음 예시에서는 `"Prisma"` 단어가 포함된 처음 4개의 `Post` 레코드를 반환하고 마지막 레코드의 ID를 `myCursor`로 저장합니다.

:::note 참고

다음은 첫 번째 질의이므로 전달할 커서가 없습니다.

:::

```ts {15-16}
const firstQueryResults = await prisma.post.findMany({
  take: 4,
  where: {
    title: {
      contains: 'Prisma' /* 선택적 필터 */,
    },
  },
  orderBy: {
    id: 'asc',
  },
})

// 결과 집합에서의 위치를 책갈피로 지정합니다.
// 이 경우에는 4개의 목록에서 마지막 게시물의 ID입니다.

const lastPostInResults = firstQueryResults[3] // 기반이 없는 색인입니다. 기억하세요!
const myCursor = lastPostInResults.id // 예시: 29
```

다음 다이어그램은 처음 4개 결과들의 ID 또는 1 페이지를 보여줍니다. 다음 질의의 커서는 **29**입니다.

<Image img={cursor1} alt='커서 1' />

두 번째 질의는 **전달된 커서 다음에서**(즉, **29**보다 큰 ID를 가진) `"Prisma"`라는 단어가 포함된 처음 4개의 `Post` 레코드를 반환합니다.

```ts {3-5}
const secondQueryResults = await prisma.post.findMany({
  take: 4,
  skip: 1, // 커서를 건너뜁니다.
  cursor: {
    id: myCursor,
  },
  where: {
    title: {
      contains: 'Prisma' /* 선택적 필터 */,
    },
  },
  orderBy: {
    id: 'asc',
  },
})

const lastPostInResults = secondQueryResults[3] // 기반이 없는 색인입니다. 기억하세요!
const myCursor = lastPostInResults.id // 예시: 52
```

다음 다이어그램은 ID가 **29**인 레코드 **다음**에 있는 처음 4개의 `Post` 레코드를 보여줍니다. 이 예시에서 새로운 커서는 **52**입니다.

<Image img={cursor2} alt='커서 2' />

### 자주 묻는 질문

#### 항상 `skip: 1`을 넣어야 하나요?

`skip: 1`을 넣지 않으면 결과 집합에 이전 커서가 포함됩니다.

첫 번째 질의는 4개의 결과를 반환하고 커서는 **29**입니다.

<Image img={cursor1} alt='커서 1' />

`skip: 1`이 없으면 두 번째 질의는 커서를 포함한 4개의 결과를 반환합니다.

<Image img={cursor3} alt='커서 3' />

`skip: 1`이 있으면 커서가 포함되지 않습니다.

<Image img={cursor2} alt='커서 2' />

원하는 페이지 매김 동작에 따라 `skip: 1`을 선택하거나 선택하지 않을 수 있습니다.

#### 커서 값을 추측할 수 있나요?

다음 커서의 값을 추측하면 결과 집합에서 알 수 없는 위치로 페이지를 이동합니다. ID는 순차적이지만 증가 비율을 예측할 수 없습니다. (특히 필터링된 결과 집합에서는 `2`, `20`, `32`가 `1`, `2`, `3`보다 가능성이 높음)

#### 커서 기반 페이지 매김은 기반 데이터베이스의 커서 개념을 사용하나요?

그렇지 않습니다. 커서 페이지 페이지 매김은 기반 데이터베이스(예: 포스트그레SQL)의 커서를 사용하지 않습니다.

### ✔ 커서 기반 페이지 매김의 장점

- 커서 기반 페이지 매김은 일정한 기준을 가집니다. 기반 SQL은 `OFFSET`을 사용하지 않고 대신 `cursor` 값보다 큰 ID를 가진 모든 `Post` 레코드를 질의합니다.

### ✘ 커서 기반 페이지 매김의 단점

- 커서를 기준으로 정렬해야 합니다. 커서는 고유하고 순차적인 열이여야 합니다.
- 커서만으로는 특정 페이지로 이동할 수 없습니다.

  예를 들어 1 - 399 페이지를 먼저 요청하지 않고는 400 페이지(페이지 크기가 20인 경우)의 시작을 나타내는 커서를 정확하게 예측할 수 없습니다.

### 커서 기반 페이지 매김의 사용 사례

- 무한 스크롤
- 예를 들어 날짜/시간 내림차순으로 블로그 게시물을 정렬하고 한 번에 10개의 블로그 게시물을 요청합니다.
- 예를 들어 장기적으로 실행되는 데이터 내보내기의 일부로 전체 결과 집합에 일괄적으로 페이지를 매깁니다.

#### 예시: 필터링 및 커서 기반 페이지 매김

```ts {5-8}
const secondQuery = await prisma.post.findMany({
  take: 4,
  cursor: {
    id: myCursor,
  },
  where: {
    title: {
      contains: 'Prisma' /* 선택적 필터 */,
    },
  },
  orderBy: {
    id: 'asc',
  },
})
```

#### 정렬 및 커서 기반 페이지 매김

커서 기반 페이지 매김을 사용하려면 ID 또는 타임스탬프와 같은 고유하고 순차적인 열을 기준으로 정렬해야 합니다. 커서라고 부르는 이 값은 결과 집합에서 현재 위치를 책갈피로 지정하고 다음 집합을 요청할 수 있게 합니다.

#### 예시: 커서 기반 페이지 매김으로 뒤로 페이지 매기기

뒤로 페이지를 매기려면 `take`를 음수 값으로 설정합니다.

다음 질의는 커서를 제외하고 `id`가 200보다 작은 `Post` 레코드 4개를 반환합니다.

```ts
const myOldCursor = 200

const firstQueryResults = await prisma.post.findMany({
  take: -4,
  skip: 1,
  cursor: {
    id: myOldCursor,
  },
  where: {
    title: {
      contains: 'Prisma' /* 선택적 필터 */,
    },
  },
  orderBy: {
    id: 'asc'
  }
})
```

