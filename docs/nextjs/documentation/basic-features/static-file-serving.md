---
sidebar_position: 7
---

# 정적 파일 제공

넥스트는 루트 디렉터리의 `public` 폴더에서 이미지와 같은 정적 파일을 제공할 수 있습니다. 기본 URL(`/`)에서 시작하는 코드에서 `public` 내부의 파일을 참조할 수 있습니다.

예를 들어 `public/me.png`에 이미지를 추가하면 다음 코드가 이미지에 접근할 수 있습니다.

```jsx
import Image from 'next/image';

function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />;
}

export default Avatar;
```

:::note 참고

`next/image`는 넥스트 10 이상이 필요합니다.

:::

이 폴더에는 `robots.txt`, `favicon.ico`, 구글 사이트 확인, 기타 정적 파일(`.html` 포함)을 넣을 수 있습니다.

:::note 참고

`public` 디렉터리 이름을 다른 이름으로 지정해서는 안 됩니다. 이름은 변경할 수 없으며 정적 자산을 제공하는 데 사용되는 유일한 디렉터리입니다.

:::

:::note 참고

`pages/` 디렉터리의 파일과 동일한 이름을 갖는 정적 파일이 있으면 오류가 발생합니다.

:::

:::note 참고

[빌드 타임](https://nextjs.org/docs/api-reference/cli#build)에 `public` 디렉터리에 있는 자산만 넥스트에서 제공됩니다. 런타임에 추가된 파일은 사용할 수 없습니다. 영구 파일 저장소는 [AWS S3](https://aws.amazon.com/s3/)와 같은 타사 서비스를 이용하는 것을 추천합니다.

:::
