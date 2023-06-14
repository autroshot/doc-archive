---
sidebar_position: 1
---

# 데이터 소스

데이터 소스는 프리즈마가 데이터베이스를 연결하는 방법을 결정하며 프리즈마 스키마의 `datasource` 블록으로 표시됩니다.

다음 데이터 소스는 `postgresql` 제공자를 사용하고 연결 URL을 포함합니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
}
```

프리즈마 스키마는 데이터 소스를 **하나**만 가질 수 있습니다. 그러나 다음이 가능합니다.

- [`PrismaClient`를 생성할 때 데이터 소스 `url`를 프로그래밍 방식으로 재정의함](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#programmatically-override-a-datasource-url)
- [클라우드 호스팅 개발 데이터베이스로 작업하는 경우, 프리즈마 마이그레이트의 섀도우 데이터베이스에 대해 다른 URL을 지정함](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually)

:::note 참고

다중 제공자 지원은 2.22.0에서 제거되었습니다. 자세한 내용은 [제공자 배열 표기법 사용 중단](https://github.com/prisma/prisma/issues/3834)을 확인하세요.

:::

## 데이터베이스 연결 보안

일부 데이터 소스 `provider`에서는 SSL/TLS로 연결을 구성하고, 인증서 위치를 지정하는 `url` 매개변수를 전달할 수 있습니다.

- [포스트그레SQL과의 SSL 연결 설정](https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection)
- [마이SQL과의 SSL 연결 설정](https://www.prisma.io/docs/concepts/database-connectors/mysql#configuring-an-ssl-connection)
- [마이크로소프트 SQL 서버와의 TLS 연결 설정](https://www.prisma.io/docs/concepts/database-connectors/sql-server#connection-details)

프리즈마는 `./prisma` 디렉터리에 있는 SSL 인증서를 확인합니다. 인증서 파일이 해당 디렉터리 외부에 있는 경우(예: 프로젝트 루트 디렉터리) 인증서에 상대 경로를 사용해야 합니다.

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public&sslmode=require&sslcert=../server-ca.pem&sslidentity=../client-identity.p12&sslpassword=<REDACTED>"
}
```

