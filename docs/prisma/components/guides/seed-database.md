---
sidebar_position: 1
---

# 데이터베이스 시드하기

이 안내서는 프리즈마 클라이언트와 프리즈마의 통합 시딩 기능을 사용하여 데이터베이스를 시드하는 방법을 설명합니다. 시딩을 사용하면 데이터베이스에서 동일한 데이터를 일관되게 다시 생성할 수 있으며 다음이 가능해집니다.

- 앱을 시작하는 데 필요한 데이터(예: 기본 언어나 기본 통화)로 데이터베이스를 채웁니다.
- 개발 환경에서 앱을 검증하고 사용하기 위한 기본 데이터를 제공합니다. 이것은 개발 데이터베이스를 재설정해야 하는 프리즈마 마이그레이트를 사용하는 경우에 특히 유용합니다.

## 프리즈마에서 데이터베이스를 시드하는 방법

프리즈마의 통합 시딩 기능은 `package.json` 파일의 `"prisma"` 키의 `"seed"` 키의 명령을 사용합니다. 모든 명령이 가능하며 `prisma db seed`는 해당 명령을 실행할 것입니다. 이 안내서에서는 기본적으로 프로젝트의 `prisma/` 폴더 안에 시딩 스크립트를 작성하고 명령으로 시작하는 것을 권장합니다.

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```

:::note 참고

`ts-node`가 설치되어 있지 않다면 다음 과정을 따릅니다.

먼저 `ts-node`를 설치합니다.

```bash
npm i -D ts-node
```

타입스크립트를 사용하면 기본적으로 `ts-node`가 변환과 타입 검사를 수행합니다. `ts-node` 실행 속도를 높이기 위해 [SWC](https://swc.rs/)를 사용하는 것을 추천합니다.

다음 명령어로 SWC 모듈을 설치합니다.

```bash
npm i -D @swc/core
```

그리고 `tsconfig.json`에 다음 옵션을 추가합니다.

```json
{
 "ts-node": {
    "swc": true
 }
}
```

:::

## 프리즈마 마이그레이트와 통합 시딩

데이터베이스 시딩은 프리즈마에서 두 가지 방식으로 수행됩니다. `prisma db seed`로 수동으로 실행하거나, `prisma migrate dev`와 `prisma migrate reset`으로 자동으로 수행됩니다.

`prisma db seed`를 사용하면 시딩 명령을 호출할 시기를 직접 결정합니다. 예를 들어 테스트 설정이나 새로운 개발 환경을 준비하는 데 유용할 수 있습니다.

프리즈마 마이그레이트는 하단의 단계를 따르면 시딩와 원활하게 통합됩니다. 프리즈마 마이그레이트가 개발 데이터베이스를 재설정할 때, `package.json`의 `prisma` 섹션에 `seed` 속성이 있다면 시딩이 자동으로 트리거됩니다.

프리즈마 마이그레이트는 다음 시나리오에서 데이터베이스를 재설정하고 시딩을 트리거합니다.

- `prisma migrate reset` CLI 명령을 직접 실행합니다.
- 데이터베이스는 `prisma migrate dev` 사용하는 컨텍스트에서 대화식으로 재설정됩니다. (예: 마이그레이션 기록 충돌 또는 데이터베이스 스키마 드리프트의 결과)
- 시딩 없이 `prisma migrate dev`나 `prisma migrate reset`을 사용하고 싶다면 `--skip-seed` 플래그를 전달합니다.

## 예시 시딩 스크립트

1. `seed.ts`라는 새 파일을 만듭니다. 이 파일은 프로젝트 폴더 구조 내의 아무 곳에나 위치할 수 있습니다. 하단의 예시에서는 `/prisma` 폴더에 저장합니다.

2. `seed.ts` 파일에서 프리즈마 클라이언트를 가져와 초기화하고 일부 레코드를 생성합니다.

   ```ts
   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()
   
   async function main() {
     const alice = await prisma.user.upsert({
       where: { email: 'alice@prisma.io' },
       update: {},
       create: {
         email: 'alice@prisma.io',
         name: 'Alice',
         posts: {
           create: {
             title: 'Check out Prisma with Next.js',
             content: 'https://www.prisma.io/nextjs',
             published: true,
           },
         },
       },
     })
   
     const bob = await prisma.user.upsert({
       where: { email: 'bob@prisma.io' },
       update: {},
       create: {
         email: 'bob@prisma.io',
         name: 'Bob',
         posts: {
           create: [
             {
               title: 'Follow Prisma on Twitter',
               content: 'https://twitter.com/prisma',
               published: true,
             },
             {
               title: 'Follow Nexus on Twitter',
               content: 'https://twitter.com/nexusgql',
               published: true,
             },
           ],
         },
       },
     })
     console.log({ alice, bob })
   }
   
   main()
     .then(async () => {
       await prisma.$disconnect()
     })
     .catch(async (e) => {
       console.error(e)
       await prisma.$disconnect()
       process.exit(1)
     })
   ```

3. 개발 종속성에 `typescript`, `ts-node`, `@types/node`를 추가합니다.

   ```bash
   npm i -D typescript ts-node @types/node
   ```

4. `package.json` 파일에 `prisma.seed` 필드를 추가합니다.

   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "prisma": {
       "seed": "ts-node prisma/seed.ts"
     },
     "devDependencies": {
       "@types/node": "^14.14.21",
       "ts-node": "^9.1.1",
       "typescript": "^4.1.3"
     }
   }
   ```

   일부 프로젝트에서는 컴파일 옵션을 추가해야 할 수 있습니다. 예를 들어 넥스트를 사용할 때 다음과 같이 시드 스크립트를 설정합니다.

   ```json
   "prisma": {
      "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
   },
   ```

5. 데이터베이스를 시드하려면 `db seed` CLI 명령을 실행합니다.

   ```bash
   npx prisma db seed
   ```