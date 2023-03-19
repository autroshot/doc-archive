# 일대일 관계

## 개요

일대일(1-1) 관계는 관계의 양쪽에서 최대 **하나**의 레코드를 연결할 수 있는 관계를 나타냅니다.

다음 예시에서 `User`와 `Profile` 사이에는 일대일 관계가 있습니다.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}
```

`userId` 관계 스칼라는 기반 데이터베이스의 외래 키를 직접적으로 표현합니다.

이 일대일 관계는 다음을 표현합니다.

- `User`의 `profile` 필드가 선택 사항이기 때문에 사용자는 0개나 1개의 프로필을 가질 수 있습니다.
- 프로필은 항상 하나의 사용자에게 연결되어야 합니다.

이전 예시에서 `Profile` 모델의 `user` 관계 필드는 `User` 모델의 `id` 필드를 참조합니다. 다른 필드를 참조할 수도 있습니다. 이 경우에는 각 `Profile`에 하나의 `User`만 연결된다는 것을 보장하기 위해 `@unique` 속성을 필드에 붙여야 합니다. 

다음 예시에서 `user` 필드는 `@unique` 속성으로 표시된 `User` 모델의 `email` 필드를 참조합니다.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique // <-- unique 속성을 추가합니다.
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [email])
  userId Int  @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}
```

:::note 참고

마이SQL에서는 고유 제약 조건이 아니며 참조된 쪽에 색인만 있는 외래 키를 생성할 수 있습니다. 프리즈마 버전 4.0.0 이상에서 이 유형의 관계를 분석하면 유효성 검사 오류가 발생합니다. 이 문제를 해결하려면 참조 필드에 `@unique` 제약 조건을 추가해야 합니다.

:::

## 관계형 데이터베이스의 다중 필드 관계

관계형 데이터베이스에서만 [다중 필드 ID](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#id-1)를 사용하여 1-1 관계를 정의할 수 있습니다.

```prisma
model User {
  firstName String
  lastName  String
  profile   Profile?

  @@id([firstName, lastName])
}

model Profile {
  id            Int    @id @default(autoincrement())
  user          User   @relation(fields: [userFirstName, userLastName], references: [firstName, lastName])
  userFirstName String // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
  userLastName  String // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)

  @@unique([userFirstName, userLastName])
}
```

## 데이터베이스의 1-1 관계

### 관계형 데이터베이스

다음 예시는 SQL에서 1-1 관계를 생성하는 방법을 보여줍니다.

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL UNIQUE,
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);
```

외래 키 `userId`에 `UNIQUE` 제약 조건이 있는 것을 주목할 필요가 있습니다. 이 `UNIQUE` 제약 조건이 없으면 관계는 1-n 관계로 간주됩니다.

다음 예시는 복합 키(`firstName`와 `lastName`)를 사용하여 SQL에서 1-1 관계를 생성하는 방법을 보여줍니다.

```sql
CREATE TABLE "User" (
    firstName TEXT,
    lastName TEXT,
    PRIMARY KEY ("firstName","lastName")
);
CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    UNIQUE ("userFirstName", "userLastName")
    FOREIGN KEY ("userFirstName", "userLastName") REFERENCES "User"("firstName", "lastName")
);
```

## 필수 및 선택적 1-1 관계 필드

일대일 관계에서 관계 스칼라가 **없는** 관계 쪽(데이터베이스의 외래 키를 나타내는 필드)은 **선택 사항**이어야 합니다.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile? // 관계 스칼라가 아닙니다. 반드시 선택 사항이어야 합니다.
}
```

이 제한 사항은 2.12.0에서 도입되었습니다.

그러나 관계 스칼라가 있는 관계의 쪽이 선택인지 필수인지 고를 수 있습니다. 

다음 예시에서 `profile`과 `profileId`는 필수입니다. 이는 `Profile`을 연결하거나 생성하지 않고 `User`를 생성할 수 없다는 것을 의미합니다.

```prisma
model User {
  id        Int     @id @default(autoincrement())
  profile   Profile @relation(fields: [profileId], references: [id]) // Profile의 id를 참조합니다.
  profileId Int     @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}

model Profile {
  id   Int   @id @default(autoincrement())
  user User?
}
```

다음 예시에서 `profile`과 `profileId`는 선택 사항입니다. 이는 `Profile`을 연결하거나 생성하지 않고도 사용자를 생성할 수 있다는 것을 의미합니다.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  profile   Profile? @relation(fields: [profileId], references: [id]) // Profile의 id를 참조합니다.
  profileId Int?     @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}

model Profile {
  id   Int   @id @default(autoincrement())
  user User?
}
```

## 1-1 관계에서 외래 키를 저장할 쪽 선택하기

1-1 관계에서 `@relation` 속성을 붙이고 싶은 관계의 쪽을 결정할 수 있습니다. (따라서 외래 키를 보유함)

다음 예시에서 `Profile` 모델의 관계 필드는 `@relation` 속성이 붙습니다. `userId`는 기반 데이터베이스의 외래 키를 직접적으로 나타냅니다.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int  @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}
```

`@relation` 속성을 관계의 반대쪽에 붙일 수도 있습니다.

다음 예시는 `User` 모델의 관계 필드에 주석을 답니다. `profileId`는 기반 데이터베이스의 외래 키를 직접적으로 표현합니다.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  profile   Profile? @relation(fields: [profileId], references: [id])
  profileId Int?     @unique // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
}

model Profile {
  id   Int   @id @default(autoincrement())
  user User?
}
```

