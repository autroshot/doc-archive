---
sidebar_position: 5
sidebar_label: 이미지 최적화
---

# 이미지 컴포넌트와 이미지 최적화

넥스트 이미지 컴포넌트 [`next/image`](https://nextjs.org/docs/api-reference/next/image)는 HTML `<img>` 요소의 확장으로, 모던 웹용으로 진화되었습니다. 여기에는 좋은 [코어 웹 바이탈](https://nextjs.org/learn/seo/web-performance)을 달성하는 데 도움이 되는 다양한 성능 최적화가 포함되어 있습니다. 이 점수는 웹사이트에서의 사용자 경험을 측정하는 중요한 척도이며 [Google 검색 순위에 반영됩니다](https://nextjs.org/learn/seo/web-performance/seo-impact).

이미지 컴포넌트에 내장된 몇 가지 최적화는 다음과 같습니다.

- 향상된 성능 - 모던 이미지 포맷을 사용하여 항상 각 장치에 대해 알맞은 크기의 이미지를 제공함
- 시각적 안정성 - [누적 레이아웃 이동](https://nextjs.org/learn/seo/web-performance/cls)을 자동으로 방지함
- 더 빠른 페이지 로딩 - 이미지가 뷰포트에 들어갈 때만 로드되며 선택적인 흐릿한 플레이스홀더와 함께 로드됨
- 자산 유연성 - 원격 서버에 저장된 이미지의 경우에도 주문형 이미지 크기 조정이 가능함

## 이미지 컴포넌트 사용하기

앱에 이미지를 추가하려면 [`next/image`](https://nextjs.org/docs/api-reference/next/image) 컴포넌트를 가져옵니다.

```jsx
import Image from 'next/image';
```

또는 기본 `<img>` 요소와 더 비슷한 컴포넌트가 필요한 경우 [`next/future/image`](https://nextjs.org/docs/api-reference/next/future/image)를 가져올 수 있습니다.

```jsx
import Image from 'next/future/image';
```

이제 이미지(로컬 또는 원격)의 `src`을 지정할 수 있습니다.

### 로컬 이미지

로컬 이미지를 사용하려면 `.jpg`, `.png`, `.webp` 파일을 `import`합니다.

```jsx
import profilePic from '../public/me.png';
```

동적 `await import()`나 `require()`는 지원되지 않습니다. `import`는 빌드 타임에 분석이 가능하도록 정적이어야 합니다.

넥스트는 가져온 파일을 기반으로 이미지의 `width`와 `height`를 자동으로 결정합니다. 이 값은 이미지가 로드되는 동안 [누적 레이아웃 이동](https://nextjs.org/learn/seo/web-performance/cls)을 방지하는 데 사용됩니다.

```jsx
import Image from 'next/image';
import profilePic from '../public/me.png';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500}가 자동으로 제공됨
        // height={500}가 자동으로 제공됨
        // blurDataURL="data:..."가 자동으로 제공됨
        // placeholder="blur" // 로딩중에 선택적인 흐릿함
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

### 원격 이미지

원격 이미지를 사용하려면 `src` 프로퍼티가 [상대 경로](https://nextjs.org/docs/basic-features/image-optimization#loaders) 또는 [절대 경로](https://nextjs.org/docs/api-reference/next/image#domains) URL 문자열이어야 합니다. 넥스트는 빌드 과정 중에 원격 파일에 접근할 수 없으므로 [`width`](https://nextjs.org/docs/api-reference/next/image#width)와 [`height`](https://nextjs.org/docs/api-reference/next/image#height), 그리고 선택적 [`blurDataURL`](https://nextjs.org/docs/api-reference/next/image#blurdataurl) 프롭을 수동으로 제공해야 합니다.

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

### 도메인

때로는 원격 이미지에 접근하면서 내장 넥스트 이미지 최적화 API를 계속 사용하고 싶을 수 있습니다. 이렇게 하려면 `loader`의 기본 설정을 그대로 두고 이미지의 `src`에 절대 경로 URL을 입력합니다.

악의적인 사용자로부터 앱을 보호하려면 원격 액세스를 허용할 원격 호스트 이름 목록을 정의해야 합니다.

:::note 참고

[`domains`](https://nextjs.org/docs/api-reference/next/image#domains) 설정을 확인하세요.

:::

### 로더

[앞의 예시](#원격-이미지)에서 원격 이미지의 부분적인 URL(`"/me.png"`)이 제공된 것을 주목할 필요가 있습니다. 이는 `next/image` [로더](https://nextjs.org/docs/api-reference/next/image#loader) 아키텍처 덕분에 가능합니다.

로더는 이미지의 URL을 생성하는 기능입니다. 제공된 `src`에 루트 도메인을 추가하고 다양한 크기의 이미지를 요청할 복수의 URL을 생성합니다. 이 복수의 URL은 자동 [srcset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) 생성에 사용되므로 각자의 뷰포트에 적합한 크기의 이미지가 사이트 방문자에게 제공됩니다.

넥스트 앱의 기본 로더는 내장된 이미지 최적화 API를 사용합니다. 이 API는 웹의 어느 곳에서나 이미지를 최적화한 다음 넥스트 웹 서버에서 직접 이미지를 제공합니다. CDN 또는 이미지 서버에서 직접 이미지를 제공하려는 경우 [내장 로더](https://nextjs.org/docs/api-reference/next/image#built-in-loaders) 중 하나를 사용 하거나 자바스크립트 몇 줄로 직접 작성할 수 있습니다.

로더는 이미지별로 또는 앱 수준에서 정의할 수 있습니다.

### 우선 사항

각 페이지의 [LCP(Large Contentful Paint) 요소](https://web.dev/lcp/#what-elements-are-considered)가 될 이미지에 `priority`(우선 사항) 속성을 추가해야 합니다. 이렇게 하면 넥스트가 로드할 이미지의 우선 순위를 특별히 지정할 수 있으므로(사전 로드 태그나 우선 사항 힌트를 통해) LCP에서 의미 있는 향상으로 이어집니다.

LCP 요소는 일반적으로 페이지의 뷰포트 내에서 볼 수 있는 가장 큰 이미지나 텍스트 블록입니다. `next dev`를 실행할 때 LCP 요소가 `priority` 프로퍼티가 없는 `<Image>`인 경우 콘솔에 경고가 표시됩니다.

LCP 이미지를 식별한 뒤에 다음과 같이 프로퍼티를 추가할 수 있습니다.

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
        priority
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

[`next/image` 컴포넌트 문서](https://nextjs.org/docs/api-reference/next/image#priority)에서 우선 사항의 자세한 내용을 볼 수 있습니다.

## 이미지 크기 조정하기

이미지가 성능을 저하시키는 가장 일반적인 방법 중 하나는 이미지가 로드될 때 페이지의 다른 요소를 밀어내는 **레이아웃 변화**입니다. 이 성능 문제는 사용자에게 매우 성가신 것이여서 [누적 레이아웃 이동](https://web.dev/cls/)이라는 코어 웹 바이탈이 있을 정도입니다. 이미지 기반 레이아웃 이동을 피하는 방법은 [항상 이미지의 크기를 조정](https://web.dev/optimize-cls/#images-without-dimensions)하는 것입니다. 이를 통해 브라우저는 이미지가 로드되기 전에 이미지를 위한 공간을 정확하게 예약할 수 있습니다.

`next/image`는 좋은 성능 결과를 보장하도록 설계되었습니다. 따라서 레이아웃 이동을 유발하는 방식으로 사용할 수 없으며 다음 세 가지 방법 중 하나로 크기를 조정해야 합니다.

1. [정적 가져오기](#로컬-이미지)를 사용하여 자동으로 조정
2. [`width`](https://nextjs.org/docs/api-reference/next/image#width)와 [`height`](https://nextjs.org/docs/api-reference/next/image#height) 프로퍼티를 포함하여 명시적으로 조정
3. [`layout="fill"`](https://nextjs.org/docs/api-reference/next/image#layout)을 사용하여 암시적으로 조정. 이미지가 부모 요소를 채우도록 확장됨

:::note 참고

**이미지의 크기를 모르는 경우에는 어떻게 해야 하나요?**

이미지 크기를 모르는 상태로 소스에서 이미지에 접근하는 경우에 수행할 수 있는 몇 가지 작업이 있습니다.

**`layout='fill'` 사용하기**

`fill` 레이아웃 모드를 사용하면 상위 요소에 따라 이미지 크기를 조정할 수 있습니다. CSS를 사용하여 페이지에서 이미지의 상위 요소 공간을 만든 다음, `fill`, `contain`, `cover`가 있는 [`objectFit` 프로퍼티](https://nextjs.org/docs/api-reference/next/image#objectfit)와 [`objectPosition` 프로퍼티](https://nextjs.org/docs/api-reference/next/image#objectposition)를 사용해 이미지가 해당 공간을 차지하는 방식을 정의합니다.

**이미지 정규화하기**

제어하는 소스에서 이미지를 제공하는 경우에는 이미지 파이프라인을 수정하여 이미지를 특정 크기로 정규화하는 것이 좋습니다.

**API 호출 수정하기**

앱이 API 호출(예: CMS)을 사용하여 이미지 URL을 검색하는 경우에는 URL과 함께 이미지 크기를 반환하도록 API 호출을 수정할 수 있습니다.

:::

제안된 방법 중 어느 것으로도 이미지 크기 조정을 할 수 없는 경우, `next/image` 컴포넌트는 표준 `<img>` 요소와 함께 페이지에서 잘 작동하도록 설계되었습니다.

## 스타일링

:::note 참고

아래 나열된 스타일링 문제의 대부분은 [`next/future/image`](https://nextjs.org/docs/api-reference/next/future/image)을 사용하여 해결할 수 있습니다.

:::

이미지 컴포넌트의 스타일링은 일반 `<img>` 요소의 스타일링과 크게 다르지 않지만 명심해야 할 몇 가지 지침이 있습니다.

**올바른 레이아웃 모드 선택하기**

이미지 컴포넌트에는 페이지에서 크기가 조정되는 방식을 정의하는 여러 가지 [레이아웃 모드](https://nextjs.org/docs/api-reference/next/image#layout)가 있다. 이미지 스타일이 원하는 대로 되지 않으면 다른 레이아웃 모드를 실험해 보는 것이 좋습니다.

**DOM 구조가 아닌 className으로 지정하기**

대부분의 레이아웃 모드에서 이미지 컴포넌트는 정확히 하나의 `<span>`로 래핑된 하나의 `<img>` 태그로 이루어진 DOM 구조를 갖습니다. 일부 모드에는 간격을 위한 `<span>` 형제가 있을 수 있습니다 . 이러한 추가 `<span>` 요소는 컴포넌트가 레이아웃 이동을 방지하는 데 중요한 역할을 합니다.

`<img>`의 내부 스타일을 지정할 때 권장되는 방법은 이미지 컴포넌트의 `className` prop을 가져온 [CSS 모듈](./built-in-css-support.md#컴포넌트-수준-css-추가하기)의 값으로 설정하는 것입니다. `className` 값은 밑에 있는 `<img>` 요소에 자동으로 적용됩니다.

또는 [전역 스타일시트](./built-in-css-support#전역-스타일시트-추가하기)를 가져와서, `className` props을 전역 스타일시트에서 사용된 이름으로 설정할 수 있습니다.

[styled-jsx](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js)는 현재 컴포넌트로 범위가 제한되므로 사용할 수 없습니다.

**`layout='fill'`을 사용할 때 상위 요소에는 `position: relative`가 있어야 합니다**.

이는 해당 레이아웃 모드에서 이미지 요소를 적절하게 렌더링하는 데 필요합니다.

**`layout='responsive'`를 사용할 때 상위 요소에는 `display: block`가 있어야 합니다**.

이는 `<div>` 요소의 기본값이지만 다른 요소의 경우에는 지정해야 할 수 있습니다.

## 설정

`next/image` 컴포넌트와 넥스트 이미지 최적화 API는 [`next.config.js` 파일](https://nextjs.org/docs/api-reference/next.config.js/introduction)에서 설정할 수 있습니다. 이러한 설정을 통해 [원격 이미지 활성화](https://nextjs.org/docs/api-reference/next/image#domains), [사용자 정의 이미지 중단점 정의](https://nextjs.org/docs/api-reference/next/image#device-sizes), [캐싱 작동 변경](https://nextjs.org/docs/api-reference/next/image#caching-behavior) 등의 작업을 수행할 수 있습니다.

자세한 내용은 [이미지 설정 문서](https://nextjs.org/docs/api-reference/next/image#configuration-options)를 확인하세요.
