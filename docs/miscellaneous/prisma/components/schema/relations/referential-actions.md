---
sidebar_position: 4
---

# 참조 작업

참조 작업(referential action)은 애플리케이션이 관련 레코드를 삭제하거나 갱신할 때 레코드에 어떤 일이 발생하는지 결정합니다.

버전 2.26.0부터 프리즈마 스키마의 관계 필드에 대한 참조 작업을 정의할 수 있습니다. 이를 통해 프리즈마 수준에서 연속 삭제 및 연속 갱신과 같은 참조 작업을 정의할 수 있습니다.

## 참조 작업

참조 작업은 `update`나 `delete` 질의를 실행할 때 데이터베이스에서 참조된 레코드를 처리하는 방법을 정의하는 정책입니다.

### 참조 작업을 사용하는 방법

참조 작업은 `@relation` 속성에 정의되어 있으며, 기반 데이터베이스의 외래 키 제약 조건에 대한 작업에 매핑됩니다. 참조 작업을 별도로 지정하지 않으면 프리즈마는 기본값으로 돌아갑니다.

다음 모델은 명시적으로 정의된 참조 작업을 사용하여 `User`와 `Post` 사이의 일대다 관계, `Post`와 `Tag` 사이의 다대다 관계를 정의합니다.

```prisma {9, 15-16}
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id     Int          @id @default(autoincrement())
  title  String
  tags   TagOnPosts[]
  User   User?        @relation(fields: [userId], references: [id], onDelete: SetNull, onUpdate: Cascade)
  userId Int?
}

model TagOnPosts {
  id     Int   @id @default(autoincrement())
  post   Post? @relation(fields: [postId], references: [id], onUpdate: Cascade, onDelete: Cascade)
  tag    Tag?  @relation(fields: [tagId], references: [id], onUpdate: Cascade, onDelete: Cascade)
  postId Int?
  tagId  Int?
}

model Tag {
  id    Int          @id @default(autoincrement())
  name  String       @unique
  posts TagOnPosts[]
}
```

이 모델은 다음의 참조 작업을 명시적으로 정의합니다.

- `Tag`를 삭제하면 `Cascade` 참조 작업을 사용하여 `TagOnPosts`에서 해당하는 태그 할당도 삭제됩니다.
- `User`를 삭제하면 `SetNull` 참조 작업으로 인해 필드 값이 `Null`로 바꿔어 작성자가 모든 게시물에서 제거됩니다. 이를 허용하려면 `Post`의 `User`와 `userId`가 선택적 필드여야 합니다.

프리즈마는 다음의 참조 작업을 지원합니다.

- `Cascade`
- `Restrict`
- `NoAction`
- `SetNull`
- `SetDefault`

### 참조 작업 기본값

참조 작업을 별도로 지정하지 않으면 프리즈마는 다음의 기본값을 사용합니다.

| 절       | 선택적 관계 | 필수 관계 |
| :------- | :-------- | :-------- |
| `onDelete` | `SetNull`   | `Restrict`  |
| `onUpdate` | `Cascade`   | `Cascade`   |

## 주의 사항

- 암시적 다대다 관계에서는 참조 작업이 지원되지 않습니다. 참조 작업을 사용하려면 명시적 다대다 관계를 정의하고 [조인 테이블](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/troubleshooting-relations#how-to-use-a-relation-table-with-a-many-to-many-relationship)에서 참조 작업을 정의해야 합니다.
- 참조 작업과 필수/선택적 관계의 특정 조합은 호환되지 않습니다. 예를 들어 필수 관계에서 `SetNull`을 사용하면 `null`을 허용하지 않는 제약 조건이 위반되기 때문에 참조된 레코드를 삭제할 때 데이터베이스 오류가 발생합니다. 자세한 내용은 [깃허브 이슈](https://github.com/prisma/prisma/issues/7909)를 참고하세요.

## 참조 작업의 유형

### `Cascade`

- `onDelete: Cascade` - 참조되는 레코드를 삭제하면 참조하는 레코드가 삭제됨
- `onUpdate: Cascade` - 종속 레코드의 참조된 스칼라 필드가 갱신되면 관계 스칼라 필드를 갱신함

예시:

```prisma {3}
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

`User` 레코드가 삭제되면 해당 게시물도 삭제됩니다. 사용자 `id`가 갱신되면 해당하는 `authorId`도 갱신됩니다.

### `Restrict`

- `onDelete: Restrict` - 참조 레코드가 있다면 삭제를 막음
- `onUpdate: Restrict` - 참조된 레코드의 식별자가 변경되는 것을 막음

예시:

```prisma {3}
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Restrict, onUpdate: Restrict)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

게시물이 있는 `User`는 삭제할 수 없습니다. `User`의 `id`는 변경할 수 없습니다.

:::note 참고

이 `Restrict` 작업은 마이크로소프트 SQL 서버에서 사용할 수 없으며 스키마 유효성 검사 오류를 발생시킵니다. 대신 동일한 결과를 생성하고 SQL 서버와 호환되는 `NoAction`를 사용할 수 있습니다.

:::

### `NoAction`

`NoAction` 작업은 `Restrict`과 유사하며 둘 사이의 차이점은 사용 중인 데이터베이스에 따라 다릅니다.

- 마이SQL - `NoAction`은 `Restrict`와 정확히 동일하게 동작합니다. 자세한 내용은 [마이SQL 문서](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html#foreign-key-referential-actions)를 참고하세요.

예시:

```prisma {3}
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

게시물이 있는 `User`는 삭제할 수 없습니다. `User`의 `id`는 변경할 수 없습니다.

### `SetNull`

- `onDelete: SetNull` - 참조하는 개체의 스칼라 필드는 `NULL`로 설정됨
- `onUpdate: SetNull` - 참조된 개체의 식별자를 갱신할 때 참조하는 개체의 스칼라 필드는 `NULL`로 설정됨

`SetNull`은 선택적 관계에서만 작동합니다. 필수 관계에서는 스칼라 필드가 `null`이 될 수 없으므로 런타임 오류가 발생합니다.

```prisma {3}
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User?  @relation(fields: [authorId], references: [id], onDelete: SetNull, onUpdate: SetNull)
  authorId Int?
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

`User`를 삭제하면 작성한 모든 게시물의 `authorId`가 `NULL`로 설정됩니다.

`User`의 `id`를 변경하면 작성한 모든 게시물의 `authorId`가 `NULL`로 설정됩니다.

### `SetDefault`

- `onDelete: SetDefault` - 참조하는 객체의 스칼라 필드는 필드 기본값으로 설정됨
- `onUpdate: SetDefault` - 참조하는 객체의 스칼라 필드는 필드 기본값으로 설정됨

이를 위해서는 관계형 스칼라 필드의 기본값을 `@default`로 설정해야 합니다. 스칼라 필드에 기본값이 제공되지 않으면 런타임 오류가 발생합니다.

```prisma {3-4}
model Post {
  id             Int     @id @default(autoincrement())
  title          String
  authorUsername String? @default("anonymous")
  author         User?   @relation(fields: [authorUsername], references: [username], onDelete: SetDefault, onUpdate: SetDefault)
}

model User {
  username String @id
  posts    Post[]
}
```

`User`를 삭제할 때 기존 게시물의 `authorUsername` 필드 값이 `anonymous`로 설정됩니다.

`User`의 `username`이 변경되면 기존 게시물의 `authorUsername` 필드 값이 `anonymous`로 설정됩니다.

