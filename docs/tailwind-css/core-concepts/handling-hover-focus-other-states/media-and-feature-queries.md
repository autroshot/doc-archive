---
sidebar_position: 4
---

# 미디어 및 기능 질의

## 반응형 중단점

특정 중단점에서 요소의 스타일을 지정하려면 `md` 및 `lg`와 같은 반응형 수정자를 사용하세요.

다음 예시에서는, 모바일에서는 3열 그리드를, 중간 너비 화면에서는 4열 그리드를, 큰 너비 화면에서는 6열 그리드를 렌더링합니다.

```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

이러한 기능이 어떻게 작동하는지 자세히 알아보려면 [반응형 디자인](https://tailwindcss.com/docs/responsive-design) 문서를 확인하세요.

## 선호 색상 스키마

`prefers-color-scheme` 미디어 질의는 사용자가 밝은 테마를 선호하는지 어두운 테마를 선호하는지 알려주며, 일반적으로 운영 체제 수준에서 설정됩니다.

수정자가 없는 유틸리티를 사용하여 밝은 모드를 대상으로 하고, `dark` 수정자를 사용하여 어두운 모드에 대한 재정의 기능을 제공합니다.

```html
<div
  class="bg-white **dark:bg-slate-900** rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
>
  <div>
    <span
      class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg"
    >
      <svg
        class="h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3
    class="text-slate-900 **dark:text-white** mt-5 text-base font-medium tracking-tight"
  >
    Writes Upside-Down
  </h3>
  <p class="text-slate-500 **dark:text-slate-400** mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including
    upside-down. It even works in outer space.
  </p>
</div>
```

이 기능의 작동 방식에 대한 자세한 내용은 [어두운 모드](https://tailwindcss.com/docs/dark-mode) 설명서를 참고하세요.

## 선호 동작 감소

`prefers-reduced-motion` 미디어 질의는 사용자가 불필요한 동작을 최소화하도록 요청했는지 알려줍니다.

사용자가 동작 감소를 요청했을 때, 조건부로 스타일을 추가하려면 `motion-reduce` 수정자를 사용하세요.

```html
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="**motion-reduce:hidden** animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing...
</button>
```

테일윈드에는 사용자가 동작 감소를 요청하지 **않은** 경우에만 스타일을 추가하는 `motion-safe` 수정자도 포함되어 있습니다. `motion-reduce` 도우미를 사용하며 많은 스타일을 취소해야 할 때 유용합니다.

```html
<!-- `motion-reduce`를 사용하면 많은 취소 스타일이 발생할 수 있습니다. -->
<button
  class="hover:-translate-y-0.5 transition **motion-reduce:hover:translate-y-0** **motion-reduce:transition-none** ..."
>
  Save changes
</button>

<!-- 이러한 상황에서는 `motion-safe`를 사용하면 코드가 줄어듭니다. -->
<button
  class="**motion-safe:hover:-translate-x-0.5** **motion-safe:transition** ..."
>
  Save changes
</button>
```

## 선호 대비

`prefers-contrast` 미디어 질의는 사용자가 대비 증가나 감소를 요청했는지 알려줍니다.

사용자가 대비 증가를 요청했을 때, 조건부로 스타일을 추가하려면 `contrast-more` 수정자를 사용하세요.

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700"
      >Social Security Number</span
    >
    <input
      class="border-slate-200 placeholder-slate-400 **contrast-more:border-slate-400** **contrast-more:placeholder-slate-500**"
    />
    <p
      class="mt-2 opacity-10 **contrast-more:opacity-100** text-slate-600 text-sm"
    >
      We need this to steal your identity.
    </p>
  </label>
</form>
```

테일윈드에는 사용자가 대비 감소를 요청했을 때, 조건부로 스타일을 추가하는 데 사용할 수 있는 `contrast-less` 수정자도 포함되어 있습니다.

## 뷰포트 방향

뷰포트가 특정 방향에 있을 때, 조건부로 스타일을 추가하려면 `portrait` 및 `landscape` 수정자를 사용하세요.

```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```

## 인쇄 스타일

문서가 인쇄될 때만 적용되는 스타일을 조건부로 추가하려면 `print` 수정자를 사용하세요.

```html
<div>
  <article class="**print:hidden**">
    <h1>My Secret Pizza Recipe</h1>
    <p>This recipe is a secret, and must not be shared with anyone</p>
    <!-- ... -->
  </article>
  <div class="hidden **print:block**">
    Are you seriously trying to print this? It's secret!
  </div>
</div>
```

## 지원 규칙

사용자 브라우저에서 특정 기능의 지원 여부에 따라 스타일을 지정하려면 `supports-[...]` 수정자를 사용하세요.

```html
<div class="flex **supports-[display:grid]:grid** ...">
  <!-- ... -->
</div>
```

내부적으로 `supports-[...]` 수정자는 [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) 규칙을 생성하며, 프로퍼티/값 쌍과 같이 대괄호 사이에 `@supports (...)`를 사용하는 것은 물론 `and` 및 `or`을 사용하는 표현식까지 모두 사용할 수 있습니다.

간결성을 위해 (특정 값이 아닌) 프로퍼티의 지원 여부만 확인해야 한다면 프로퍼티 이름만 지정하면 됩니다.

```html
<div
  class="bg-black/75 **supports-[backdrop-filter]:bg-black/25** **supports-[backdrop-filter]:backdrop-blur** ..."
>
  <!-- ... -->
</div>
```

프로젝트에서 사용 중인 일반적인 `@supports` 규칙에 대한 바로 가기를 `tailwind.config.js` 파일의 `theme.supports`에서 설정할 수 있습니다.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    supports: {
      grid: 'display: grid',
    },
  },
};
```

그런 다음 프로젝트에서 커스텀 `supports-*` 수정자를 사용할 수 있습니다.

```html
<div class="**supports-grid:grid**">
  <!-- ... -->
</div>
```
