---
sidebar_position: 4
---

# 사전 기본 스타일

테일윈드 프로젝트를 위한 독단적인 기본 스타일 세트입니다.

[modern-normalize](https://github.com/sindresorhus/modern-normalize) 위에 구축된 사전 스타일은 브라우저 간 불일치를 완화하고 디자인 시스템의 제약 내에서 더 쉽게 작업할 수 있도록 설계된, 테일윈드 프로젝트용 기본 스타일 세트입니다.

테일윈드에서는 CSS에 `@tailwind base`를 포함하면 사전 스타일을 자동으로 삽입합니다.

```css
@tailwind base; /* 사전 스타일이 여기에 주입됩니다. */

@tailwind components;

@tailwind utilities;
```

사전 스타일의 대부분은 눈에 띄지 않게 (예상한 대로 작동하도록) 만들어져 있지만, 일부 스타일은 좀 더 독단적이어서 처음 접했을 때 놀랄 수 있습니다.

사전 스타일에 적용된 모든 스타일은 [스타일시트](https://unpkg.com/tailwindcss@^3/src/css/preflight.css)를 참고하세요.

## 기본 여백이 제거됨

사전 스타일은 제목, 인용구, 단락 등과 같은 요소에서 기본 여백을 모두 제거합니다.

```css
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
```

이렇게 하면 간격 척도의 일부가 아닌 사용자 에이전트 스타일시트에 의해 적용된 여백 값에 실수로 의존하는 일이 잘 생기지 않습니다.

## 제목 스타일이 제거됨

모든 제목 요소는 기본적으로 스타일이 완전히 제거되며, 일반 텍스트와 동일한 글꼴 크기와 글꼴 두께를 갖습니다.

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

그 이유는 두 가지입니다.

- **실수로 유형 척도에서 벗어나는 것을 방지하는 데 도움이 됩니다.** 기본적으로 브라우저는 테일윈드의 기본 글꼴 척도에 존재하지 않으며 자체 글꼴 척도에 존재한다고 보장할 수 없는 크기를 제목에 할당합니다.
- **UI 개발에서는 제목을 시각적으로 강조하지 않아야 하는 경우가 많습니다.** 기본적으로 제목에서 스타일을 제거하면 제목에 적용하는 모든 스타일이 의식적이고 의도적으로 적용됩니다.

언제든지 [자신만의 기본 스타일을 추가하여](https://tailwindcss.com/docs/adding-base-styles) 프로젝트에 기본 제목 스타일을 추가할 수 있습니다.

페이지의 기사 스타일 부분에 감각적인 기본 제목 스타일을 선택적으로 도입하고 싶다면 [`@tailwindcss/typography`](https://tailwindcss.com/docs/typography-plugin) 플러그인을 추천합니다.

## 목록 스타일이 제거됨

순서가 있는 목록과 순서가 없는 목록은 기본적으로 스타일이 제거되며 글머리 기호와 번호, 여백, 패딩이 없습니다.

```css
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

목록의 스타일을 지정하려면 [`list-style-type`](https://tailwindcss.com/docs/list-style-type) 및 [`list-style-position`](https://tailwindcss.com/docs/list-style-position) 유틸리티를 사용하면 됩니다.

```html
<ul class="list-disc list-inside">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

언제든지 [자신만의 기본 스타일을 추가하여](https://tailwindcss.com/docs/adding-base-styles) 프로젝트에 기본 목록 스타일을 추가할 수 있습니다.

페이지의 기사 스타일 부분에 기본 목록 스타일을 선택적으로 도입하고 싶다면 [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) 플러그인을 추천합니다.

### 접근성 고려 사항

스타일이 제거된 목록은 [화면 낭독기에서 목록으로 인식되지 않습니다](https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/). 콘텐츠가 실제로 목록이지만 스타일을 지정하지 않은 상태로 유지하려면 요소에 ['목록' 역할을 추가하세요](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html).

```html
<ul role="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

## 이미지는 블록 수준임

이미지 및 기타 교체된 요소(예: `svg`, `video`, `canvas` 등)는 기본적으로 `display: block`입니다.

```css
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}
```

이는 브라우저의 기본 `display: inline`을 사용할 때 자주 발생하는 예기치 않은 정렬 문제를 방지할 수 있습니다.

요소 중 하나를 `block` 대신 `inline`으로 만들어야 한다면 `inline` 유틸리티를 사용하면 됩니다.

```html
<img class="inline" src="..." alt="...">
```

## 이미지는 부모의 너비로 제한됨

이미지와 동영상은 고유한 종횡비를 유지하며 부모의 너비로 제한됩니다.

```css
img,
video {
  max-width: 100%;
  height: auto;
}
```

이렇게 하면 컨테이너를 넘는 것을 방지하고 기본적으로 반응성이 생기게 됩니다. 이 동작을 재정의해야 한다면 `max-w-none` 유틸리티를 사용하세요.

```html
<img class="max-w-none" src="..." alt="...">
```

## 테두리 스타일이 전역적으로 재설정됨

`border` 클래스를 추가하는 것만으로 테두리를 쉽게 추가할 수 있도록, 테일윈드는 다음 규칙을 사용하여 모든 요소의 기본 테두리 스타일을 재정의합니다.

```css
*,
::before,
::after {
  border-width: 0;
  border-style: solid;
  border-color: theme('borderColor.DEFAULT', currentColor);
}
```

`border` 클래스는 `border-width` 속성만 설정합니다. 따라서 해당 클래스를 추가하면 설정된 기본 테두리 색상을 사용하여 항상 1px의 실선 테두리가 추가됩니다.

이로 인해 [구글 지도](https://github.com/tailwindlabs/tailwindcss/issues/484)와 같은 특정 타사 라이브러리를 통합할 때 예기치 않은 결과가 발생할 수 있습니다.

이와 같은 상황이 발생하면 커스텀 CSS로 사전 스타일을 재정의하여 문제를 해결할 수 있습니다.

```css
.google-map * {
  border-style: none;
}
```

## 사전 스타일 확장하기

사전 스타일 위에 자신만의 기본 스타일을 추가하려면 `@layer base` 지시문을 사용하여 CSS에 간단히 추가하면 됩니다.

```css
@tailwind base;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  a {
    @apply text-blue-600 underline;
  }
}

@tailwind components;

@tailwind utilities;
```

[기본 스타일 추가하기](https://tailwindcss.com/docs/adding-base-styles) 문서에서 자세히 알아보세요.

## 사전 스타일 비활성화하기

기존 프로젝트에 테일윈드를 통합하거나 자신만의 기본 스타일을 제공하려는 등의 이유로 사전 스타일 기능을 완전히 비활성화하려면, `tailwind.config.js` 파일의 `corePlugins`에서 `preflight` 기능을 간단히 `false`로 설정하면 됩니다.

```js title="tailwind.config.js" {1-3}
  module.exports = {
    corePlugins: {
      preflight: false,
    }
  }
```
