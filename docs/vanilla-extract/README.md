---
sidebar_position: 1
---

# 소개

바닐라 엑스트랙트(vanilla-extract)는 런타임이 없는 타입스크립트 스타일시트입니다.

타입스크립트를 전처리기로 사용하세요. 타입에 안전하고, 로컬 범위 클래스를 가지는, 변수와 테마를 작성하고 빌드에서는 정적 CSS 파일을 생성하세요.

```ts title="styles.css.ts"
import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
    white: '#fff'
  },
  space: {
    small: '4px',
    medium: '8px',
  }
});

export const hero = style({
  backgroundColor: vars.color.brandd, // 오류
  color: vars.color.white,
  padding: vars.space.large // 오류
});
```

- 타입에 안전한 정적 CSS - [Sass](https://sass-lang.com/), [LESS](https://lesscss.org/) 등과 같이 모든 스타일은 빌드에서 생성되며 타입스크립트의 힘을 사용합니다.

- 최고 수준의 테마 - 타입에 안전한 토큰 계약을 사용하여, 단일 글로벌 테마를 만들거나 여러 테마를 만듭니다.

- 프레임워크에 독립적 - 웹팩, esbuild, Vite, 넥스트에 대한 공식 통합이 제공됩니다.

- 높은 확장성 - [스프링클](https://vanilla-extract.style/documentation/packages/sprinkles), [레시피](https://vanilla-extract.style/documentation/packages/recipes), [디저트 박스](https://github.com/TheMightyPenguin/dessert-box)와 같은 라이브러리를 사용하거나 자신만의 라이브러리를 만드세요!

## CSS와 타입스크립트의 모든 기능을 활용하기

플랫폼 기능을 희생하지 않으며 유지 관리가 가능한 CSS를 대규모로 작성할 수 있습니다. 변수, 선택기, 의사 클래스, 미디어/기능/컨테이너 질의, 키프레임, 글꼴, 전역 스타일이 모두 지원됩니다.

```ts title="styles.css.ts"
import { style } from '@vanilla-extract/css';

export const className = style({
  display: 'flex',
  flexDirection: 'column',
  selectors: {
    '&:nth-child(2n)': {
      background: 'aliceblue'
    }
  },
  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row'
    }
  }
});
```

## 타입에 안전한 테마

깊게 중첩된 토큰 계약으로 테마를 정의한 다음, 타입스크립트가 무거운 작업을 수행하도록 합니다. 다시는 변수를 엉망으로 만들 일이 없습니다.

```ts title="styles.css.ts"
import { createTheme, style } from '@vanilla-extract/css';
  
export const [themeClass, vars] = createTheme({
  color: {
    brand: 'aquamarine',
    accent: 'honeydew',
  },
});

export const brandedSection = style({
  backgroundColor: vars.color.brandd, // 오류
```

## 변수를 의도한 대로 사용하기

추상화 없이 변수를 정의하고 사용합니다. 좋아하는 모든 CSS 변수 패턴을 바닐라 엑스트랙트로 변환할 수 있습니다.

```ts title="styles.css.ts"
import { style, createVar } from '@vanilla-extract/css';

const shadowColor = createVar();

export const shadow = style({
  boxShadow: `0 0 10px ${shadowColor}`,
  selectors: {
    '.light &': {
      vars: { [shadowColor]: 'black' }
    },
    '.dark &': {
      vars: { [shadowColor]: 'white' }
    },
  }
});
```

## 스타일을 쉽게 구성하기

스타일 변형을 별도의 모음으로 그룹화한 다음 이름으로 찾아보세요. 어색한 명명 규칙이 필요하지 않습니다.

```ts title="styles.css.ts"
import { styleVariants } from '@vanilla-extract/css';

export const background = styleVariants({
  primary: { background: 'navy' },
  secondary: { background: 'blue' },
  tertiary: { background: 'aqua' },
});

export const color = styleVariants({
  neutral: { color: 'black' },
  secondary: { color: 'gray' },
  link: { color: 'blue' },
});
```

### 실제 스타일시트 생성하기

런타임 비용 없이, 동급 최고의 개발자 경험을 제공합니다. 사용자에게 동적 CSS 엔진을 제공하지 말고 일반 CSS를 제공하세요.

```css title="output.css"
:root {
  --space-none__ya5b7b0: 0;
  --space-small__ya5b7b1: 4px;
  --space-medium__ya5b7b2: 8px;
  --space-large__ya5b7b3: 12px;
}

.Hero_container__1ldw6lo0 {
  padding: var(--space-medium__ya5b7b2);
}
```

