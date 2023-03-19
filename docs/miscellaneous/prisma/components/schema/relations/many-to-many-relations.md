---
sidebar_position: 3
---

# 다대다 관계

다대다(m-n) 관계는 관계의 한쪽에 있는 0개 이상의 레코드가 다른 쪽의 0개 이상의 레코드에 연결될 수 있는 관계를 나타냅니다.

## 관계형 데이터베이스

관계형 데이터베이스에서 m-n 관계는 일반적으로 관계 테이블을 통해 모델링됩니다. m-n 관계는 프리즈마 스키마에서 명시적이거나 암시적일 수 있습니다.

### 명시적 다대다 관계

명시적 다대다 관계에서 관계 테이블은 프리즈마 스키마에서 모델로 표현되며 질의에서 사용할 수 있습니다. 명시적 다대다 관계는 다음의 세 가지 모델을 정의합니다.

- 다대다 관계가 있는 두 모델 (예: `Category`와 `Post`)
- 관계 테이블을 나타내는 하나의 모델. JOIN, 링크, 피벗 테이블으로도 불림 (예: `CategoriesOnPosts`)

이 예시에서 관계 테이블을 나타내는 모델은 `Post`-`Category` 관계를 설명하는 추가 필드를 정의합니다. 이 필드는 누가 카테고리를 할당했는지(`assignedBy`), 카테고리가 언제 할당되었는지(`assignedAt`)를 표현합니다.

```prisma
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int // 관계 스칼라 필드 (위의 @relation 속성에 사용됨)
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

기반 SQL은 다음과 같습니다.

```sql
CREATE TABLE "Category" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY
);
-- Relation table + indexes -------------------------------------------------------
CREATE TABLE "CategoriesOnPosts" (
    "categoryId" integer NOT NULL,
    "postId" integer NOT NULL,
    "assignedBy" text NOT NULL
    "assignedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("categoryId")  REFERENCES "Category"(id),
    FOREIGN KEY ("postId") REFERENCES "Post"(id)
);
CREATE UNIQUE INDEX "CategoriesOnPosts_category_post_unique" ON "CategoriesOnPosts"("categoryId" int4_ops,"postId" int4_ops);
```

#### 명시적 다대다 질의

이제 명시적 다대다 관계를 질의하는 방법을 알아보겠습니다.

관계 모델을 직접 질의(`prisma.categoriesOnPosts(...)`)하거나 중첩 질의를 사용할 수 있습니다. (`Post` → `CategoriesOnPosts` → `Category` 또는 다른 경로)

하단의 질의는 다음과 같습니다.

1. `Post`를 생성함
2. 카테고리 할당이나 `CategoriesOnPosts`(Bob이 할당, 오늘 할당)를 생성함
3. 새로운 `Category`를 생성함

```ts
const createCategory = await prisma.post.create({
  data: {
    title: 'How to be Bob',
    categories: {
      create: [
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            create: {
              name: 'New category',
            },
          },
        },
      ],
    },
  },
})
```

하단의 질의는 다음과 같습니다.

1. 새로운 `Post`를 생성함
2. 새 카테고리 할당이나 `CategoriesOnPosts`를 생성함
3. 범주 할당을 기존 카테고리(ID `9`와 `22`)에 연결함

```ts
const assignCategories = await prisma.post.create({
  data: {
    title: 'How to be Bob',
    categories: {
      create: [
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            connect: {
              id: 9,
            },
          },
        },
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            connect: {
              id: 22,
            },
          },
        },
      ],
    },
  },
})
```

다음 질의는 하나 이상(`some`)의 관련된 `Post` 레코드 제목에 `"Cool stuff"`라는 단어가 포함되어 있고 Bob에 의해 할당된 모든 카테고리를 반환합니다.

```ts
const getAssignments = await prisma.category.findMany({
  where: {
    posts: {
      some: {
        assignedBy: 'Bob',
        post: {
          title: {
            contains: 'Cool stuff',
          },
        },
      },
    },
  },
})
```

다음 질의는 Bob이 5개 게시물 중 하나에 할당한 모든 카테고리 할당(`CategoriesOnPosts`) 레코드를 가져옵니다.

```ts
const getAssignments = await prisma.categoriesOnPosts.findMany({
  where: {
    assignedBy: 'Bob',
    post: {
      id: {
        in: [9, 4, 10, 12, 22],
      },
    },
  },
})
```

### 암시적 다대다 관계

암시적 다대다 관계는 관계 필드를 관계의 양쪽에 있는 목록으로 정의합니다. 관계 테이블은 기반 데이터베이스에 존재하지만 프리즈마에 의해 관리되며 프리즈마 스키마에 **명시되지 않습니다**. 암시적 관계 테이블은 특정 규칙을 따릅니다.

암시적 m-n 관계는 다대다 관계에 대한 프리즈마 클라이언트 API를 좀 더 간단하게 만듭니다. 이는 중첩 쓰기 내부의 중첩 수준이 하나 줄기 때문입니다.

다음 예시에는 `Post`와 `Category` 사이에 하나의 암시적 m-n 관계가 있습니다.

```prisma
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```

#### 암시적 다대다 질의

질의는 [명시적 다대다 질의](#명시적-다대다-질의)보다 중첩이 덜 필요합니다.

다음 질의는 하나의 `Post`와 복수의 `Category` 레코드를 생성합니다.

```ts
const createPostAndCategory = await prisma.post.create({
  data: {
    title: 'How to become a butterfly',
    categories: {
      create: [{ name: 'Magic' }, { name: 'Butterflies' }],
    },
  },
})
```

다음 질의는 하나의 `Category`와 복수의 `Post` 레코드를 생성합니다.

```ts
const createCategoryAndPosts = await prisma.category.create({
  data: {
    name: 'Stories',
    posts: {
      create: [
        { title: 'That one time with the stuff' },
        { title: 'The story of planet Earth' },
      ],
    },
  },
})
```

다음 질의는 할당된 카테고리가 있는 모든 `Post` 레코드를 반환합니다.

```ts
const getPostsAndCategories = await prisma.post.findMany({
  include: {
    categories: true,
  },
})
```

#### 암시적 m-n 관계를 정의하기 위한 규칙

- 관계 테이블에 [하단의 규칙](#암시적-m-n-관계의-관계-테이블에-대한-규칙)을 사용합니다.
- 이름으로 관계를 명확하게 해야 하는 경우(예: `@relation("MyRelation")`, `@relation(name: "MyRelation")`)가 아니면 `@relation` 속성이 필요하지 않습니다.
- `@relation` 속성을 사용하는 경우에는 `references`, `fields`, `onUpdate`, `onDelete` 인수를 사용할 수 없습니다. 해당 인수가 암시적 m-n 관계에 대해 고정된 값을 취하며 변경할 수 없기 때문입니다.
- 두 모델 모두 단일 `@id`가 필요합니다. 다음 사항을 유의해야 합니다.
  - 다중 필드 ID를 사용할 수 없습니다.
  - `@id` 대신 `@unique`를 사용할 수 없습니다.
  - 위의 두 기능을 사용하려면 명시적 다대다를 사용해야 합니다.

#### 암시적 m-n 관계의 관계 테이블에 대한 규칙

분석에서 데이터 모델을 얻은 경우에는, 관계 테이블에 대한 프리즈마의 규칙을 준수하여 암시적 다대다 관계를 계속 사용할 수 있습니다.

다음 예시에서는 `Post`와 `Category`라는 두 모델에 대한 암시적 다대다 관계를 얻기 위해 관계 테이블을 생성한다고 가정합니다.

##### 테이블 이름

관계 테이블이 분석에 의해 암시적 다대다 관계로 선택되도록 하려면, 이름이 다음의 구조를 정확히 따라야 합니다.

- 밑줄 `_`로 시작함
- 그리고 알파벳순에서 첫 번째 테이블의 이름 (예시에서는 `Category`)
- 그리고 `To`
- 그리고 알파벳순에서 두 번째 테이블의 이름 (예시에서는 `Post`)

예시에서 올바른 테이블의 이름은 `_CategoryToPost`입니다.

프리즈마 스키마 파일에서 암시적 다대다 관계를 직접 생성할 때 다른 이름을 갖도록 관계를 설정할 수 있습니다. 이렇게 하면 데이터베이스의 관계 테이블에 지정된 이름이 변경됩니다.

예를 들어 `"MyRelation"`이라는 이름을 가진 관계에 해당하는 테이블은 `_MyRelation`입니다.

##### 열

암시적 다대다 관계를 갖는 관계 테이블에는 정확히 두 개의 열이 있어야 합니다.

- `A`라는 `Category`를 가리키는 외래 키 열
- `B`라는 `Post`를 가리키는 외래 키 열

열은 `A`와 `B`라는 이름을 가져야 합니다. 여기서 `A`는 알파벳순에서 첫 번째 모델을 가리키고 `B`는 알파벳순에서 마지막 모델을 가리킵니다.

##### 색인

다음이 있어야 합니다.

- 두 외래 키 열에 정의된 고유 색인

    ```sql
    CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A" int4_ops,"B" int4_ops);
    ```

- B에 정의된 고유하지 않은 색인

    ```sql
    CREATE INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B" int4_ops);
    ```

##### 예시

다음은 프리즈마 분석에 의해 암시적 다대다 관계로 선택되는 색인(포스트그레SQL 방언)를 포함하는 세 개의 테이블을 생성하는 샘플 SQL문입니다.

```sql
CREATE TABLE "_CategoryToPost" (
    "A" integer NOT NULL REFERENCES "Category"(id) ,
    "B" integer NOT NULL REFERENCES "Post"(id)
);
CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A" int4_ops,"B" int4_ops);
CREATE INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B" int4_ops);

CREATE TABLE "Category" (
    id integer SERIAL PRIMARY KEY
);

CREATE TABLE "Post" (
    id integer SERIAL PRIMARY KEY
);
```

#### 암시적 다대다 관계에서 관계 테이블의 이름 설정하기

프리즈마 마이그레이트를 사용할 때 `@relation` 속성을 사용하여 프리즈마에서 관리하는 관계 테이블의 이름을 설정할 수 있습니다.

예를 들어 관계 테이블에 `_CategoryToPost`라는 기본 이름 대신 `_MyRelationTable`라는 이름을 사용하려면 다음과 같이 지정할 수 있습니다.

```prisma
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[] @relation("MyRelationTable")
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[] @relation("MyRelationTable")
}
```

### 관계 테이블

관계 테이블(JOIN, 링크, 피벗 테이블)은 둘 이상의 다른 테이블을 연결하므로 이들 사이에 관계를 생성합니다. 관계 테이블을 만드는 것은 SQL에서 서로 다른 개체 간의 관계를 나타내는 일반적인 데이터 모델링 방법입니다. 본질적으로 이는 **하나의 m-n 관계는 데이터베이스에서 두 개의 1-n 관계로 모델링된다**는 것을 의미합니다.

프리즈마를 사용할 때 테이블로 모델링 하는 것과 유사한 모델을 정의하여 관계 테이블을 생성할 수 있습니다. 주요 차이점은 관계 테이블의 필드가 모두 해당 관계 스칼라 필드가 있는 주석이 달린 관계 필드라는 것입니다.

관계 테이블은 종종 관계에 **메타 정보**를 추가하는 데 사용됩니다. 예를 들어 관계가 생성된 시간을 저장할 수 있습니다.

다음은 `CategoriesOnPosts`라는 관계 테이블의 예시입니다.

```prisma
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

이 예시에서 `assignedAt` 필드는 `Post`와 `Category` 사이의 관계에 대한 다음의 추가 정보를 저장합니다.

- `assignedAt`는 게시물이 카테고리에 추가된 시점을 저장함
- `assignedBy`는 게시물을 카테고리에 추가한 사람을 저장함

`Post`↔ `CategoriesOnPosts` 및 `Category` ↔ `CategoriesOnPosts` 모두 실제로 1-n 관계이기 때문에 여기에는 1-n 관계와 동일한 규칙이 적용됩니다. 즉, 관계의 한쪽에 `@relation` 속성으로 주석을 달아야 합니다.

관계에 추가 정보를 첨부할 필요가 없는 경우에는 m-n 관계를 암시적 다대다 관계로 모델링할 수 있습니다. 프리즈마 마이그레이트를 사용하지 않고 분석에서 데이터 모델을 얻는 경우에도, 관계 테이블에 대한 프리즈마의 규칙을 따르면 암시적 다대다 관계를 사용할 수 있습니다.

