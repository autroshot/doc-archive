---
sidebar_position: 2
---

# 데이터베이스 연결하기

데이터베이스를 연결하려면 프리즈마 스키마의 `datasource` 블록의 `url` 필드를 데이터베이스 연결 URL로 설정해야 합니다.

```prisma title="prisma/schema.prisma"
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`prisma init`으로 생성된 기본 스키마는 포스트그레SQL을 `provider`로 사용합니다. 플래닛스케일의 경우 제공자로 `mysql`을 사용하도록 `datasource` 블록을 편집해야 합니다.

```prisma title="prisma/schema.prisma" {1}
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

그리고 `datasource` 블록에서 [관계 모드 유형을 `prisma`로 설정](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#emulate-relations-in-prisma-with-the-prisma-relation-mode)해야 합니다.

```prisma title="schema.prisma" {3}
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}
```

`url`은 `.env`에서 정의된 환경 변수에 의해 다음으로 설정됩니다.

```bash title=".env"
DATABASE_URL="mysql://janedoe:mypassword@server.us-east-2.psdb.cloud/mydb?sslaccept=strict"
```

이제 자신의 데이터베이스를 가리키도록 연결 URL을 조정해야 합니다.

데이터베이스의 연결 URL 형식은 사용하는 데이터베이스에 따라 다릅니다. 플래닛스케일은 다음과 같은 구조를 가진 마이SQL 연결 URL 형식을 사용합니다.

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

모두 대문자로 표시된 부분은 특정 연결의 세부 정보에 대한 플레이스홀더입니다.

다음은 각 구성 요소에 대한 간단한 설명입니다.

- `USER` - 데이터베이스 사용자의 이름
- `PASSWORD` - 데이터베이스 사용자의 비밀번호
- `PORT` - 데이터베이스 서버가 실행되는 포트 (마이SQL의 경우에는 일반적으로 `3306`)
- `DATABASE` - 데이터베이스의 이름

플래닛스케일로 호스팅되는 데이터베이스의 경우, 연결 URL은 다음과 비슷합니다.

```bash title=".env"
DATABASE_URL="mysql://myusername:mypassword@server.us-east-2.psdb.cloud/mydb?sslaccept=strict"
```

지정된 데이터베이스 브랜치에 대한 연결 URL은 플래닛스케일 계정에서 브랜치에 대한 개요 페이지로 이동하여 `Connect` 버튼을 클릭하면 확인할 수 있습니다. `Passwords`에서 새 비밀번호를 생성하고 `Prisma`를 선택하여 연결 URL에 대한 프리즈마 형식을 가져옵니다.

