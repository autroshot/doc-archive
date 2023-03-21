---
sidebar_position: 2
---

# 플래닛스케일과 프리즈마 사용하기

프리즈마와 [플래닛스케일](https://planetscale.com/)은 프리즈마의 ORM과 플래닛스케일의 확장성이 뛰어난 마이SQL 기반 플랫폼을 사용합니다. 데이터 접근 앱의 신속하고 타입에 안전한 개발 환경을 제공합니다.

## 플래닛스케일이란?

플래닛스케일은 Vitess 데이터베이스 클러스터링 시스템을 사용하여 마이SQL 호환 데이터베이스 플랫폼을 제공합니다.

다음 기능을 가집니다.

- **엔터프라이즈 확장성** - 플래닛스케일은 여러 데이터베이스 서버 간의 확장을 지원하는 고가용성 프로덕션 데이터베이스 클러스터를 제공합니다. 연결 제한을 관리해야 하는 문제를 피할 수 있으므로 서버리스 컨텍스트에서 특히 유용합니다.
- **데이터베이스 브랜치** - 플래닛스케일을 사용하면 데이터베이스 스키마의 브랜치를 생성할 수 있으므로 프로덕션 데이터베이스에 변경 사항을 적용하기 전에 개발 분기에서 변경 사항을 테스트할 수 있습니다.
- **비동기 스키마 변경** - 플래닛스케일은 사용자가 데이터베이스를 잠그거나 다운타임을 일으키지 않고 데이터베이스 스키마를 갱신할 수 있는 워크플로를 제공합니다.

## 다른 데이터베이스 제공자와의 공통점

플래닛스케일과 프리즈마를 사용하는 것은 다른 관계형 데이터베이스와 프리즈마를 사용하는 것과 거의 동일합니다.

다음 기능을 동일하게 사용할 수 있습니다.

- 프리즈마 스키마 언어로 데이터베이스를 모델링함
- 플래닛스케일이 제공하는 연결 문자열로 스키마에서 프리즈마의 기존 `mysql` 데이터베이스 커넥터를 사용함
- 플래닛스케일에 이미 데이터베이스 스키마가 있는 경우 기존 프로젝트에 분석을 사용함
- `db push`를 사용하여 스키마의 변경 사항을 데이터베이스에 푸시함
- 앱에서 프리즈마 클라이언트를 사용 하여 플래닛스케일의 데이터베이스 서버와 통신함

## 고려해야 할 차이점

확장성을 위한 플래닛스케일의 브랜치 모델 및 설계로 인해 고려해야 할 차이점이 많습니다.

프리즈마와 플래닛스케일을 사용하기로 결정할 때 다음 사항에 유의해야 합니다.

- **브랜치 및 배포 요청** - 플래닛스케일은 스키마 변경을 테스트할 수 있는 **개발 브랜치**와 직접적인 스키마 변경으로부터 보호되는 **프로덕션 브랜치**라는 두 가지 유형의 데이터베이스 브랜치를 제공합니다. 변경 사항을 개발 브랜치에서 먼저 만든 다음 배포 요청을 사용하여 프로덕션에 배포해야 합니다. 프로덕션 브랜치는 고가용성이며 자동화된 일일 백업을 포함합니다.
- **참조 작업 및 무결성** - 여러 데이터베이스 서버에서 확장을 지원하기 위해 플래닛스케일은 일반적으로 관계형 데이터베이스에서 다른 테이블의 데이터 간의 관계를 적용하는 데 사용되는 외래 키 제약 조건을 사용하지 않습니다. 대신 앱에서 이를 수동으로 처리할 것을 사용자에게 요구합니다.
  프리즈마를 사용하면 데이터에서 이러한 관계를 유지하고 프리즈마 클라이언트에서 참조 무결성을 에뮬레이트 하는 기능을 사용하여 참조 작업을 사용할 수 있습니다.
- **외래 키에 대한 색인 생성** - 프리즈마에서 참조 무결성을 에뮬레이트할 때 외래 키에 대한 색인을 생성해야 합니다. 표준 마이SQL 데이터베이스에서는 테이블에 외래 키 제약 조건이 있는 열에 색인이 자동으로 생성됩니다. 플래닛스케일은 외래 키를 지원하지 않기 때문에 색인은 [현재](https://github.com/prisma/prisma/issues/10611) 참조 무결성을 에뮬레이트할 때 생성되지 않으며, 이로 인해 질의가 제대로 최적화되지 않는 문제가 발생할 수 있습니다. 이를 방지하기 위해 프리즈마에서 색인을 생성할 수 있습니다.
- **`db push`를 사용하여 스키마 변경** - 개발 브랜치를 프로덕션 브랜치에 병합하면 플래닛스케일이 자동으로 두 스키마를 비교하고 자체 스키마 diff를 생성합니다. 이는 마이그레이션 파일의 자체 기록을 생성하는 프리즈마의 `prisma migrate` 워크플로가 플래닛스케일과 함께 작업할 때 자연스럽게 맞지 않는다는 것을 의미합니다. 이러한 마이그레이션 파일은 브랜치가 병합될 때 플래닛스케일에서 실행하는 실제 스키마 변경 사항을 반영하지 않을 수 있습니다.

:::note 참고

플래닛스케일의 스키마를 변경할 때 `prisma migrate`를 사용하지 않는 것을 권장합니다. 대신 `prisma db push` 명령을 사용하는 것이 좋습니다.

:::

- **분석** - 기존 데이터베이스를 분석하면 보통은 테이블을 연결하는 외래 키를 기반으로 정의되기 때문에 관계가 없는 스키마를 얻게 됩니다. 플래닛스케일은 외래 키를 지원하지 않고 프리즈마를 사용하여 참조 무결성을 에뮬레이트하므로 누락된 관계를 수동으로 추가해야 합니다. 자세한 내용은 [분석 후 누락된 관계를 추가하는 방법](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale#how-to-add-in-missing-relations-after-introspection)을 참고하세요.

## 브랜치를 사용하고 요청을 배포하는 방법

프리즈마를 사용하여 플래닛스케일에 연결할 때 브랜치에 올바른 연결 문자열을 사용해야 합니다. 지정된 데이터베이스 브랜치에 대한 연결 URL은 플래닛스케일 계정에서 브랜치 개요 페이지로 이동하고 `Connect` 드롭다운을 선택하면 찾을 수 있습니다. `Passwords` 섹션에서 새 비밀번호를 생성하고 드롭다운에서 `Prisma`를 선택하여 연결 URL에 대한 프리즈마 형식을 가져옵니다. 자세한 내용은 [시작하기](../../getting-started/connect-your-database.md)를 참고하세요.

모든 플래닛스케일 데이터베이스는 처음에 스키마 변경을 테스트하는 데 사용할 수 있는 개발 브랜치인 `main` 브랜치로 생성됩니다. 변경 사항에 만족하면 프로덕션 브랜치로 승격시킬 수 있습니다. 새 변경 사항은 개발 브랜치에만 푸시할 수 있습니다. 따라서 별도의 개발 브랜치에서 추가 변경 사항을 만든 다음 나중에 배포 요청을 사용하여 프로덕션에 배포해야 합니다.

프로덕션 브랜치로 푸시하려고 하면 다음과 같은 오류 메시지가 표시됩니다.

```
Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database.
```

## 플리즈마 클라이언트에서 관계를 에뮬레이트하는 방법

플래닛스케일은 데이터베이스 스키마에서 외래 키를 허용하지 않습니다. 기본적으로 프리즈마는 기본 데이터베이스의 외래 키를 사용하여 프리즈마 스키마에서 필드 간의 관계를 적용합니다. 프리즈마 버전 3.1.1 이상에서는, 데이터베이스의 외래 키가 필요하지 않은 [`prisma` 관계 모드를 사용하여 프리즈마 클라이언트에서 관계를 에뮬레이트](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#emulate-relations-in-prisma-with-the-prisma-relation-mode)할 수 있습니다.

프리즈마 클라이언트에서 관계 에뮬레이션을 사용하려면 `datasource` 블록에서 `relationMode` 필드를 `"prisma"`로 설정하세요.

```prisma title="schema.prisma"
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}
```

:::note 참고

관계 모드를 설정하는 기능은 프리즈마 버전 3.1.1에서 `referentialIntegrity` 미리 보기 기능의 일부로 도입되었으며, 일반적으로 프리즈마 버전 4.8.0 이상에서 사용할 수 있습니다.

`relationMode` 필드는 프리즈마 버전 4.5.0에서 이름이 변경되었으며, 이전의 이름은 `referentialIntegrity`였습니다.

:::

## 외래 키의 색인을 만드는 방법

프리즈마에서 참조 무결성을 에뮬레이트할 때 색인을 생성해야 합니다.

예시로 게시물과 댓글이 있는 블로그에 대한 스키마를 살펴보겠습니다.

```prisma
model Post {
  id       Int       @id @default(autoincrement())
  title    String
  content  String
  likes    Int       @default(0)
  comments Comment[]
}

model Comment {
  id      Int    @id @default(autoincrement())
  comment String
  postId  Int
  post    Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
}
```

`Comment` 모델의 `postId` 필드는 `Post` 모델의 `id` 필드를 참조합니다. 그러나 이는 플래닛스케일에서 외래 키로 구현되지 않으므로 열에 자동 색인이 없습니다. 따라서 일부 질의가 제대로 최적화되지 않을 수 있습니다. 예를 들어 특정 게시물 `id`의 모든 댓글을 질의하는 경우, 플래닛스케일은 전체 테이블 조회를 수행해야 할 수 있습니다. 플래닛스케일은 읽기를 수행한 행의 수에 대해 요금을 부과하기 때문에 느리고 비용이 많이 들 수 있습니다.

이를 피하기 위해 프리즈마의 `@@index` 인수를 사용하여 `postId` 필드에 색인을 정의할 수 있습니다.

```prisma {14}
model Post {
  id       Int       @id @default(autoincrement())
  title    String
  content  String
  likes    Int       @default(0)
  comments Comment[]
}

model Comment {
  id      Int    @id @default(autoincrement())
  comment String
  postId  Int
  post    Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@index([postId])
}
```

그런 다음 `db push`를 사용하여 이 변경 사항을 스키마에 추가할 수 있습니다.

:::note 참고

한 가지 주의해야 할 문제는 암시적 다대다 관계에는 이러한 방식으로 색인을 추가할 수 없다는 것입니다. 질의 속도나 비용이 문제라면 명시적 다대다 관계를 대신 사용할 수 있습니다.

:::

## `db push`로 스키마를 변경하는 방법

플래닛스케일에 `db push`를 사용하려면 먼저 프리즈마에서 참조 무결성 에뮬레이션을 활성화해야 합니다. 참조 에뮬레이션을 활성화하지 않고 브랜치로 푸시하면 다음과 같은 오류 메시지가 나타납니다.

```
Foreign keys cannot be created on this database.
```

예를 들어 위의 블로그 게시물 스키마에 새 `excerpt` 필드를 추가하기로 결정했다고 가정해 보겠습니다. 먼저 새 개발 브랜치를 만들고 연결해야 합니다.

이제 `schema.prisma` 파일에 다음을 추가합니다.

```prisma {4}
model Post {
  id       Int       @id @default(autoincrement())
  title    String
  content  String
  excerpt  String?
  likes    Int       @default(0)
  comments Comment[]
}

model Comment {
  id      Int    @id @default(autoincrement())
  comment String
  postId  Int
  post    Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@index([postId])
}
```

이 변경 사항을 푸시하려면 터미널에서 프로젝트 디렉터리로 이동하여 다음을 실행합니다.

```shell
npx prisma db push
```

개발 브랜치의 변경 사항에 만족하면 배포 요청을 열어 프로덕션 브랜치에 배포할 수 있습니다.

더 많은 예시는 플래닛스케일의 [프리즈마를 이용한 자동 마이그레이션](https://docs.planetscale.com/tutorials/automatic-prisma-migrations)을 참고하세요.

## 분석 후 누락된 관계를 추가하는 방법

`npx prisma db pull`로 분석한 후 얻은 스키마에 일부 관계가 누락되었을 수 있습니다.

예를 들어 다음 스키마에는 `User`와 `Post` 모델 간의 관계가 누락되었습니다.

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  title     String   @db.VarChar(255)
  content   String?
  authorId  Int

  @@index([authorId])
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

이 경우 관계를 직접 추가해야 합니다.

```prisma {5, 15}
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  title     String   @db.VarChar(255)
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int

  @@index([authorId])
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

자세한 예시는 [플래닛스케일 시작하기 가이드](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-planetscale)를 참고하세요.

