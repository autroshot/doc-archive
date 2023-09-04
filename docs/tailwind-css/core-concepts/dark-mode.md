---
sidebar_position: 4
---

# 어두운 모드

테일윈드 CSS를 사용하여 어두운 모드에서 사이트 스타일을 지정합니다.

이제 어두운 모드가 많은 운영 체제의 기본 기능으로 자리 잡으면서, 기본 디자인에 맞춰 어두운 버전의 웹사이트를 디자인하는 것이 보편화되고 있습니다.

이 작업을 최대한 쉽게 수행할 수 있도록 테일윈드에는 어두운 모드가 활성화된 경우 사이트 스타일을 다르게 지정할 수 있는 `dark` 변형이 포함되어 있습니다.

```html
<div class="bg-white **dark:bg-slate-800** rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-slate-900 **dark:text-white** mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 **dark:text-slate-400** mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

기본적으로 이는 `prefers-color-scheme` CSS 미디어 기능을 사용하지만, [`class` 전략](#수동으로-어두운-모드-전환하기)을 사용하여 수동으로 어두운 모드 전환을 지원하는 사이트를 구축할 수도 있습니다.

## 수동으로 어두운 모드 전환하기

운영 체제의 기본 설정에 의존하지 않고 수동으로 어두운 모드 전환을 지원하려면, `media` 전략 대신 `class` 전략을 사용하세요.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ...
}
```

이제 `dark:{class}` 클래스가 `prefers-color-scheme`를 기반으로 적용되는 대신, HTML 트리의 앞에 `dark` 클래스가 있을 때마다 적용됩니다.

```html
<!-- 어두운 모드 비활성화 -->
<html>
<body>
  <!-- 흰색이 됩니다. -->
  <div class="**bg-white** dark:bg-black">
    <!-- ... -->
  </div>
</body>
</html>

<!-- 어두운 모드 활성화 -->
<html class="**dark**">
<body>
  <!-- 검은색이 됩니다. -->
  <div class="bg-white **dark:bg-black**">
    <!-- ... -->
  </div>
</body>
</html>
```

테일윈드 설정에서 [접두사](https://tailwindcss.com/docs/configuration#prefix)를 설정한 경우, 해당 접두사를 `dark` 클래스에 추가해야 합니다. 예를 들어 접두사가 `tw-`인 경우, 어두운 모드를 활성화하려면 `tw-dark` 클래스를 사용해야 합니다.

`html` 요소에 `dark` 클래스를 추가하는 방법은 원하는 방식을 사용할 수 있습니다. 일반적인 접근 방식은 어딘가에서 기본 설정(예: `localStorage`)을 읽고 그에 따라 DOM을 갱신하는 약간의 JS를 사용하는 것입니다.

### 시스템 기본 설정과 수동 선택 지원하기

`class` 전략은 사용자의 시스템 기본 설정 또는 [`Window.matchMedia()` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)를 사용하여 수동으로 선택한 모드를 모두 지원하는 데 사용할 수 있습니다.

다음은 운영 체제 기본 설정을 고려하여 밝은 모드, 어두운 모드를 지원하는 간단한 예시입니다.

```js title="spaghetti.js"
// 페이지 로드 시 또는 테마 변경 시 FOUC를 방지하려면 `head`에 인라인을 추가하는 것이 가장 좋습니다.
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// 사용자가 명시적으로 밝은 모드를 선택할 때마다
localStorage.theme = 'light'

// 사용자가 명시적으로 어두운 모드를 선택할 때마다
localStorage.theme = 'dark'

// 사용자가 명시적으로 OS 기본 설정을 사용하도록 선택할 때마다
localStorage.removeItem('theme')
```

앞서 말했듯이 이를 원하는 방식으로 관리할 수 있습니다. 데이터베이스에 서버 측 기본 설정을 저장하고 서버에서 클래스를 렌더링하는 방식을 사용할 수도 있습니다.

### 클래스 이름을 사용자 지정하기

일부 프레임워크(예: 네이티브스크립트)는 어두운 모드를 활성화하는 고유한 접근 방식을 사용합니다. 어두운 모드가 활성화되면 다른 클래스 이름을 추가합니다.

`darkMode`를 커스텀 선택기가 두 번째 항목인 배열로 설정하여 어두운 모드 선택기의 이름을 사용자 지정할 수 있습니다.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  // ...
}
```
