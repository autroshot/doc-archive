---
sidebar_position: 2
---

# 생성기

프리즈마 스키마는 `generator` 블록으로 표현되는 하나 이상의 생성기(generator)를 가질 수 있습니다.

예시:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/prisma-client-js"
}
```

생성기는 `prisma generate` 명령을 실행할 때 생성되는 자산을 결정합니다. 주요 프로퍼티인 `provider`는 생성되는 **프리즈마 클라이언트(언어별)**를 정의합니다. 현재는 `prisma-client-js`만 가능합니다. 대신 생성기 사양을 따르는 Npm 패키지를 정의할 수도 있습니다. 원한다면 `output`을 이용해, 생성된 자산에 대한 커스텀 출력 폴더를 정의할 수 있습니다.

## 프리즈마 클라이언트: `prisma-client-js`

프리즈마의 자바스크립트 클라이언트용 생성기는 여러 추가 속성을 허용합니다.

- `previewFeatures` - 포함할 [미리 보기 기능](https://www.prisma.io/docs/concepts/components/preview-features)
- `binaryTargets` - `prisma-client-js`의 엔진 이진 대상 (예: 우분투 18+에 배포한다면 `debian-openssl-1.1.x`, 로컬에서 작업한다면 `native`)

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["sample-preview-feature"]
  binaryTargets   = ["linux-musl"]
}
```

### 이진 대상

프리즈마 클라이언트 JS(`prisma-client-js`)는 여러 [엔진](https://github.com/prisma/prisma-engines)을 사용합니다. 엔진은 러스트로 구현되며, 프리즈마에서 실행 가능한, 플랫폼 종속 엔진 파일의 형태로 사용됩니다. 코드를 실행하는 플랫폼에 따라 올바른 파일이 필요합니다. 이진 대상은 대상 플랫폼에 대해 어떤 파일이 있어야 하는지 정의합니다.

올바른 파일은 앱을 프로덕션에 [배포](https://www.prisma.io/docs/guides/deployment/deployment)할 때 특히 중요하며, 이는 종종 로컬 개발 환경과 다릅니다.

#### `native` 이진 대상

`native` 이진 대상은 특별합니다. 구체적인 운영 체제에 매핑되지 않습니다. 대신 프리즈마가 현재 운영 체제를 감지하고 자동으로 올바른 이진 대상을 지정합니다.

예를 들어 맥 OS를 실행 중이고 다음 생성기를 지정한다고 가정하겠습니다.

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}
```

이 경우 프리즈마는 운영 체제를 감지하고 [지원 운영 체제 목록](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#binarytargets-options)에 기반해 적합한 이진 파일을 찾습니다. 맥 OS(`darwin`)를 실행하고 있으므로 컴파일된 이진 파일은 `darwin`으로 선택됩니다.

:::note 참고

`native` 이진 대상이 기본값입니다. [다른 환경에 배포할 추가 이진 대상을 포함하려는 경우](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda#binary-targets-in-schemaprisma), 이를 명시적으로 지정할 수 있습니다.

:::

## 커뮤니티 생성기

커뮤니티 생성기 목록은 [문서](https://www.prisma.io/docs/concepts/components/prisma-schema/generators#community-generators)에서 확인할 수 있습니다.