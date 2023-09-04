---
sidebar_position: 3
---

# 반응형 디자인

반응형 유틸리티 변형을 사용하여 적응형 사용자 인터페이스를 구축합니다.

테일윈드의 모든 유틸리티 클래스는 서로 다른 중단점에서 조건부로 적용될 수 있으므로, HTML을 벗어나지 않고도 복잡한 반응형 인터페이스를 쉽게 구축할 수 있습니다.

일반적인 장치 해상도에서 영감을 얻은 5개의 중단점이 기본적으로 있습니다.

| 중단점 접두사 | 최소 너비 | CSS |
| ----------------- | ------------- | ------------------------------------ |
| `sm` | 640px | `@media (min-width: 640px) { ... }` |
| `md` | 768px | `@media (min-width: 768px) { ... }` |
| `lg` | 1024px | `@media (min-width: 1024px) { ... }` |
| `xl` | 1280px | `@media (min-width: 1280px) { ... }` |
| `2xl` | 1536px | `@media (min-width: 1536px) { ... }` |

유틸리티를 추가하되 특정 중단점에서만 적용하려면, 유틸리티 앞에 중단점 이름과 `:` 문자만 붙이면 됩니다.

```html
<!-- 기본적으로 너비 16, 중간 화면에서는 너비 32, 대형 화면에서는 너비 48 -->
<img class="w-16 **md:w-32** **lg:w-48**" src="...">
```

이는 **프레임워크의 모든 유틸리티 클래스**에 적용할 수 있습니다. 즉, 주어진 중단점에서 문자 간격이나 커서 스타일 등 무엇이든 변경할 수 있습니다.

다음은 작은 화면에서는 쌓는 레이아웃을 사용하고 큰 화면에서는 나란히 배치하는 마케팅 페이지 컴포넌트의 간단한 예시입니다.

```html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden **md:max-w-2xl**">
  <div class="**md:flex**">
    <div class="**md:shrink-0**">
      <img class="h-48 w-full object-cover **md:h-full md:w-48**" src="/img/building.jpg" alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>
```

위 예시의 작동 방식은 다음과 같습니다.

- 기본적으로 외부 `div`는 `display: block`이지만 `md:flex` 유틸리티를 추가하면 중간 화면 이상에서는 `display: flex`가 됩니다.
- 부모가 플렉스 컨테이너인 경우 이미지가 축소되지 않도록, `md:shrink-0`을 추가하여 중간 크기 이상의 화면에서 축소되는 것을 방지했습니다. 작은 화면에서는 이것이 아무 효과가 없으므로 `shrink-0`을 사용할 수도 있지만, `md` 화면에서만 중요하므로 클래스 이름에 명시하는 것이 좋습니다.
- 작은 화면에서는 이미지가 기본적으로 자동으로 전체 너비로 표시됩니다. 중간 크기 이상의 화면에서는 너비를 고정 크기로 제한하고 이미지가 전체 높이가 되도록 `md:h-full md:w-48`을 사용했습니다.

이 예시에서는 중단점을 하나만 사용했지만 `sm`, `lg`, `xl`, `2xl` 반응형 접두사를 사용하여 다른 크기로도 쉽게 사용자 지정할 수 있습니다.

## 모바일 우선

기본적으로 테일윈드는 부트스트랩과 같은 다른 프레임워크에서 사용했던 것과 유사한 모바일 우선 중단점 시스템을 사용합니다.

즉, 접두사가 붙지 않은 유틸리티(예: `uppercase`)는 모든 화면 크기에서 적용되는 반면, 접두사가 붙은 유틸리티(예: `md:uppercase`)는 지정된 중단점 **이상에서만** 적용된다는 뜻입니다.

### 모바일 화면을 대상으로 하기

이 접근 방식이 사람들을 가장 놀라게 하는 부분은 모바일용으로 스타일을 지정하려면, `sm:` 접두사가 붙은 버전이 아닌 접두사가 붙지 않은 버전의 유틸리티를 사용해야 한다는 것입니다. `sm:` 을 '작은 화면에서'라는 의미로 생각하지 말고 '작은 **중단점**에서'라는 의미로 생각하세요.

❌ 모바일 장치를 대상으로 할 때 <code className="text-sm font-bold text-slate-800">sm:</code>을 사용하면 안 됨

```html
<!-- 작은 화면이 아닌 640px 이상의 화면에서만 텍스트를 중앙에 배치합니다. -->
<div class="sm:text-center"></div>
```

✔️ 접두사가 없는 유틸리티를 사용하여 모바일을 대상으로 하고, 더 큰 중단점에서 재정의함

```html
<!-- 모바일에서는 텍스트를 중앙에 배치하고, 640px 이상의 화면에서는 텍스트를 왼쪽 정렬합니다. -->
<div class="text-center sm:text-left"></div>
```

따라서 모바일 레이아웃의 디자인을 먼저 구현한 다음, `sm` 화면에 적합한 변경 사항을 적용하고, `md` 화면에 적합한 변경 사항을 적용하는 방식이 좋습니다.

### 중단점 범위를 대상으로 하기

기본적으로 `md:flex`와 같은 규칙에 의해 적용된 스타일은 해당 중단점은 물론이고 더 큰 중단점에서도 계속 적용됩니다.

특정 중단점 범위가 활성화된 경우에만 유틸리티를 적용하려면, `md`와 같은 반응형 수정자와 `max-*` 수정자를 쌓아서 해당 스타일을 특정 범위로 제한하세요.

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

테일윈드는 각 중단점에 해당하는 `max-*` 수정자를 생성하므로 기본적으로 다음과 같은 수정자를 사용할 수 있습니다.

| 수정자 | 미디어 질의 |
| --------- | ------------------------------------------------ |
| `max-sm` | `@media not all and (min-width: 640px) { ... }` |
| `max-md` | `@media not all and (min-width: 768px) { ... }` |
| `max-lg` | `@media not all and (min-width: 1024px) { ... }` |
| `max-xl` | `@media not all and (min-width: 1280px) { ... }` |
| `max-2xl` | `@media not all and (min-width: 1536px) { ... }` |

### 단일 중단점을 대상으로 하기

단일 중단점을 대상으로 하려면, `md`와 같은 반응형 수정자와 다음 중단점의 `max-*` 수정자를 쌓으세요.

```html
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

자세한 내용은 [중단점 범위를 대상으로 하기](#중단점-범위를-대상으로-하기)에서 확인할 수 있습니다.

## 커스텀 중단점 사용하기

### 테마 사용자 지정하기

`tailwind.config.js` 파일에서 중단점을 완전히 사용자 지정할 수 있습니다.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

[중단점 사용자 지정하기](https://tailwindcss.com/docs/breakpoints)에서 자세한 내용을 확인하세요.

### 임의 값

테마에 포함하기에는 적절하지 않은 일회성 중단점을 사용해야 한다면, `min` 또는 `max` 수정자에 임의의 값을 사용하여 커스텀 중단점을 즉석에서 생성할 수 있습니다.

```html
<div class="**min-[320px]:text-center** **max-[600px]:bg-sky-300**">
  <!-- ... -->
</div>
```

[임의 값](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) 문서에서 임의 값 지원에 대해 자세히 알아보세요.