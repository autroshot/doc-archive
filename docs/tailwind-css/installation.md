---
sidebar_position: 2
sidebar_label: 설치
---

# 테일윈드 CSS 시작하기

테일윈드 CSS는 모든 HTML 파일, 자바스크립트 컴포넌트, 기타 템플릿에서 클래스 이름을 확인하여 해당 스타일을 생성하고 이를 정적 CSS 파일에 작성하는 방식으로 작동합니다.

빠르고 유연하며 안정적이며 런타임이 없습니다.

## 설치

테일윈드 CSS를 처음부터 시작하고 실행하는 가장 간단하고 빠른 방법은 테일윈드 CLI 도구를 사용하는 것입니다. 노드를 설치하지 않고 CLI를 사용하려면 [독립형 실행 파일](https://tailwindcss.com/blog/standalone-cli)을 사용할 수 있습니다.

### 1. 테일윈드 CSS 설치하기

npm을 통해 `tailwindcss`를 설치하고 `tailwind.config.js` 파일을 생성합니다.

```sh
npm install -D tailwindcss
npx tailwindcss init
```

### 2. 템플릿 경로 설정하기

`tailwind.config.js` 파일에 모든 템플릿 파일에 대한 경로를 추가합니다.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. CSS에 테일윈드 지시문을 추가하기

테일윈드의 각 계층에 대한 `@tailwind` 지시문을 기본 CSS 파일에 추가합니다.

```css title="src/input.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. 테일윈드 CLI 빌드 프로세스 시작하기

CLI 도구를 실행하여 템플릿 파일에서 클래스를 확인하고 CSS를 빌드하세요.

```sh
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### 5. HTML에서 테일윈드 사용 시작하기

컴파일된 CSS 파일을 `<head>`에 추가하고 테일윈드의 유틸리티 클래스를 사용하여 콘텐츠 스타일을 지정하세요.

```html title="src/index.html"
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## 다음으로 읽을 내용

테일윈드 CSS가 전통적인 CSS 작성과 차별화되는 몇 가지 핵심 개념에 대해 알아보세요.

- [유틸리티 우선](./core-concepts/utility-first-fundamentals.md) - 유틸리티 우선 워크플로를 사용하여 제한된 기본 유틸리티 집합에서 복잡한 컴포넌트를 구축합니다.
- [반응형 디자인](./core-concepts/responsive-design.md) - 반응형 수정자를 사용하여 모든 화면 크기에 맞게 조정되는 완전 반응형 사용자 인터페이스를 구축합니다.
- [호버, 초점, 기타 상태](./core-concepts/handling-hover-focus-other-states/index.md) - 조건부 수정자를 사용하여 호버, 초점 등과 같은 대화형 상태의 요소에 스타일을 지정합니다.
- [어두운 모드](./core-concepts/dark-mode.md) - 어두운 모드 수정자를 사용하여 HTML에서 직접 사이트를 다크 모드에 맞게 최적화합니다.
- [스타일 재사용](./core-concepts/reusing-styles.md) - 재사용 가능한 추상화를 생성하여 중복을 관리하고 프로젝트를 유지 관리할 수 있습니다.
- [프레임워크 커스터마이징](https://tailwindcss.com/docs/adding-custom-styles) - 브랜드에 맞게 프레임워크를 사용자 지정하고 고유한 커스텀 스타일로 확장할 수 있습니다.