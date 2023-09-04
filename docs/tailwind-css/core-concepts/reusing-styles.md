---
sidebar_position: 5
---

# 스타일 재사용하기

중복을 관리하고 재사용 가능한 추상화를 생성합니다.

테일윈드는 낮은 수준의 유틸리티 클래스만을 사용하여 디자인을 구현하는 [유틸리티 우선](https://tailwindcss.com/docs/utility-first) 워크플로를 권장합니다. 이는 조기 추상화와 그에 따른 문제점을 피할 수 있는 강력한 방법입니다.

하지만 프로젝트가 성장함에 따라 필연적으로 여러 곳에서 동일한 디자인을 재현하기 위해 공통 유틸리티 조합을 반복하게 될 것입니다.

예를 들어 아래 템플릿에서 각 아바타 이미지에 대한 유틸리티 클래스가 5번씩 반복되는 것을 볼 수 있습니다.

```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="**inline-block h-12 w-12 rounded-full ring-2 ring-white**" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="**inline-block h-12 w-12 rounded-full ring-2 ring-white**" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="**inline-block h-12 w-12 rounded-full ring-2 ring-white**" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="**inline-block h-12 w-12 rounded-full ring-2 ring-white**" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="**inline-block h-12 w-12 rounded-full ring-2 ring-white**" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```

걱정 마세요! 이 안내서에서는 프로젝트에서 스타일을 재사용하는 다양한 전략과 각 전략을 사용하는 시기에 대한 모범 사례에 대해 알아봅니다.

## 편집기와 언어의 기능 사용하기

대부분의 경우 이러한 중복은 한 곳에 모두 모여 있기 때문에 문제가 되지 않습니다. 또는 배열의 항목을 순회하며 마크업을 한 번만 작성하기 때문에 문제가 되지 않습니다.

재사용해야 하는 스타일이 단일 파일 내에서만 재사용되어야 하는 경우, 중복을 관리하는 가장 간단한 방법은 다중 커서 편집과 루프입니다.

### 다중 커서 편집

중복이 단일 파일의 요소 그룹에 국한된 경우, 가장 쉬운 방법은 [다중 커서 편집](https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor)을 사용하여 각 요소의 클래스 목록을 한 번에 빠르게 선택하고 편집하는 것입니다.

대부분의 상황에서는 이것이 최선의 해결책이 됩니다. 중복된 모든 클래스 목록을 동시에 빠르게 편집할 수 있다면 추가적인 추상화를 도입할 필요가 없어집니다.

### 루프

컴포넌트를 추출하거나 커스텀 클래스를 만들어야 한다고 결정하기 전에, 템플릿에서 **실제로** 컴포넌트를 두 번 이상 사용하고 있는지 확인하세요.

실제 마크업이 루프에서 렌더링되므로, 렌더링된 페이지에 두 번 이상 표시되는 디자인 요소가 실제로는 한 번만 작성되는 경우가 많습니다.

예를 들어 이 안내서의 시작 부분에 있는 중복 아바타는 실제 프로젝트에서는 대부분 루프로 렌더링될 것입니다.

```html {6-8}
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    {#each contributors as user}
      <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="{user.avatarUrl}" alt="{user.handle}"/>
    {/each}
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```

원한다면 루프나 `map`을 사용하여 예시를 다시 작성할 수도 있습니다.

```jsx
<nav className="flex sm:justify-center space-x-4">
  {[
    ['Home', '/dashboard'],
    ['Team', '/team'],
    ['Projects', '/projects'],
    ['Reports', '/reports'],
  ].map(([title, url]) => (
    <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
  ))}
</nav>
```

이와 같이 요소가 루프에서 렌더링될 때, 실제 클래스 목록은 한 번만 작성되므로 중복 문제를 해결할 필요가 없습니다.

## 컴포넌트 및 부분 추출하기

여러 파일에서 일부 스타일을 재사용해야 한다면 가장 좋은 전략은 다음과 같습니다. 리액트, 스벨트, 뷰와 같은 프런트엔드 프레임워크를 사용한다면 **컴포넌트**를 생성합니다. 그리고 블레이드, ERB, 트위그, 넌적스와 같은 템플릿 언어를 사용한다면 **템플릿 부분**을 생성합니다.

```html title="VacationCard.vue"
<template>
  <div>
    <img class="rounded" :src="img" :alt="imgAlt">
    <div class="mt-2">
      <div>
        <div class="text-xs text-slate-600 uppercase font-bold tracking-wider">{{ eyebrow }}</div>
        <div class="font-bold text-slate-700 leading-snug">
          <a :href="url" class="hover:underline">{{ title }}</a>
        </div>
        <div class="mt-2 text-sm text-slate-600">{{ pricing }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['img', 'imgAlt', 'eyebrow', 'title', 'pricing', 'url']
  }
</script>
```

이제 이 컴포넌트를 원하는 만큼 여러 곳에서 사용할 수 있으며, 스타일에 대한 단일 소스를 유지하여 한 곳에서 쉽게 갱신할 수 있습니다.

### CSS 추상화와 비교하기

컴포넌트가 단일 HTML 요소가 아닌 이상, 컴포넌트를 정의하는 데 필요한 정보를 CSS만으로는 잡을 수 없습니다. 조금이라도 복잡한 것이라면 HTML 구조도 CSS만큼이나 중요합니다.

❌ 복잡한 컴포넌트를 추출하기 위해 CSS 클래스에 의존해서는 안 됨

```html
<!-- 커스텀 CSS를 사용하더라도 이 HTML 구조를 복제해야 합니다. -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification { /* ... */ }
  .chat-notification-logo-wrapper { /* ... */ }
  .chat-notification-logo { /* ... */ }
  .chat-notification-content { /* ... */ }
  .chat-notification-title { /* ... */ }
  .chat-notification-message { /* ... */ }
</style>
```

이와 같이 컴포넌트의 여러 요소에 대한 클래스를 만들더라도 **이 컴포넌트를 사용할 때마다 HTML을 복제해야 합니다**. 물론 한 곳에서 모든 인스턴스의 글꼴 크기를 갱신하는 것은 가능하겠지만, 제목을 링크로 바꿔야 한다면 어떻게 해야 할까요?

컴포넌트와 템플릿 부분은 HTML과 스타일을 캡슐화할 수 있기 때문에, CSS 전용 추상화보다 이 문제를 훨씬 더 잘 해결합니다. 모든 인스턴스의 글꼴 크기를 변경하는 것은 CSS에서와 마찬가지로 쉽습니다. 하지만 이제 모든 제목을 링크로 전환하는 작업을 한 곳에서 할 수 있게 되었습니다.

✔️ 템플릿 부분 또는 자바스크립트 컴포넌트를 생성함

```jsx title="Notification.jsx"
function Notification({ imageUrl, imageAlt, title, message }) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="shrink-0">
        <img className="h-12 w-12" src={imageUrl.src} alt={imageAlt}>
      </div>
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500">{message}</p>
      </div>
    </div>
  )
}
```

이와 같이 컴포넌트와 템플릿 부분을 만들 때 스타일에 대한 단일 소스가 이미 있기 때문에, 유틸리티 클래스 외에 다른 것을 사용할 이유가 없습니다.

## `@apply`로 클래스 추출하기

ERB나 트위그와 같은 전통적인 템플릿 언어를 사용하는 경우, 버튼과 같은 작은 항목에 대한 템플릿을 부분적으로 만드는 것은 `btn`과 같은 간단한 CSS 클래스에 비해 과한 작업으로 느껴질 수 있습니다.

복잡한 컴포넌트에는 적절한 템플릿 부분을 만드는 것이 좋지만, 템플릿 부분이 과하다고 느껴질 때는 테일윈드의 `@apply` 지시문을 사용하여 반복되는 유틸리티 패턴을 커스텀 CSS 클래스에 추출할 수 있습니다.

다음은 기존 유틸리티에서 `@apply`를 사용하여 작성할 수 있는 `btn-primary` 클래스입니다.

```html title="HTML"
<!-- 커스텀 클래스를 추출하기 전 -->
<button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
  Save changes
</button>

<!-- 커스텀 클래스를 추출한 후 -->
<button class="**btn-primary**">
  Save changes
</button>
```

```css title="CSS"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

[함수와 지시문](/docs/functions-and-directives#layer) 문서에서 `@apply`와 `@layer`에 대해 자세히 알아보세요.

### 성급한 추상화 피하기

무엇을 하든 **단순히 더 '깔끔하게' 보이게 하기 위해 `@apply`를 사용하지 마세요**. 맞습니다, 테일윈드 클래스로 가득 찬 HTML 템플릿은 보기 흉합니다. 하지만 수많은 커스텀 CSS가 있는 프로젝트에서 무언가를 변경하는 것은 더 나쁩니다.

모든 것에 `@apply`를 사용하기 시작하면 기본적으로 CSS를 다시 작성해야 합니다. 그리고 테일윈드가 제공하는 워크플로와 유지 보수성 등의 이점을 모두 버려야 합니다.

- **항상 클래스 이름을 생각해야 함** - 이름을 지을 자격이 없는 것의 클래스 이름을 생각하는 것만큼 시간과 에너지를 낭비하는 일은 없습니다.
- **무언가를 변경하려면 여러 파일 사이를 이동해야 함** - 모든 것을 함께 두는 것과 비교하면 워크플로를 크게 방해하는 요소입니다.
- **스타일 변경이 더 무서움** - CSS는 전역적입니다. 사이트의 다른 부분에서 절대 무언가를 망가뜨리지 않으면서 클래스의 최소 너비 값을 변경할 수 있을까요?
- **CSS 번들이 더 커질 것임** - 이런!

`@apply`를 사용하려면 버튼이나 양식 컨트롤과 같이 재사용 가능성이 높은 아주 작은 것에 사용해야 합니다. 그리고 컴포넌트가 더 나은 선택일 수 있는 리액트와 같은 프레임워크를 사용하지 않는 경우에만 사용해야 합니다.