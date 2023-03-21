---
sidebar_position: 10
---

# 고유하게 선택하기

프리즈마 클라이언트를 사용하면 프리즈마 질의 응답에서 `findMany` 질의에 `distinct`를 사용하여 중복된 행을 필터링할 수 있습니다. `distinct`는 종종 테이블의 행에서 특정 고유한 값 조합을 식별하기 위해 `select`와 함께 사용됩니다.

다음 예시에서는 고유한 `name` 필드 값이 있는 모든 `User` 레코드의 모든 필드를 반환합니다.

```ts
const result = await prisma.user.findMany({
  where: {},
  distinct: ['name'],
})
```

다음 예시는 고유한 `role` 필드 값(예 : `ADMIN`과 `USER`)을 반환합니다.

```ts
const distinctRoles = await prisma.user.findMany({
  distinct: ['role'],
  select: {
    role: true,
  },
})
```

```ts title="결과"
[
  {
    role: 'USER',
  },
  {
    role: 'ADMIN',
  },
]
```

## `distinct`의 구현 방식

프리즈마의 `distinct` 옵션은 `SELECT DISTINCT` SQL을 사용하지 않습니다. 대신 다음을 사용합니다.

- `SELECT` 질의
- 고유한 선택을 위한 인메모리 후처리

`distinct` 질의에서 `select`와 `include`를 지원하기 위해 이러한 방식으로 설계되었습니다.

다음 예시에서는 각 플레이어의 게임당 최고 점수를 반환하기 위해, `score`로 정렬된 고유한 `gameId`와 `playerId`를 선택합니다. 질의는 `include`와 `select`를 사용하여 추가 데이터를 포함합니다.

- `score`를 선택함 (`Play` 필드에서)
- 관련 선수 이름을 선택함 (`Play`와 `User`의 관계에서)
- 관련 게임 이름을 선택함 ( `Play`와 `Game`의 관계에서)

```prisma title="예시 스키마"
model User {
  id   Int     @id @default(autoincrement())
  name String?
  play Play[]
}

model Game {
  id   Int     @id @default(autoincrement())
  name String?
  play Play[]
}

model Play {
  id       Int   @id @default(autoincrement())
  score    Int?  @default(0)
  playerId Int?
  player   User? @relation(fields: [playerId], references: [id])
  gameId   Int?
  game     Game? @relation(fields: [gameId], references: [id])
}
```

```ts title="질의"
const distinctScores = await prisma.play.findMany({
  distinct: ['playerId', 'gameId'],
  orderBy: {
    score: 'desc',
  },
  select: {
    score: true,
    game: {
      select: {
        name: true,
      },
    },
    player: {
      select: {
        name: true,
      },
    },
  },
})
```

```ts title="결과"
[
  {
    score: 900,
    game: { name: 'Pacman' },
    player: { name: 'Bert Bobberton' }
  },
  {
    score: 400,
    game: { name: 'Pacman' },
    player: { name: 'Nellie Bobberton' }
  }
]
```

`select`와 `distinct`가 없는 질의는 다음을 반환합니다.

```ts
[
  {
    gameId: 2,
    playerId: 5
  },
  {
    gameId: 2,
    playerId: 10
  }
]
```
