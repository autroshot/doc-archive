---
sidebar_position: 7
---

# 고급 주제

## 자신의 클래스 사용하기

테일윈드의 [레이어](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer) 중 하나에서 정의했거나 [플러그인](https://tailwindcss.com/docs/adding-custom-styles#writing-plugins)을 사용하여 추가한 경우, 테일윈드의 모든 수정자를 커스텀 클래스와 함께 사용할 수 있습니다.

```css title="main.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

```html title="HTML"
<div class="**lg:content-auto**">
  <!-- ... -->
</div>
```

## 쌓인 수정자 정렬하기

수정자를 쌓을 때는 중첩된 함수 호출처럼 안쪽에서 바깥쪽으로 적용됩니다.

```js
// 이 수정자는...
'dark:group-hover:focus:opacity-100'

// ... 다음과 같이 적용됩니다.
dark(groupHover(focus('opacity-100')))
```

대부분의 경우 이는 중요하지 않지만, 사용하는 순서가 실제로 의미 있게 다른 CSS를 생성하는 몇 가지 상황이 있습니다.

예를 들어 `darkMode`를 `class`로 설정한 경우, `dark`와 `group-hover` 수정자를 결합하면 사용하는 순서에 따라 다른 결과가 생성됩니다.

```css
/* dark:group-hover:opacity-100 */
.dark .group:hover .dark\:group-hover\:opacity-100 {
  opacity: 1;
}

/* group-hover:dark:opacity-100 */
.group:hover .dark .group-hover\:dark\:opacity-100 {
  opacity: 1;
}
```

첫 번째 예시에서는 `dark` 요소가 `group` 요소의 부모여야 하지만 두 번째 예시에서는 그 반대입니다.

공식 타이포그래피 플러그인에 포함된 `prose-headings` 같은 수정자를 사용할 때에도 순서가 중요합니다.

```css
/* prose-headings:hover:underline */
.prose-headings\:hover\:underline:hover :is(:where(h1, h2, h3, h4, th)) {
  text-decoration: underline;
}

/* hover:prose-headings:underline */
.hover\:prose-headings\:underline :is(:where(h1, h2, h3, h4, th)):hover {
  text-decoration: underline;
}
```

첫 번째 예시에서는 기사 자체에 커서를 대면 모든 제목에 밑줄이 그어지는 반면, 두 번째 예시에서는 각 제목에 커서를 대면 해당 제목에만 밑줄이 그어집니다.