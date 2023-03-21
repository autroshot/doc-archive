---
sidebar_position: 1
---

# 예시 스키마

모든 예시는 다음 스키마를 기반으로 합니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ExtendedProfile {
  id        Int    @id @default(autoincrement())
  biography String
  user      User   @relation(fields: [userId], references: [id])
  userId    Int    @unique
}

model User {
  id           Int              @id @default(autoincrement())
  name         String?
  email        String           @unique
  profileViews Int              @default(0)
  role         Role             @default(USER)
  coinflips    Boolean[]
  posts        Post[]
  profile      ExtendedProfile?
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String
  published  Boolean    @default(true)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  comments   Json?
  views      Int        @default(0)
  likes      Int        @default(0)
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
```

관계형 데이터베이스의 경우에는 `db push` 명령을 사용하여 예시 스키마를 데이터베이스에 푸시합니다.

```shell
npx prisma db push
```
