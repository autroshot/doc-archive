---
sidebar_position: 3
---

# 데이터베이스 스키마 생성하기

이 가이드에서는 프리즈마의 `db push` 명령을 사용하여 데이터베이스에 테이블을 생성합니다.

다음 프리즈마 데이터 모델을 `prisma/schema.prisma`의 프리즈마 스키마에 추가합니다.

```prisma title="prisma/schema.prisma"
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int

  @@index(authorId)
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique

  @@index(userId)
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

이제 새 스키마를 데이터베이스에 푸시할 준비가 되었습니다. [데이터베이스 연결하기](./connect-your-database.md)의 설명에 따라 `main` 브랜치와 연결합니다.

이제 `db push` CLI 명령을 사용하여 `main` 브랜치로 푸시합니다.

```bash
npx prisma db push
```

이제 프리즈마의 `db push` 명령으로 데이터베이스에 세 개의 테이블을 다음과 같이 만들었습니다.

**User**

| 열 이름 | 타입           | 기본 키 | 외래 키 | 필수  | 기본값    |
| :------ | :------------- | :------ | :------ | :---- | :-------- |
| `id`    | `int`          | **✔️**   | 없음    | **✔️** | 자동 증가 |
| `name`  | `varchar(191)` | 없음    | 없음    | 아니  | -         |
| `email` | `varchar(191)` | 없음    | 없음    | **✔️** | -         |

**Post**

| 열 이름     | 타입           | 기본 키 | 외래 키 | 필수  | 기본값    |
| :---------- | :------------- | :------ | :------ | :---- | :-------- |
| `id`        | `int`          | **✔️**   | 없음    | **✔️** | 자동 증가 |
| `createdAt` | `datetime(3)`  | 없음    | 없음    | **✔️** | `now()`   |
| `updatedAt` | `datetime(3)`  | 없음    | 없음    | **✔️** |           |
| `title`     | `varchar(255)` | 없음    | 없음    | **✔️** | -         |
| `content`   | `varchar(191)` | 없음    | 없음    | 없음  | -         |
| `published` | `tinyint(1)`   | 없음    | 없음    | **✔️** | `false`   |
| `authorId`  | `int`          | 없음    | 없음    | **✔️** | -         |

**Profile**

| 열 이름  | 타입           | 기본 키 | 외래 키 | 필수  | 기본값    |
| :------- | :------------- | :------ | :------ | :---- | :-------- |
| `id`     | `int`          | **✔️**   | 없음    | **✔️** | 자동 증가 |
| `bio`    | `varchar(191)` | 없음    | 없음    | 없음  | -         |
| `userId` | `int`          | 없음    | 없음    | **✔️** | -         |

