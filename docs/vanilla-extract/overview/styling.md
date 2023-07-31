---
sidebar_position: 2
---

# 스타일링

바닐라 엑스트랙트의 모든 스타일링 API는 스타일 객체를 입력으로 사용합니다. 스타일을 자바스크립트 객체로 묘사하면 스타일 코드를 통해 타입스크립트를 훨씬 더 잘 사용할 수 있습니다. 스타일은 나머지 앱 코드와 마찬가지로 타입이 있는 데이터 구조이기 때문입니다. 또한 ([CSS타입](https://github.com/frenic/csstype)을 통해) CSS 작성에 타입 안정성과 자동 완성 기능을 제공합니다.

## CSS 프로퍼티

일반 CSS 클래스를 작성할 때와 마찬가지로, 스타일 객체의 최상위 수준에서 CSS 프로퍼티를 지정할 수 있습니다. 유일한 차이점은 모든 프로퍼티가 `kebab-case`가 아닌 `camelCase`를 사용한다는 것입니다.

```tsx title="app.css.ts"
import { style, globalStyle } from '@vanilla-extract/css';

export const myStyle = style({
  display: 'flex',
  paddingTop: '3px'
});

globalStyle('body', {
  margin: 0
});
```

```css title="CSS"
.app_myStyle__sznanj0 {
  display: flex;
  padding-top: 3px;
}
body {
  margin: 0;
}
```

### 단위가 없는 프로퍼티

일부 프로퍼티는 숫자를 값으로 허용합니다. [단위가 없는 프로퍼티](https://github.com/vanilla-extract-css/vanilla-extract/blob/6068246343ceb58a04006f4ce9d9ff7ecc7a6c09/packages/css/src/transformCss.ts#L25)를 제외하면 이러한 값들은 픽셀로 간주되며 `px`가 값에 자동으로 추가됩니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  // 픽셀로 변환됩니다.
  padding: 10,
  marginTop: 25,

  // 단위가 없는 프로퍼티
  flexGrow: 1,
  opacity: 0.5
});
```

```css title="CSS"
.styles_myStyle__1hiof570 {
  padding: 10px;
  margin-top: 25px;
  flex-grow: 1;
  opacity: 0.5;
}
```

### 공급업체 접두사

공급업체별 프로퍼티(예: `-webkit-tap-highlight-color`)를 대상으로 지정하려면 `PascalCase`를 사용하고 앞의 `-`를 제거하면 됩니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
});
```

```css title="CSS"
.styles_myStyle__1hiof570 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

## CSS 변수

일반 CSS에서 변수(또는 CSS 커스텀 속성)는 규칙 내의 다른 프로퍼티와 함께 설정할 수 있습니다. 바닐라 엑스트랙트에서 CSS 변수는 `vars` 키 내에 중첩되어야 합니다. 이는 다른 CSS 프로퍼티에 대해 보다 정확한 정적 타입을 제공합니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const myStyle = style({
  vars: {
    '--my-global-variable': 'purple'
  }
});
```

```css title="CSS"
.styles_myStyle__1hiof570 {
  --my-global-variable: purple;
}
```

`vars` 키는 [`createVar`](https://vanilla-extract.style/documentation/api/create-var/) API를 통해 만들어진, 범위가 지정된 CSS 변수도 허용합니다.

```tsx title="styles.css.ts"
import { style, createVar } from '@vanilla-extract/css';

const myVar = createVar();

const myStyle = style({
  vars: {
    [myVar]: 'purple'
  }
});
```

```css title="CSS"
.styles_myStyle__1hiof571 {
  --myVar__1hiof570: purple;
}
```

## 미디어 질의

일반 CSS와 달리, 바닐라 엑스트랙트에서는 `@media` 키를 사용하여 스타일 정의 **내부**에 미디어 질의를 삽입할 수 있습니다. 이를 통해 스타일의 반응형 규칙을 단일 데이터 구조에 함께 배치할 수 있습니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@media': {
    'screen and (min-width: 768px)': {
      padding: 10
    },
    '(prefers-reduced-motion)': {
      transitionProperty: 'color'
    }
  }
});
```

```css title="CSS"
@media screen and (min-width: 768px) {
  .styles_myStyle__1hiof570 {
    padding: 10px;
  }
}
@media (prefers-reduced-motion) {
  .styles_myStyle__1hiof570 {
    transition-property: color;
  }
}
```

코드를 CSS로 처리할 때 바닐라 엑스트랙트는 항상 미디어 질의를 **파일의 끝**에 렌더링합니다. 이는 `@media` 키 내부의 스타일이 CSS 규칙 우선 순위 때문에 항상 다른 스타일보다 우선 순위가 높다는 것을 의미합니다.

:::note 참고

안전하다고 판단되면, 바닐라 엑스트랙트는 `@media`, `@supports`, `@container` 조건 블록을 병합하여 가능한 작은 CSS 출력을 생성할 것입니다.

:::

## 선택기

지정된 스타일에 대해 선택기를 지정하는 두 가지 방법이 있습니다. 다른 모든 CSS 프로퍼티와 함께 사용할 수 있는 간단한 의사 선택기와, 보다 복잡한 규칙을 구성할 수 있는 `selectors` 옵션입니다.

:::note 참고

일부 선택기는 `globalStyle`에서 사용할 수 없습니다. 이 API는 선택기를 첫 번째 매개변수로 받으며(예: `ul li:first-of-type, a > span`), 선택기를 병합하면 예상치 못한 결과가 발생할 수 있습니다.

:::

### 간단한 의사 선택기

간단한 의사 선택기는 매개변수를 사용하지 않으므로 감지가 쉽고 정적 타입이 됩니다. 다른 [CSS 프로퍼티](https://vanilla-extract.style/documentation/styling/#css-properties)와 함께 최상위 수준에서 사용할 수 있으며 [CSS 프로퍼티](https://vanilla-extract.style/documentation/styling/#css-properties)와 [CSS 변수](https://vanilla-extract.style/documentation/styling/#css-variables)만 포함할 수 있습니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const myStyle = style({
  ':hover': {
    color: 'pink'
  },
  ':first-of-type': {
    color: 'blue'
  },
  '::before': {
    content: ''
  }
});
```

```css title="CSS"
.styles_myStyle__1hiof570:hover {
  color: pink;
}
.styles_myStyle__1hiof570:first-of-type {
  color: blue;
}
.styles_myStyle__1hiof570::before {
  content: "";
}
```

### 복잡한 선택기

`selectors` 키를 사용하여 더 복잡한 규칙을 작성할 수 있습니다.

유지 관리를 위해, 각 스타일 블록은 단일 요소만 대상으로 지정할 수 있습니다. 이를 적용하려면 모든 선택기가 현재 요소에 대한 참조인 `&` 문자를 대상으로 지정해야 합니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const link = style({
  selectors: {
    '&:hover:not(:active)': {
      border: '2px solid aquamarine'
    },
    'nav li > &': {
      textDecoration: 'underline'
    }
  }
});
```

```css title="CSS"
.styles_link__1hiof570:hover:not(:active) {
  border: 2px solid aquamarine;
}
nav li > .styles_link__1hiof570 {
  text-decoration: underline;
}
```

선택기는 다른 범위의 클래스 이름을 참조할 수도 있습니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const parent = style({});

export const child = style({
  selectors: {
    [`${parent}:focus &`]: {
      background: '#fafafa'
    }
  }
});
```

```css title="CSS"
.styles_parent__1hiof570:focus .styles_child__1hiof571 {
  background: #fafafa;
}
```

현재 클래스가 아닌 요소를 대상으로 하려는 선택기는 유효하지 않습니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const invalid = style({
  selectors: {
    // ❌ 오류: `a[href]`를 대상으로 합니다.
    '& a[href]': {...},

    // ❌ 오류: `.otherClass`를 대상으로 합니다.
    '& ~ div > .otherClass': {...}
  }
});
```

다른 범위 클래스를 대상으로 하려면, 대신 해당 클래스의 스타일 블록 내에서 정의해야 합니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

// 잘못된 예
export const child = style({});
export const parent = style({
  selectors: {
    // ❌ 오류: `parent`에서 `child`을 대상으로 합니다.
    [`& ${child}`]: {...}
  }
});

// 유효한 예
export const parent = style({});
export const child = style({
  selectors: {
    [`${parent} &`]: {...}
  }
});
```

현재 요소(예: `'& a[href]'`) 내의 하위 노드를 전역적으로 대상으로 지정해야 한다면, 대신 [`globalStyle`](https://vanilla-extract.style/documentation/global-api/global-style)을 사용해야 합니다.

```tsx title="styles.css.ts"
import { style, globalStyle } from '@vanilla-extract/css';

export const parent = style({});

globalStyle(`${parent} a[href]`, {
  color: 'pink'
});
```

```css title="CSS"
.styles_parent__1hiof570 a[href] {
  color: pink;
}
```

### 순환 선택기

선택기가 서로 종속된 경우, [획득자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)를 사용하여 선택기를 정의할 수 있습니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const child = style({
  background: 'blue',
  get selectors() {
    return {
      [`${parent} &`]: {
        color: 'red'
      }
    };
  }
});

export const parent = style({
  background: 'yellow',
  selectors: {
    [`&:has(${child})`]: {
      padding: 10
    }
  }
});
```

```css title="CSS"
.styles_child__1hiof570 {
  background: blue;
}
.styles_parent__1hiof571 .styles_child__1hiof570 {
  color: red;
}
.styles_parent__1hiof571 {
  background: yellow;
}
.styles_parent__1hiof571:has(.styles_child__1hiof570) {
  padding: 10px;
}
```

## 컨테이너 질의

컨테이너 질의는 [미디어 질의](https://vanilla-extract.style/documentation/styling/#media-queries)와 동일하게 작동하며 `@container` 키 내부에 중첩됩니다.

:::caution

대상 브라우저가 [컨테이너 질의를 지원](https://caniuse.com/css-container-queries)하는지 확인하세요. 바닐라 엑스트랙트는 [컨테이너 질의 구문](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)을 지원하지만, 미지원 브라우저에서 기능을 폴리필하지는 않습니다.

:::

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@container': {
    '(min-width: 768px)': {
      padding: 10
    }
  }
});
```

```css title="CSS"
@container (min-width: 768px) {
  .styles_myStyle__1hiof570 {
    padding: 10px;
  }
}
```

[`createContainer`](https://vanilla-extract.style/documentation/api/create-container/)를 사용하여 범위가 지정된 컨테이너를 만들 수 있습니다.

```tsx title="styles.css.ts"
import {
  style,
  createContainer
} from '@vanilla-extract/css';

const sidebar = createContainer();

const myStyle = style({
  containerName: sidebar,
  '@container': {
    [`${sidebar} (min-width: 768px)`]: {
      padding: 10
    }
  }
});
```

```css title="CSS"
.styles_myStyle__1hiof571 {
  container-name: styles_sidebar__1hiof570;
}
@container styles_sidebar__1hiof570 (min-width: 768px) {
  .styles_myStyle__1hiof571 {
    padding: 10px;
  }
}
```

## 계층

위의 미디어 질의와 마찬가지로, 바닐라 엑스트랙트를 사용하면 스타일 정의 **내부에서** `@layer` 키를 사용하여 [계층(layer)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)에 스타일을 할당할 수 있습니다.

:::caution

대상 브라우저가 [계층을 지원](https://caniuse.com/css-cascade-layers)하는지 확인하세요. 바닐라 엑스트랙트는 [계층 구문](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)을 지원하지만, 미지원 브라우저에서 기능을 폴리필하지는 않습니다.

:::

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const text = style({
  '@layer': {
    typography: {
      fontSize: '1rem'
    }
  }
});
```

```css title="CSS"
@layer typography;
@layer typography {
  .styles_text__1hiof570 {
    font-size: 1rem;
  }
}
```

`@layer` 키는 [계층](https://vanilla-extract.style/documentation/api/layer/) API를 통해 생성된, 범위가 지정된 계층 참조도 허용합니다.

```tsx title="styles.css.ts"
import { style, layer } from '@vanilla-extract/css';

const typography = layer();

const text = style({
  '@layer': {
    [typography]: {
      fontSize: '1rem'
    }
  }
});
```

```css title="CSS"
@layer styles_typography__1hiof570;
@layer styles_typography__1hiof570 {
  .styles_text__1hiof571 {
    font-size: 1rem;
  }
}
```

계층 관리에 대한 자세한 내용은 [계층](https://vanilla-extract.style/documentation/api/layer/)과 [전역 계층](https://vanilla-extract.style/documentation/global-api/global-layer/)에 대한 API 문서를 참고하세요.

## 지원 질의

지원 질의는 [미디어 질의](https://vanilla-extract.style/documentation/styling/#media-queries)와 동일하게 작동하며 `@supports` 키 내부에 중첩됩니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@supports': {
    '(display: grid)': {
      display: 'grid'
    }
  }
});
```

```css title="CSS"
@supports (display: grid) {
  .styles_myStyle__1hiof570 {
    display: grid;
  }
}
```

## 대체 스타일

일부 브라우저에 존재하지 않는 CSS 프로퍼티 값을 사용할 때 프로퍼티를 두 번 선언하는 경우가 많으며 오래된 브라우저는 이해하지 못하는 값을 무시합니다. 동일한 키를 두 번 선언할 수 없으므로 JS 객체를 사용하는 것은 불가능합니다. 대신 배열을 사용하여 대체 값을 정의합니다.

```tsx title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  // 파이어폭스와 IE에서 "overflow: overlay"는 무시되고
  // "overflow: auto"가 적용됩니다.
  overflow: ['auto', 'overlay']
});
```

```css title="CSS"
.styles_myStyle__1hiof570 {
  overflow: auto;
  overflow: overlay;
}
```

