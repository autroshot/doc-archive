---
sidebar_position: 4
---

import IdealImage from '@theme/IdealImage';
import fensWfo from '/img/docs/prisma/fens-wfo.png';

# 프리즈마 클라이언트 설치하기

프리즈마 클라이언트를 시작하려면 `@prisma/client` 패키지를 설치해야 합니다.

```bash
npm install @prisma/client
```

설치 명령은 자동으로 `prisma generate`를 호출하여 프리즈마 스키마를 읽고 모델에 맞는 프리즈마 클라이언트를 생성합니다.

<IdealImage img={fensWfo} alt={'프리즈마 클라이언트 설치 과정'} />

앞으로 프리즈마 스키마를 변경할 때마다 프리즈마 클라이언트 API에 변경 사항을 적용하려면 `prisma generate`를 직접 호출하면 됩니다.
